import * as Sentry from '@sentry/nuxt'

// const DOMAIN = 'feh-data.s3.eu-west-3.amazonaws.com'
const DOMAIN = 'd2g6r16f5rvwn1.cloudfront.net'
// const DOMAIN = 'data.feh-peeler.com'
const COMMIT = '156102895fdb7b619cad14d98a01775d8f9f5197'

export default function useData(
  filename: string,
  locator: string,
  reference: Ref<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const { addToastWithGenericError } = useStoreSnackbar()

  const isLoading = ref(false)
  const isLoaded = ref(false)

  async function load() {
    if (isLoaded.value) return

    isLoading.value = true

    return $fetch(`https://${DOMAIN}/${COMMIT}/${filename}`)
      .then(
        (result) => {
          // reference.value = JSON.parse(result as string)
          reference.value = result
        },
        (error) => {
          addToastWithGenericError()
          Sentry.captureException(error, {
            tags: { locator },
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
  }
}
