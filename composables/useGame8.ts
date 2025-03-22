import type { Game8Id } from '@/utils/types/game8'

const BASE_URL = 'https://game8.co/games/fire-emblem-heroes/archives/'

export default function () {
  const l = (id: Game8Id) => `${BASE_URL}${id}`
  return { l }
}
