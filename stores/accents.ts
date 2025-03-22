import * as Sentry from '@sentry/nuxt'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/accents.json'

export const useStoreAccents = defineStore('accents', () => {
  const { addToastWithGenericError } = useStoreSnackbar()

  const isLoading = ref(false)
  const isLoaded = ref(false)

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

  function load() {
    if (isLoaded.value) return

    isLoading.value = true

    return $fetch(JSON_URL)
      .then(
        (result) => {
          accents.value = JSON.parse(result as string)
          // units.value = result
        },
        (error) => {
          addToastWithGenericError()
          Sentry.captureException(error, {
            tags: { locator: 'stores/accents/load' },
          })
        },
      )
      .finally(() => {
        isLoaded.value = true
        isLoading.value = false
      })
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
  import.meta.hot.accept(acceptHMRUpdate(useStoreAccents, import.meta.hot))
}
