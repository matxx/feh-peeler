export const useStoreGlobals = defineStore('globals', () => {
  const sortedByAvailability = ref(true)

  function setSortedByAvailability(value: boolean) {
    sortedByAvailability.value = value
  }
  async function toggleSortedByAvailability() {
    sortedByAvailability.value = !sortedByAvailability.value
  }

  return {
    sortedByAvailability,
    setSortedByAvailability,
    toggleSortedByAvailability,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGlobals, import.meta.hot))
}
