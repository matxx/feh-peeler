import * as Sentry from '@sentry/nuxt'

export default function useData(
  url: string,
  locator: string,
  cb: (result: unknown) => void,
) {
  const { addToastWithGenericError } = useStoreSnackbar()

  const isLoading = ref(false)
  const isLoaded = ref(false)

  async function load() {
    if (isLoaded.value) return

    isLoading.value = true

    return $fetch(url)
      .then(cb, (error) => {
        addToastWithGenericError()
        Sentry.captureException(error, {
          tags: { locator },
        })
      })
      .finally(() => {
        isLoaded.value = true
        isLoading.value = false
      })
  }

  return {
    isLoading,
    isLoaded,
    load,
  }
}
