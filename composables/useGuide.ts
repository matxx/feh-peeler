import type { GuideId } from '~/utils/types/guide'

const BASE_URL = 'https://guide.fire-emblem-heroes.com/en-US/'

export default function () {
  const l = (id: GuideId) => `${BASE_URL}${id}`
  return { l }
}
