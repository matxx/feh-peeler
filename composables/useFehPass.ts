import type { FehPassId } from '~/utils/types/fehPass'

const BASE_URL = 'https://fehpass.fire-emblem-heroes.com/en-US/'

export default function () {
  const l = (id: FehPassId) => `${BASE_URL}${id}`
  return { l }
}
