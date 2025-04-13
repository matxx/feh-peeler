// import type { Store } from 'pinia'

interface StoreLoadable {
  load: () => Promise<void>
}
// type StoreLoadable = Store<
//   string,
//   {
//     isLoading: Ref<boolean>
//     isLoaded: Ref<boolean>
//     load: () => Promise<void>
//   }
// >

export default function useDataStores(stores: StoreLoadable[]) {
  const isLoading = ref(true)
  const isLoaded = ref(false)

  onMounted(() => {
    Promise.all(stores.map((store) => store.load()))
      .then(() => {
        isLoaded.value = true
      })
      .finally(() => {
        isLoading.value = false
      })
  })

  return {
    isLoading,
    isLoaded,
  }
}
