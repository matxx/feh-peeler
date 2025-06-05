import type {
  ISkillUnit,
  ISkillUnitBySkillIdByUnitId,
  ISkillUnitByUnitIdBySkillId,
} from '@/utils/types/skillsUnits'
import { nestedKeyBy } from '~/utils/functions/typeSafe'

export const useStoreDataSkillsUnits = defineStore('data/skillsUnits', () => {
  const items = ref<ISkillUnit[]>([])

  const { isLoading, isLoaded, load } = useData(
    'skills_units.json',
    'stores/data/skillsUnits/load',
    items,
  )

  const bySkillIdByUnitId = computed<ISkillUnitBySkillIdByUnitId>(() =>
    nestedKeyBy(items.value, ['unit_id', 'skill_id']),
  )
  const byUnitIdBySkillId = computed<ISkillUnitByUnitIdBySkillId>(() =>
    nestedKeyBy(items.value, ['skill_id', 'unit_id']),
  )

  return {
    isLoading,
    isLoaded,
    load,

    items,

    byUnitIdBySkillId,
    bySkillIdByUnitId,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataSkills, import.meta.hot))
}
