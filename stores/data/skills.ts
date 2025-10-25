import keyBy from 'lodash-es/keyBy'
import sumBy from 'lodash-es/sumBy'
import sortBy from 'lodash-es/sortBy'
import filter from 'lodash-es/filter'
import groupBy from 'lodash-es/groupBy'
import compact from 'lodash-es/compact'

import getSortableVersion from '~/utils/functions/getSortableVersion'
import { getSortableName } from '~/utils/functions/skillSortingVector'
import type {
  SkillId,
  ISkillData,
  ISkill,
  ISkillTree,
  ISkillById,
  ISkillByName,
  TBySkillId,
  TBySkillCategory,
} from '~/utils/types/skills'
import type { IUnitInstance } from '~/utils/types/units'

export const useStoreDataSkills = defineStore('data/skills', () => {
  const skillsData = ref<ISkillData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'skills.json',
    'stores/data/skills/load',
    skillsData,
  )

  const storeDataAccents = useStoreDataAccents()

  const getNameForLink = (skill: ISkillData) => {
    if (!skill.refine) return skill.name

    return `${skill.name} (${skill.refine})`
  }

  const skills = computed<ISkill[]>(() =>
    storeDataAccents.isLoaded
      ? skillsData.value.map((skill) => ({
          ...skill,
          baseId: skill.base_id || skill.id,
          nameForLink: escapeName(getNameForLink(skill)),
          nameForFilters: storeDataAccents.transliterate(skill.name),
          nameForSorting: getSortableName(skill.name),
          sortableVersion: getSortableVersion(skill.version || '0'),
        }))
      : [],
  )
  const allSkillIds = computed<SkillId[]>(() => skills.value.map((s) => s.id))

  const skillsTree = computed<ISkillTree[]>(() =>
    compact(
      filter(skills.value, (skill) => !skill.downgrade_ids).map((skill) =>
        recTree(skill),
      ),
    ),
  )
  function recTree(skill?: ISkill): ISkillTree | undefined {
    if (!skill) return

    return {
      id: skill.id,
      title: skill.name,
      skill,
      children: skill.upgrade_ids
        ? compact(
            skill.upgrade_ids.map((skillId) =>
              recTree(skillsById.value[skillId]),
            ),
          )
        : undefined,
    }
  }

  const skillsById = computed<ISkillById>(() => keyBy(skills.value, 'id'))
  const skillsByNameForLink = computed<ISkillByName>(() =>
    keyBy(skills.value, 'nameForLink'),
  )

  const sortedSkills = computed<ISkill[]>(() =>
    sortBy(skills.value, 'nameForSorting'),
  )
  // @ts-expect-error groupBy is not type safe
  const sortedSkillsByCategory = computed<TBySkillCategory<ISkill[]>>(() =>
    groupBy(sortedSkills.value, 'category'),
  )

  function sumSP(unit: IUnitInstance) {
    return sumBy(
      compact(Object.values(unit.skillIds)).map((id) => skillsById.value[id]),
      'sp',
    )
  }

  const refines = computed<ISkill[]>(() =>
    filter(skills.value, (s) => !!s.refine),
  )
  const refinesByBaseId = computed<TBySkillId<ISkill[]>>(() =>
    groupBy(refines.value, 'baseId'),
  )

  return {
    isLoading,
    isLoaded,
    load,

    skillsData,
    skills,
    skillsById,
    skillsByNameForLink,
    skillsTree,

    allSkillIds,

    sortedSkills,
    sortedSkillsByCategory,

    refinesByBaseId,

    sumSP,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataSkills, import.meta.hot))
}
