import keyBy from 'lodash-es/keyBy'

import type { IndexedBy } from '~/utils/functions/typeSafe'
import type { UnitId } from '~/utils/types/units'
import type { IUnitStatRank } from '@/utils/types/units-stats-ranks'

export const useStoreDataUnitsStatsRanks = defineStore(
  'data/units-stats-ranks',
  () => {
    const ranks = ref<IUnitStatRank[]>([])

    const { isLoading, isLoaded, load } = useData(
      'units-stats-ranks.json',
      'stores/data/units-stats-ranks/load',
      ranks,
    )

    const ranksById = computed<IndexedBy<UnitId, IUnitStatRank>>(() =>
      keyBy(ranks.value, 'id'),
    )

    return {
      isLoading,
      isLoaded,
      load,

      ranks,
      ranksById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsStatsRanks, import.meta.hot),
  )
}
