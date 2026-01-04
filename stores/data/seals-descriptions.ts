import keyBy from 'lodash-es/keyBy'

import type { SealId, ISealDescription } from '@/utils/types/seals'

export const useStoreDataSealsDescriptions = defineStore(
  'data/seals-descriptions',
  () => {
    const items = ref<ISealDescription[]>([])

    const { isLoading, isLoaded, load } = useData(
      'seals-descriptions.json',
      'stores/data/seals-descriptions/load',
      items,
    )

    const byId = computed<{
      [index: SealId]: ISealDescription
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
    acceptHMRUpdate(useStoreDataSealsDescriptions, import.meta.hot),
  )
}
