import keyBy from 'lodash-es/keyBy'

import type { UnitId, IUnitRatingsGame8 } from '@/utils/types/units'

export const useStoreDataUnitsRatingsGame8 = defineStore(
  'data/units-ratings-game8',
  () => {
    const items = ref<IUnitRatingsGame8[]>([])

    const { isLoading, isLoaded, load } = useData(
      'units-ratings-game8.json',
      'stores/data/units-ratings-game8/load',
      items,
    )

    const byId = computed<{
      [index: UnitId]: IUnitRatingsGame8
    }>(() => keyBy(items.value, 'id'))

    return {
      isLoading,
      isLoaded,
      load,

      items,
      byId,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsRatingsGame8, import.meta.hot),
  )
}
