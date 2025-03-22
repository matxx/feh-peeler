import keyBy from 'lodash-es/keyBy'
import * as Sentry from '@sentry/nuxt'

import type {
  ISkillAvailability,
  ISkillAvailabilityById,
} from '@/utils/types/skills-availabilities'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills-availabilities.json'

export const useStoreSkillsAvailabilities = defineStore(
  'skills-availabilities',
  () => {
    const { addToastWithGenericError } = useStoreSnackbar()

    const isLoading = ref(false)
    const isLoaded = ref(false)
    const availabilities = ref<ISkillAvailability[]>([])

    const availabilitiesById = computed<ISkillAvailabilityById>(() =>
      keyBy(availabilities.value, 'id'),
    )

    function load() {
      if (isLoaded.value) return

      isLoading.value = true

      return $fetch(JSON_URL)
        .then(
          (result) => {
            availabilities.value = JSON.parse(result as string)
            // availabilities.value = result
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

      availabilities,
      availabilitiesById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreSkillsAvailabilities, import.meta.hot),
  )
}
