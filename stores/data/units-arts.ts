import keyBy from 'lodash-es/keyBy'

import type { IndexedBy } from '~/utils/functions/typeSafe'
import type { UnitId } from '~/utils/types/units'
import type { IUnitArt } from '@/utils/types/units-arts'

export const useStoreDataUnitsArts = defineStore('data/units-arts', () => {
  const arts = ref<IUnitArt[]>([])

  const { isLoading, isLoaded, load } = useData(
    'units-arts.json',
    'stores/data/units-arts/load',
    arts,
  )

  const artsById = computed<IndexedBy<UnitId, IUnitArt>>(() =>
    keyBy(arts.value, 'id'),
  )

  return {
    isLoading,
    isLoaded,
    load,

    arts,
    artsById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsArts, import.meta.hot),
  )
}
