import * as Sentry from '@sentry/nuxt'

export default function (search: Ref<string | undefined | null>) {
  const { t } = useI18n()
  const storeSearches = useStoreSearches()

  const regexp = ref<RegExp | null>(null)
  const hasError = ref(false)
  const errorMessages = computed(() =>
    hasError.value ? [t('global.invalidRegExp')] : [],
  )

  function updateRegExp() {
    hasError.value = false
    if (!search.value) {
      regexp.value = null
      return
    }

    try {
      regexp.value = storeSearches.filterToRegexp(search.value)
    } catch (error) {
      if (storeSearches.useRegExp) {
        hasError.value = true
      } else {
        Sentry.captureException(error, {
          tags: {
            search: search.value,
            locator: 'skills-fodders/watch/search',
          },
        })
      }
    }
  }
  watch(search, updateRegExp, { immediate: true })
  watch(() => storeSearches.useRegExp, updateRegExp)

  return {
    regexp,
    hasError,
    errorMessages,
  }
}
