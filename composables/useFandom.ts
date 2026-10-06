import type { FandomId } from '~/utils/types/fandom'

const BASE_URL = 'https://feheroes.fandom.com/wiki/'

export default function () {
  const l = (id: FandomId) => `${BASE_URL}${id}`
  return { l }
}
