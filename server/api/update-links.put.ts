import { z } from 'zod'

import getConfig from '~/server/utils/session-config'

const schema = z.object({
  shoudLinkToFandom: z.boolean(),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body),
  )

  if (!result.success) {
    // TODO: better handle errors
    console.log('result.error.issues', result.error.issues)
    throw result.error.issues
  }

  const config = getConfig()
  const session = await getSession(event, config)

  const update = session.data
  update.shoudLinkToFandom = body.shoudLinkToFandom
  await updateSession(event, config, update)
})
