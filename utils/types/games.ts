import sortBy from 'lodash-es/sortBy'
import uniqBy from 'lodash-es/uniqBy'

// index of the game icon in "Icon_MiniUnit_Head.png" (status sprite sheet)
// also used to sort games chronologically
export const GAME_ICON_INDEXES: { [key: string]: number | undefined } = {
  'Fire Emblem Heroes': 0,
  'Fire Emblem: Shadow Dragon and the Blade of Light': 1,
  'Fire Emblem: Mystery of the Emblem': 1,
  'Fire Emblem: New Mystery of the Emblem': 1,
  'Fire Emblem Echoes: Shadows of Valentia': 2,
  'Fire Emblem: Genealogy of the Holy War': 3,
  'Fire Emblem: Thracia 776': 4,
  'Fire Emblem: The Binding Blade': 5,
  'Fire Emblem: The Blazing Blade': 6,
  'Fire Emblem: The Sacred Stones': 7,
  'Fire Emblem: Path of Radiance': 8,
  'Fire Emblem: Radiant Dawn': 9,
  'Fire Emblem Awakening': 10,
  'Fire Emblem Fates': 11,
  'Fire Emblem: Three Houses': 12,
  'Fire Emblem Warriors: Three Hopes': 12,
  'Tokyo Mirage Sessions ♯FE Encore': 13,
  'Fire Emblem Engage': 14,
  'Fire Emblem Shadows': 15,
  "Fire Emblem: Fortune's Weave": 16,
}

export const GAME_ICONS_COUNT = 17

// keeps only games with an icon, one per icon, sorted by icon index
export function sortGames(games: string[]) {
  return sortBy(
    uniqBy(
      games.filter((game) => GAME_ICON_INDEXES[game] !== undefined),
      (game) => GAME_ICON_INDEXES[game],
    ),
    (game) => GAME_ICON_INDEXES[game],
  )
}
