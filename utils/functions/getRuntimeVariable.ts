import { compact } from 'lodash-es'
import type { RuntimeConfig } from '@nuxt/schema'

export function getOptionalVariable(
  keys: (keyof RuntimeConfig)[],
): string | undefined {
  const variables = useRuntimeConfig()
  return compact(keys.map((k) => variables[k] as string | undefined))[0]
}

export const getVariableOrThrow = (
  name: string,
  keys: (keyof RuntimeConfig)[],
): string => {
  const variable = getOptionalVariable(keys)
  if (!variable) {
    throw new Error(`missing ${name}`)
  }
  return variable
}

export default getVariableOrThrow
