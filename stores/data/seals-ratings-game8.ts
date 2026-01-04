import keyBy from 'lodash-es/keyBy'

import type { SealId, ISealRatingsGame8 } from '@/utils/types/seals'

export const useStoreDataSealsRatingsGame8 = defineStore(
  'data/seals-ratings-game8',
  () => {
    const items = ref<ISealRatingsGame8[]>([])

    const { isLoading, isLoaded, load } = useData(
      'seals-ratings-game8.json',
      'stores/data/seals-ratings-game8/load',
      items,
    )

    const byId = computed<{
      [index: SealId]: ISealRatingsGame8
    }>(() => keyBy(items.value, 'id'))

    return {
      isLoading,
      isLoaded,
      load,

      byId,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataSealsRatingsGame8, import.meta.hot),
  )
}
