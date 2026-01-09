import keyBy from 'lodash-es/keyBy'

import type { IndexedBy } from '~/utils/functions/typeSafe'
import type { UnitId } from '~/utils/types/units'
import type { IUnitStat } from '~/utils/types/units-stats'

export const useStoreDataUnitsStats = defineStore('data/units-stats', () => {
  const stats = ref<IUnitStat[]>([])

  const { isLoading, isLoaded, load } = useData(
    'units-stats.json',
    'stores/data/units-stats/load',
    stats,
  )

  const statsById = computed<IndexedBy<UnitId, IUnitStat>>(() =>
    keyBy(stats.value, 'id'),
  )

  return {
    isLoading,
    isLoaded,
    load,

    stats,
    statsById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsStats, import.meta.hot),
  )
}
