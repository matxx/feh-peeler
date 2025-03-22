const BASE_URL = 'https://feheroes.fandom.com/wiki/'

export default function () {
  const l = (title: string) => `${BASE_URL}${title.replace(/[ /]/g, '_')}`
  return { l }
}
