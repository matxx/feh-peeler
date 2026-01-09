import type { ISkillUnit } from '@/utils/types/skillsUnits'
import { nestedKeyBy, type IndexedByBy } from '~/utils/functions/typeSafe'
import type { SkillId } from '~/utils/types/skills'
import type { UnitId } from '~/utils/types/units'

export const useStoreDataSkillsUnits = defineStore('data/skillsUnits', () => {
  const items = ref<ISkillUnit[]>([])

  const { isLoading, isLoaded, load } = useData(
    'skills_units.json',
    'stores/data/skillsUnits/load',
    items,
  )

  const bySkillIdByUnitId = computed<IndexedByBy<UnitId, SkillId, ISkillUnit>>(
    () => nestedKeyBy(items.value, ['unit_id', 'skill_id']),
  )
  const byUnitIdBySkillId = computed<IndexedByBy<SkillId, UnitId, ISkillUnit>>(
    () => nestedKeyBy(items.value, ['skill_id', 'unit_id']),
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
