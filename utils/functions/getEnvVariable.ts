import { compact } from 'lodash-es'

export function getOptionalVariable(
  keys: (keyof NodeJS.ProcessEnv)[],
): string | undefined {
  const variables = process.env
  return compact(keys.map((k) => variables[k] as string | undefined))[0]
}

export const getVariableOrThrow = (
  name: string,
  keys: (keyof NodeJS.ProcessEnv)[],
): string => {
  const variable = getOptionalVariable(keys)
  if (!variable) {
    throw new Error(`missing ${name}`)
  }
  return variable
}

export default getVariableOrThrow
