// must be synced with
// https://github.com/matxx/feh-scrapper/blob/8ff86efedcfd1bdab07e6037478d4f579c99ad85/lib/scrappers/fandoms/units/themes.rb#L7-L23
export const THEME_NEW_YEAR = 'new_year'
export const THEME_DESERT = 'desert'
export const THEME_DOD = 'dod'
export const THEME_SPRING = 'spring'
export const THEME_KIDS = 'kids'
export const THEME_WEDDING = 'wedding'
export const THEME_SUMMER = 'summer'
export const THEME_HALLOWEEN = 'halloween'
export const THEME_NINJAS = 'ninjas'
export const THEME_WINTER = 'winter'
export const THEME_DANCE = 'dance'
export const THEME_HOSHIDAN_SUMMER = 'hs'
export const THEME_HOSTILE_SPRING = 'hostile_spring'
export const THEME_PICNIC = 'picnic'
export const THEME_PIRATES = 'pirates'
export const THEME_TEA = 'tea'
export const THEME_THIEVES = 'thieves'
export const THEME_S12 = 's12'
export const THEME_NATIONS = 'nations'

export type UnitTheme =
  | typeof THEME_NEW_YEAR
  | typeof THEME_DESERT
  | typeof THEME_DOD
  | typeof THEME_SPRING
  | typeof THEME_KIDS
  | typeof THEME_WEDDING
  | typeof THEME_SUMMER
  | typeof THEME_HALLOWEEN
  | typeof THEME_NINJAS
  | typeof THEME_WINTER
  | typeof THEME_DANCE
  | typeof THEME_HOSHIDAN_SUMMER
  | typeof THEME_HOSTILE_SPRING
  | typeof THEME_PICNIC
  | typeof THEME_PIRATES
  | typeof THEME_TEA
  | typeof THEME_THIEVES
  | typeof THEME_S12
  | typeof THEME_NATIONS

export const ALL_THEMES: UnitTheme[] = [
  THEME_NEW_YEAR,
  THEME_DESERT,
  THEME_DOD,
  THEME_SPRING,
  THEME_KIDS,
  THEME_WEDDING,
  THEME_SUMMER,
  THEME_HALLOWEEN,
  THEME_NINJAS,
  THEME_WINTER,
  THEME_DANCE,
  THEME_HOSHIDAN_SUMMER,
  THEME_HOSTILE_SPRING,
  THEME_PICNIC,
  THEME_PIRATES,
  THEME_TEA,
  THEME_THIEVES,
  THEME_S12,
  THEME_NATIONS,
]
