import keyBy from 'lodash-es/keyBy'
import sumBy from 'lodash-es/sumBy'
import sortBy from 'lodash-es/sortBy'
import groupBy from 'lodash-es/groupBy'
import compact from 'lodash-es/compact'
import * as Sentry from '@sentry/nuxt'

import { getSortableName } from '@/utils/functions/skillSortingVector'
import type {
  ISkillData,
  ISkill,
  ISkillById,
  ISkillsByCategory,
} from '@/utils/types/skills'
import type { IUnitInstance } from '~/utils/types/units'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills.json'

export const useStoreSkills = defineStore('skills', () => {
  const { addToastWithGenericError } = useStoreSnackbar()
  const storeAccents = useStoreAccents()

  const isLoading = ref(false)
  const isLoaded = ref(false)
  const skillsData = ref<ISkillData[]>([])

  const skills = computed<ISkill[]>(() =>
    storeAccents.isLoaded
      ? skillsData.value.map((skill) => ({
          ...skill,
          filterableName: storeAccents.transliterate(skill.name),
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

  function load() {
    if (isLoaded.value) return

    isLoading.value = true

    return $fetch(JSON_URL)
      .then(
        (result) => {
          skillsData.value = JSON.parse(result as string)
          // skillsData.value = result
        },
        (error) => {
          addToastWithGenericError()
          Sentry.captureException(error, {
            tags: { locator: 'stores/skills/load' },
          })
        },
      )
      .finally(() => {
        isLoaded.value = true
        isLoading.value = false
      })
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
  import.meta.hot.accept(acceptHMRUpdate(useStoreSkills, import.meta.hot))
}
