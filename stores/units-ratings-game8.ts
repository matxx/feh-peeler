import keyBy from 'lodash-es/keyBy'
import * as Sentry from '@sentry/nuxt'

import type { UnitId, IUnitRatingsGame8 } from '@/utils/types/units'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units-ratings-game8.json'

export const useStoreUnitsRatingsGame8 = defineStore(
  'units-ratings-game8',
  () => {
    const { addToastWithGenericError } = useStoreSnackbar()

    const isLoading = ref(false)
    const isLoaded = ref(false)
    const unitsRatingsGame8 = ref<IUnitRatingsGame8[]>([])

    const unitsRatingsGame8ById = computed<{
      [index: UnitId]: IUnitRatingsGame8
    }>(() => keyBy(unitsRatingsGame8.value, 'id'))

    async function load() {
      if (isLoaded.value) return

      isLoading.value = true

      return $fetch(JSON_URL)
        .then(
          (result) => {
            unitsRatingsGame8.value = JSON.parse(result as string)
            // units.value = result
          },
          (error) => {
            addToastWithGenericError()
            Sentry.captureException(error, {
              tags: { locator: 'stores/units-ratings-game8/load' },
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

      unitsRatingsGame8,
      unitsRatingsGame8ById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreUnitsRatingsGame8, import.meta.hot),
  )
}
