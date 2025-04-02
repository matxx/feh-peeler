import keyBy from 'lodash-es/keyBy'
import * as Sentry from '@sentry/nuxt'

import type { SkillId, ISkillDescription } from '@/utils/types/skills'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills-descriptions.json'

export const useStoreSkillsDescriptions = defineStore(
  'skills-descriptions',
  () => {
    const { addToastWithGenericError } = useStoreSnackbar()

    const isLoading = ref(false)
    const isLoaded = ref(false)
    const skillsDescriptions = ref<ISkillDescription[]>([])

    const skillsDescriptionsById = computed<{
      [index: SkillId]: ISkillDescription
    }>(() => keyBy(skillsDescriptions.value, 'id'))

    async function load() {
      if (isLoaded.value) return

      isLoading.value = true

      return $fetch(JSON_URL)
        .then(
          (result) => {
            skillsDescriptions.value = JSON.parse(result as string)
            // skills.value = result
          },
          (error) => {
            addToastWithGenericError()
            Sentry.captureException(error, {
              tags: { locator: 'stores/skills-descriptions/load' },
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

      skillsDescriptions,
      skillsDescriptionsById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreSkillsDescriptions, import.meta.hot),
  )
}
