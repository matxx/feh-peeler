import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'

import { getSortableName } from '~/utils/functions/skillSortingVector'

import type {
  SealId,
  ISealData,
  ISeal,
  ISealById,
  ISealByName,
} from '~/utils/types/seals'

export const useStoreDataSeals = defineStore('data/seals', () => {
  const sealsData = ref<ISealData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'seals.json',
    'stores/data/seals/load',
    sealsData,
  )

  const storeDataAccents = useStoreDataAccents()

  const getNameForLink = (seal: ISealData) => seal.name

  const seals = computed<ISeal[]>(() =>
    storeDataAccents.isLoaded
      ? sealsData.value.map((seal) => ({
          ...seal,
          nameForLink: escapeName(getNameForLink(seal)),
          nameForFilters: storeDataAccents.transliterate(seal.name),
          nameForSorting: getSortableName(seal.name),
        }))
      : [],
  )
  const allSealIds = computed<SealId[]>(() => seals.value.map((s) => s.id))

  const sealsById = computed<ISealById>(() => keyBy(seals.value, 'id'))
  const sealsByNameForLink = computed<ISealByName>(() =>
    keyBy(seals.value, 'nameForLink'),
  )

  const sortedSeals = computed<ISeal[]>(() =>
    sortBy(seals.value, 'nameForSorting'),
  )
  const sortedSealIds = computed<SealId[]>(() =>
    sortedSeals.value.map((seal) => seal.id),
  )

  return {
    isLoading,
    isLoaded,
    load,

    sealsData,
    seals,
    sealsById,
    sealsByNameForLink,

    allSealIds,

    sortedSeals,
    sortedSealIds,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataSeals, import.meta.hot))
}
