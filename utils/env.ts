export const ENV_DEV = 'development'
export const ENV_PRODUCTION = 'production'

export const env = process.env.NODE_ENV || ENV_DEV
export const isDev = env === ENV_DEV
export const isProd = env === ENV_PRODUCTION
