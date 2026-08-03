export const MIN_TIER = 0
export const MAX_TIER = 21

// https://www.reddit.com/r/FireEmblemHeroes/comments/eswpa6/comment/fjkg048/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
export function addedScoreForTier(tier: number) {
  switch (tier) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 0
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return 8
    case 11:
    case 12:
    case 13:
    case 14:
      return 16
    case 15:
    case 16:
    case 17:
      return 48
    case 18:
    case 19:
    case 20:
      return 68
    case 21:
      return 88
  }

  return 0
}
