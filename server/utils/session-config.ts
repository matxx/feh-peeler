import type { SessionConfig } from 'h3'

import getEnvVariable from '~/utils/functions/getEnvVariable'
import { env } from '~/utils/env'

export default () => {
  const password = getEnvVariable('session password', [
    `FEH_PEELER_${env.toUpperCase()}_SESSION_PASSWORD`,
    'SESSION_PASSWORD',
  ])

  const config: SessionConfig = {
    password: password,
    name: 'session',
  }

  return config
}
