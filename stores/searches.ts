import * as Sentry from '@sentry/nuxt'
import escapeRegExp from 'lodash-es/escapeRegExp'

const searchAsRegexpToRegexp = (str: string) => new RegExp(str, 'ig')

const searchAsTextToRegexp = (str: string) =>
  new RegExp(escapeRegExp(str).replace(/\s+/g, '.+?'), 'ig')

export const useStoreSearches = defineStore('searches', () => {
  const useRegExp = ref(false)

  const filterToRegexp = computed(() =>
    useRegExp.value ? searchAsRegexpToRegexp : searchAsTextToRegexp,
  )

  const iconToUse = computed(() =>
    useRegExp.value ? 'mdi-regex' : 'mdi-alphabetical-variant',
  )

  const textKeyToUse = computed(() =>
    useRegExp.value ? 'global.useRegexInSearches' : 'global.useTextInSearches',
  )

  function toggle() {
    useRegExp.value = !useRegExp.value
  }

  function storeInSession() {
    return $fetch('/api/update-searches', {
      method: 'PUT',
      body: {
        useRegExp: useRegExp.value,
      },
    }).then(
      async () => {},
      (error) => {
        Sentry.captureException(error, {
          tags: { locator: 'stores/searches/storeInSession' },
        })
      },
    )
  }
  watch(useRegExp, storeInSession)

  function setUseRegExp(value: boolean) {
    useRegExp.value = value
  }
  async function asyncSetUseRegExp(value: boolean) {
    await setUseRegExp(value)
  }

  return {
    useRegExp,

    filterToRegexp,
    iconToUse,
    textKeyToUse,

    toggle,
    asyncSetUseRegExp,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreSearches, import.meta.hot))
}
