import * as Sentry from '@sentry/nuxt'

import {
  DEFAULT_FODDER_AVAILABILITIES,
  type Availability,
} from '~/utils/types/skills-availabilities'

export const useStoreFodderSettings = defineStore('fodder-settings', () => {
  const fodderAvailabilities = ref<Availability[]>(
    DEFAULT_FODDER_AVAILABILITIES,
  )

  function storeInSession() {
    return $fetch('/api/update-fodder-settings', {
      method: 'PUT',
      body: {
        fodderAvailabilities: fodderAvailabilities.value,
      },
    }).then(
      async () => {},
      (error) => {
        Sentry.captureException(error, {
          tags: { locator: 'stores/fodder-settings/storeInSession' },
        })
      },
    )
  }
  watch(fodderAvailabilities, storeInSession)

  function setFodderAvailabilities(arr: Availability[]) {
    fodderAvailabilities.value = arr
  }
  async function asynSetFodderAvailabilities(arr: Availability[]) {
    await setFodderAvailabilities(arr)
  }

  return {
    fodderAvailabilities,
    setFodderAvailabilities,
    asynSetFodderAvailabilities,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreFodderSettings, import.meta.hot),
  )
}
