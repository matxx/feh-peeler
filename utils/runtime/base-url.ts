import getEnv from './env'
import { ENV_DEV, ENV_PRODUCTION } from '~/utils/env'

export default () => {
  switch (getEnv()) {
    case ENV_DEV:
      return 'http://localhost:3000'
    case ENV_PRODUCTION:
      return 'https://feh-peeler.com'
  }
}
