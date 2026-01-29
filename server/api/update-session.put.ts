import { z } from 'zod'

import getConfig from '~/server/utils/session-config'
import hasOwnProp from '~/utils/functions/hasOwnProp'

const schema = z.object({
  fodderAvailabilities: z.array(z.string()).optional(),
  showSkillsKeywords: z.boolean().optional(),
  useRegExp: z.boolean().optional(),
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

  if (hasOwnProp(body, 'fodderAvailabilities')) {
    update.fodderAvailabilities = body.fodderAvailabilities
  }
  if (hasOwnProp(body, 'showSkillsKeywords')) {
    update.showSkillsKeywords = body.showSkillsKeywords
  }
  if (hasOwnProp(body, 'useRegExp')) {
    update.useRegExp = body.useRegExp
  }

  await updateSession(event, config, update)
})
