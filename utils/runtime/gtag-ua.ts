import { getOptionalVariable } from '~/utils/functions/getPublicRuntimeVariable'
// import getPublicRuntimeVariable from '~/utils/functions/getPublicRuntimeVariable'
import getEnv from '~/utils/runtime/env'

export default () =>
  getOptionalVariable([
    `FEH_PEELER_${getEnv().toUpperCase()}_GTAG_UA`,
    'GTAG_UA',
  ])

// export default () =>
//   getPublicRuntimeVariable('GTAG_UA', [
//     `FEH_PEELER_${getEnv().toUpperCase()}_GTAG_UA`,
//     'GTAG_UA',
//   ])
