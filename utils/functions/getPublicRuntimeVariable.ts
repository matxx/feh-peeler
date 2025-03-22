import { compact } from 'lodash-es'
import type { PublicRuntimeConfig } from '@nuxt/schema'

export function getOptionalVariable(
  keys: (keyof PublicRuntimeConfig)[],
): string | undefined {
  const variables = useRuntimeConfig().public
  return compact(keys.map((k) => variables[k] as string | undefined))[0]
}

export const getVariableOrThrow = (
  name: string,
  keys: (keyof PublicRuntimeConfig)[],
): string => {
  const variable = getOptionalVariable(keys)
  if (!variable) {
    throw new Error(`missing ${name}`)
  }
  return variable
}

export default getVariableOrThrow
