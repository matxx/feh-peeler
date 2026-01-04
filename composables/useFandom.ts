export const BASE_URL = 'https://feheroes.fandom.com/wiki/'

export default function () {
  const escapeString = (str: string) => str.replace(/[ /]/g, '_')
  const l = (title: string) => `${BASE_URL}${escapeString(title)}`
  return { l }
}
