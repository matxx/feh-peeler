import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'
import * as Sentry from '@sentry/nuxt'

import type { IUnitData, IUnit } from '@/utils/types/units'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units.json'

export const useStoreUnits = defineStore('units', () => {
  const { addToastWithGenericError } = useStoreSnackbar()
  const storeAccents = useStoreAccents()

  const isLoading = ref(false)
  const isLoaded = ref(false)
  const unitsData = ref<IUnitData[]>([])

  const units = computed<IUnit[]>(() =>
    storeAccents.isLoaded
      ? unitsData.value.map((unit) => ({
          ...unit,
          filterableName: storeAccents.transliterate(unit.full_name),
          sortableName: unit.full_name,
        }))
      : [],
  )

  const unitsById = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'id'),
  )
  const unitsByFullName = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'full_name'),
  )

  const sortedUnits = computed<IUnit[]>(() =>
    sortBy(units.value, 'sortableName'),
  )

  async function load() {
    if (isLoaded.value) return

    isLoading.value = true

    return $fetch(JSON_URL)
      .then(
        (result) => {
          unitsData.value = JSON.parse(result as string)
          // unitsData.value = result
        },
        (error) => {
          addToastWithGenericError()
          Sentry.captureException(error, {
            tags: { locator: 'stores/units/load' },
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

    unitsData,
    units,
    unitsById,
    unitsByFullName,
    sortedUnits,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreUnits, import.meta.hot))
}
