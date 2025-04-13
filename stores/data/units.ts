import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'

import type { IUnitData, IUnit } from '@/utils/types/units'

export const useStoreDataUnits = defineStore('data/units', () => {
  const { isLoading, isLoaded, load } = useData(
    'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units.json',
    'stores/data/units/load',
    (result) => {
      unitsData.value = JSON.parse(result as string)
      // unitsData.value = result
    },
  )

  const storeDataAccents = useStoreDataAccents()

  const unitsData = ref<IUnitData[]>([])

  const units = computed<IUnit[]>(() =>
    storeDataAccents.isLoaded
      ? unitsData.value.map((unit) => ({
          ...unit,
          nameForLink: escapeName(unit.full_name),
          nameForFilters: storeDataAccents.transliterate(unit.full_name),
          nameForSorting: unit.full_name,
        }))
      : [],
  )

  const unitsById = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'id'),
  )
  const unitsByNameForLink = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'nameForLink'),
  )

  const sortedUnits = computed<IUnit[]>(() =>
    sortBy(units.value, 'nameForSorting'),
  )

  return {
    isLoading,
    isLoaded,
    load,

    unitsData,
    units,
    unitsById,
    unitsByNameForLink,
    sortedUnits,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataUnits, import.meta.hot))
}
