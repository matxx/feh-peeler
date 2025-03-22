import * as Sentry from '@sentry/nuxt'

export default function (searches: Ref<Array<string | null>>) {
  const { t } = useI18n()
  const storeSearches = useStoreSearches()

  const regexps = ref<Array<RegExp | null>>(searches.value.map(() => null))
  const haveErrors = ref(searches.value.map(() => false))
  const errorMessages = computed(() =>
    haveErrors.value.map((hasError) =>
      hasError ? [t('global.invalidRegExp')] : [],
    ),
  )

  function updateRegExps() {
    searches.value.forEach((search, index) => {
      haveErrors.value[index] = false
      if (!search) return

      try {
        regexps.value[index] = storeSearches.filterToRegexp(search)
      } catch (error) {
        if (storeSearches.useRegExp) {
          haveErrors.value[index] = true
        } else {
          Sentry.captureException(error, {
            tags: {
              search,
              searches: searches.value.join('<{[]}>'),
              locator: 'useSearches/updateRegExps',
            },
          })
        }
      }
    })
  }
  watch(searches, updateRegExps)
  watch(() => storeSearches.useRegExp, updateRegExps)

  return {
    regexps,
    haveErrors,
    errorMessages,
  }
}
