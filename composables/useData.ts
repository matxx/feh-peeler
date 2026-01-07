import * as Sentry from '@sentry/nuxt'

const DOMAIN = 'data.feh-peeler.com'
const COMMIT = '0c7166710012373fb73a0c7d552871edca5ab755'

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

    return $fetch(`https://${DOMAIN}/commits/${COMMIT}/${filename}`)
      .then(
        async (result) => {
          // when response headers is "content-type: text/plain; charset=utf-8"
          // ex : raw.githubusercontent.com
          // reference.value = JSON.parse(result as string)

          // when response headers is "content-type: application/octet-stream"
          // ex : s3 upload without 'content-type'
          // reference.value = JSON.parse(await (result as Blob).text())

          // when response headers is "content-type: application/json"
          // ex : s3 upload with 'content-type'
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
