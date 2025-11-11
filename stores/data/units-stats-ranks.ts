import keyBy from 'lodash-es/keyBy'

import type {
  IUnitStatRank,
  IUnitStatRankById,
} from '@/utils/types/units-stats-ranks'

export const useStoreDataUnitsStatsRanks = defineStore(
  'data/units-stats-ranks',
  () => {
    const ranks = ref<IUnitStatRank[]>([])

    const { isLoading, isLoaded, load } = useData(
      'units-stats-ranks.json',
      'stores/data/units-stats-ranks/load',
      ranks,
    )

    const ranksById = computed<IUnitStatRankById>(() =>
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
