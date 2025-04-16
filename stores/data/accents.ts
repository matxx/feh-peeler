type Accents = { [key: string]: string }

export const useStoreDataAccents = defineStore('data/accents', () => {
  const accents = ref<Accents>({})

  const { isLoading, isLoaded, load } = useData(
    'accents.json',
    'stores/data/accents/load',
    accents,
  )

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
