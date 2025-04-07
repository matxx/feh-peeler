import keyBy from 'lodash-es/keyBy'
import sumBy from 'lodash-es/sumBy'
import sortBy from 'lodash-es/sortBy'
import groupBy from 'lodash-es/groupBy'
import compact from 'lodash-es/compact'

import { getSortableName } from '@/utils/functions/skillSortingVector'
import type {
  ISkillData,
  ISkill,
  ISkillById,
  ISkillsByCategory,
} from '@/utils/types/skills'
import type { IUnitInstance } from '~/utils/types/units'

export const useStoreDataSkills = defineStore('data/skills', () => {
  const { isLoading, isLoaded, load } = useData(
    'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills.json',
    'stores/data/skills/load',
    (result) => {
      skillsData.value = JSON.parse(result as string)
      // skillsData.value = result
    },
  )

  const storeDataAccents = useStoreDataAccents()

  const skillsData = ref<ISkillData[]>([])

  const skills = computed<ISkill[]>(() =>
    storeDataAccents.isLoaded
      ? skillsData.value.map((skill) => ({
          ...skill,
          filterableName: storeDataAccents.transliterate(skill.name),
          sortableName: getSortableName(skill.name),
        }))
      : [],
  )

  const skillsById = computed<ISkillById>(() => keyBy(skills.value, 'id'))

  const sortedSkills = computed<ISkill[]>(() =>
    sortBy(skills.value, 'sortableName'),
  )
  // @ts-expect-error groupBy is not type safe
  const sortedSkillsByCategory = computed<ISkillsByCategory>(() =>
    groupBy(sortedSkills.value, 'category'),
  )

  function sumSP(unit: IUnitInstance) {
    return sumBy(
      compact(Object.values(unit.skillIds)).map((id) => skillsById.value[id]),
      'sp',
    )
  }

  return {
    isLoading,
    isLoaded,
    load,

    skillsData,
    skills,
    skillsById,

    sortedSkills,
    sortedSkillsByCategory,

    sumSP,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataSkills, import.meta.hot))
}
