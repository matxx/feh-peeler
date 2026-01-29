import * as Sentry from '@sentry/nuxt'

export const useStoreSkillsKeywords = defineStore('skills-keywords', () => {
  const showKeywords = ref(true)

  const iconToUse = computed(() =>
    showKeywords.value ? 'mdi-code-array' : 'mdi-code-brackets',
  )

  const textKeyToUse = computed(() =>
    showKeywords.value
      ? 'global.skillsKeywordsShown'
      : 'global.skillsKeywordsHidden',
  )

  function toggle() {
    showKeywords.value = !showKeywords.value
  }

  function storeInSession() {
    return $fetch('/api/update-session', {
      method: 'PUT',
      body: {
        showSkillsKeywords: showKeywords.value,
      },
    }).then(
      async () => {},
      (error) => {
        Sentry.captureException(error, {
          tags: { locator: 'stores/skills-keywords/storeInSession' },
        })
      },
    )
  }
  watch(showKeywords, storeInSession)

  function setShowKeywords(value: boolean) {
    showKeywords.value = value
  }
  async function asyncSetShowKeywords(value: boolean) {
    await setShowKeywords(value)
  }

  return {
    showKeywords,

    iconToUse,
    textKeyToUse,

    toggle,
    asyncSetShowKeywords,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreSkillsKeywords, import.meta.hot),
  )
}
