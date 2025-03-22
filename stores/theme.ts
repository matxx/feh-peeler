import type { ThemeInstance } from 'vuetify'
import * as Sentry from '@sentry/nuxt'

import {
  HIGHLIGHT_BG_LIGHT_COLOR,
  HIGHLIGHT_BG_LIGHT_CLASS,
  HIGHLIGHT_BG_DARK_COLOR,
  HIGHLIGHT_BG_DARK_CLASS,
} from '~/utils/constants'

import {
  DEVICE,
  DARK,
  LIGHT,
  DEFAULT_THEME,
  type Theme,
  type ThemeApplied,
} from '~/utils/types/themes'

function getPreferredColorScheme(): ThemeApplied {
  if (window && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK
    } else {
      return LIGHT
    }
  }
  return LIGHT
}
function translateTheme(theme: Theme) {
  switch (theme) {
    case DEVICE:
      return getPreferredColorScheme()
    case DARK:
      return DARK
    case LIGHT:
      return LIGHT
  }
}

export const useStoreTheme = defineStore('theme', () => {
  let vuetifyTheme: ThemeInstance

  const selectedTheme = ref<Theme>(DEVICE)
  const appliedTheme = ref<ThemeApplied>(DEFAULT_THEME)
  const isDarkApplied = computed(() => appliedTheme.value === DARK)

  const highlightBgColor = computed(() =>
    isDarkApplied.value ? HIGHLIGHT_BG_DARK_COLOR : HIGHLIGHT_BG_LIGHT_COLOR,
  )
  const highlightBgClass = computed(() =>
    isDarkApplied.value ? HIGHLIGHT_BG_DARK_CLASS : HIGHLIGHT_BG_LIGHT_CLASS,
  )
  const highlightRowProps = computed(() => ({ class: highlightBgClass.value }))

  const iconFor = (theme: Theme) => {
    switch (theme) {
      case DEVICE:
        return 'mdi-theme-light-dark'
      case DARK:
        return 'mdi-weather-night'
      case LIGHT:
        return 'mdi-weather-sunny'
    }
  }
  const selectedThemeIcon = computed(() => iconFor(selectedTheme.value))

  function setupVuetifyTheme(theme: ThemeInstance) {
    vuetifyTheme = theme
  }

  function cycle() {
    switch (selectedTheme.value) {
      case DEVICE:
        selectTheme(DARK)
        break
      case DARK:
        selectTheme(LIGHT)
        break
      case LIGHT:
        selectTheme(DEVICE)
    }
  }

  async function applySessionTheme(selected: Theme, applied: ThemeApplied) {
    selectedTheme.value = selected
    appliedTheme.value = applied
  }
  async function selectTheme(theme: Theme) {
    selectedTheme.value = theme
    appliedTheme.value = translateTheme(selectedTheme.value)

    storeThemeInSession()
    applyTheme()
  }
  function browserThemeChanged() {
    if (selectedTheme.value !== DEVICE) return

    appliedTheme.value = translateTheme(selectedTheme.value)

    storeThemeInSession()
    applyTheme()
  }
  function applyTheme() {
    if (!vuetifyTheme) return

    vuetifyTheme.global.name.value = appliedTheme.value
  }

  function storeThemeInSession() {
    return $fetch('/api/update-theme', {
      method: 'PUT',
      body: {
        selected: selectedTheme.value,
        applied: appliedTheme.value,
      },
    }).then(
      async () => {},
      (error) => {
        Sentry.captureException(error, {
          tags: { locator: 'stores/theme/storeThemeInSession' },
        })
      },
    )
  }

  return {
    selectedTheme,
    appliedTheme,
    isDarkApplied,
    selectedThemeIcon,
    iconFor,

    cycle,
    applySessionTheme,
    selectTheme,
    browserThemeChanged,
    setupVuetifyTheme,

    highlightBgColor,
    highlightBgClass,
    highlightRowProps,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreTheme, import.meta.hot))
}
