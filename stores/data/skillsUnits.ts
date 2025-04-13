import keyBy from 'lodash-es/keyBy'

import type {
  ISkillUnit,
  ISkillUnitBySkillId,
  ISkillUnitByUnitId,
  ISkillUnitBySkillIdByUnitId,
  ISkillUnitByUnitIdBySkillId,
} from '@/utils/types/skillsUnits'
import { nestedKeyBy } from '~/utils/functions/typeSafe'

export const useStoreDataSkillsUnits = defineStore('data/skillsUnits', () => {
  const { isLoading, isLoaded, load } = useData(
    'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills_units.json',
    'stores/data/skillsUnits/load',
    (result) => {
      skillsUnits.value = JSON.parse(result as string)
      // skillsUnits.value = result
    },
  )

  const skillsUnits = ref<ISkillUnit[]>([])

  const skillsUnitsBySkillId = computed<ISkillUnitBySkillId>(() =>
    keyBy(skillsUnits.value, 'skill_id'),
  )
  const skillsUnitsByUnitId = computed<ISkillUnitByUnitId>(() =>
    keyBy(skillsUnits.value, 'unit_id'),
  )
  const skillUnitBySkillIdByUnitId = computed<ISkillUnitBySkillIdByUnitId>(() =>
    nestedKeyBy(skillsUnits.value, ['unit_id', 'skill_id']),
  )
  const skillUnitByUnitIdBySkillId = computed<ISkillUnitByUnitIdBySkillId>(() =>
    nestedKeyBy(skillsUnits.value, ['skill_id', 'unit_id']),
  )

  return {
    isLoading,
    isLoaded,
    load,

    skillsUnits,
    skillsUnitsBySkillId,
    skillsUnitsByUnitId,
    skillUnitByUnitIdBySkillId,
    skillUnitBySkillIdByUnitId,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataSkills, import.meta.hot))
}
