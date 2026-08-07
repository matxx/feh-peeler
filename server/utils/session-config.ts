import type { SessionConfig } from 'h3'

export default () => {
  const password = useRuntimeConfig().SESSION_PASSWORD
  if (!password) {
    throw new Error('missing session password')
  }

  const config: SessionConfig = {
    password,
    name: 'session',
  }

  return config
}
