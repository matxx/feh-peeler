import { getSession, updateSession } from 'h3'
import getConfig from '~/server/utils/session-config'

import hasOwnProp from '~/utils/functions/hasOwnProp'

import {
  AV_HEROIC_GRAILS,
  AV_HEROIC_GRAILS_4,
} from '~/utils/types/obfuscated-keys'
import type { AvailabilityWithDeprecated } from '~/utils/types/skills-availabilities'

export default defineNuxtPlugin(async (_nuxtApp) => {
  const config = getConfig()
  const event = useRequestEvent()
  if (!event) return

  const session = await getSession(event, config)
  if (!hasOwnProp(session.data, 'fodderAvailabilities')) return
  if (!session.data.fodderAvailabilities.includes(AV_HEROIC_GRAILS)) return

  const update = { ...session.data }

  // AV_HEROIC_GRAILS has ben deprecated
  update.fodderAvailabilities = session.data.fodderAvailabilities.map(
    (avail: AvailabilityWithDeprecated) =>
      avail === AV_HEROIC_GRAILS ? AV_HEROIC_GRAILS_4 : avail,
  )

  await updateSession(event, config, update)
})
