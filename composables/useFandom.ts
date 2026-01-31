import type { FandomId } from '~/utils/types/fandom'

export const BASE_URL = 'https://feheroes.fandom.com/wiki/'

export default function () {
  const escapeString = (str: string) => str.replace(/[ /]/g, '_')
  const l = (title: FandomId) => `${BASE_URL}${escapeString(title)}`
  return { l }
}
