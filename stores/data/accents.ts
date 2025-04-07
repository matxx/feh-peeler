export const useStoreDataAccents = defineStore('data/accents', () => {
  const { isLoading, isLoaded, load } = useData(
    'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/accents.json',
    'stores/data/accents/load',
    (result) => {
      accents.value = JSON.parse(result as string)
      // accents.value = result
    },
  )

  const accents = ref<{ [key: string]: string }>({})

  const regexp = computed(
    () => new RegExp(`[${Object.keys(accents.value).join()}]`, 'g'),
  )

  // inspired by https://stackoverflow.com/a/44475397/5032734
  function transliterate(str: string) {
    if (!isLoaded.value) return str

    const substitutions = accents.value
    return str.replace(regexp.value, (m) => substitutions[m])
  }

  return {
    isLoading,
    isLoaded,
    load,

    accents,
    transliterate,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataAccents, import.meta.hot))
}
