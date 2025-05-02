import type { IConstants } from '~/utils/types/constants'

export const useStoreDataConstants = defineStore('data/constants', () => {
  const constants = ref<IConstants>()

  const { isLoading, isLoaded, load } = useData(
    'constants.json',
    'stores/data/constants/load',
    constants,
  )

  return {
    isLoading,
    isLoaded,
    load,

    constants,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataConstants, import.meta.hot),
  )
}
