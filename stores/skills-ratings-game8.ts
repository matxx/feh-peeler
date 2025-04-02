import keyBy from 'lodash-es/keyBy'
import * as Sentry from '@sentry/nuxt'

import type { SkillId, ISkillRatingsGame8 } from '@/utils/types/skills'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills-ratings-game8.json'

export const useStoreSkillsRatingsGame8 = defineStore(
  'skills-ratings-game8',
  () => {
    const { addToastWithGenericError } = useStoreSnackbar()

    const isLoading = ref(false)
    const isLoaded = ref(false)
    const skillsRatingsGame8 = ref<ISkillRatingsGame8[]>([])

    const skillsRatingsGame8ById = computed<{
      [index: SkillId]: ISkillRatingsGame8
    }>(() => keyBy(skillsRatingsGame8.value, 'id'))

    async function load() {
      if (isLoaded.value) return

      isLoading.value = true

      return $fetch(JSON_URL)
        .then(
          (result) => {
            skillsRatingsGame8.value = JSON.parse(result as string)
            // skills.value = result
          },
          (error) => {
            addToastWithGenericError()
            Sentry.captureException(error, {
              tags: { locator: 'stores/skills-ratings-game8/load' },
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

      skillsRatingsGame8,
      skillsRatingsGame8ById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreSkillsRatingsGame8, import.meta.hot),
  )
}
