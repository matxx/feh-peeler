import { getSession } from 'h3'
import getConfig from '~/server/utils/session-config'

import hasOwnProp from '~/utils/functions/hasOwnProp'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = getConfig()
  const event = useRequestEvent()
  if (!event) return

  const session = await getSession(event, config)

  const promises = []

  promises.push(useStoreDataAccents().load())

  const storeSearches = useStoreSearches()
  if (hasOwnProp(session.data, 'useRegExp')) {
    promises.push(storeSearches.asyncSetUseRegExp(session.data.useRegExp))
  }

  const storeTheme = useStoreTheme()
  if (session.data.theme) {
    promises.push(
      storeTheme.applySessionTheme(
        session.data.theme.selected,
        session.data.theme.applied,
      ),
    )
    nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
      vuetifyOptions.theme = {
        defaultTheme: session.data.theme.applied,
      }
    })
  }

  await Promise.all(promises)
})
