import { z } from 'zod'

import getConfig from '~/server/utils/session-config'

const requiredString = z
  .string({ required_error: 'Champ manquant.' })
  .min(1, { message: 'Champ manquant.' })

const schema = z.object({
  selected: requiredString,
  applied: requiredString,
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
  update.theme = {
    selected: body.selected,
    applied: body.applied,
  }
  await updateSession(event, config, update)
})
