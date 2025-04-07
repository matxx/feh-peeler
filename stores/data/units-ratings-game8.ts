import keyBy from 'lodash-es/keyBy'

import type { UnitId, IUnitRatingsGame8 } from '@/utils/types/units'

export const useStoreDataUnitsRatingsGame8 = defineStore(
  'data/units-ratings-game8',
  () => {
    const { isLoading, isLoaded, load } = useData(
      'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units-ratings-game8.json',
      'stores/data/units-ratings-game8/load',
      (result) => {
        unitsRatingsGame8.value = JSON.parse(result as string)
        // unitsRatingsGame8.value = result
      },
    )

    const unitsRatingsGame8 = ref<IUnitRatingsGame8[]>([])

    const unitsRatingsGame8ById = computed<{
      [index: UnitId]: IUnitRatingsGame8
    }>(() => keyBy(unitsRatingsGame8.value, 'id'))

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
    acceptHMRUpdate(useStoreDataUnitsRatingsGame8, import.meta.hot),
  )
}
