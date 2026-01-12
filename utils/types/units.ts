import type { DateTime } from 'luxon'

import type { Guid } from '~/utils/types/shared'
import {
  objectFromEntries,
  type IndexedByBy,
  type IndexedBy,
} from '~/utils/functions/typeSafe'

import type { MoveType } from '~/utils/types/moves'
import {
  SORTED_WEAPON_COLORS,
  type WeaponType,
  type WeaponFamily,
  type WeaponColor,
} from '~/utils/types/weapons'
import type { Game8Id } from '~/utils/types/game8'
import { SKILL_CATEGORIES } from '~/utils/types/skills'
import type { SkillCategory, SkillId } from '~/utils/types/skills'
import {
  SORTED_AVAILABILITIES,
  type Availability,
} from '~/utils/types/units-availabilities'
import type { Element } from '~/utils/types/units-filters'
import type { StatOrNone } from '~/utils/types/units-stats'
import type { UnitTheme } from '~/utils/types/units-themes'

export type UnitId = Guid<'unit'>

export const TAB_BASE_KIT = 'base-kit'
export const TAB_ARTS = 'arts'
export const TAB_STATS = 'stats'
export const TAB_SKILLS = 'skills'
export const TAB_FODDER = 'fodder'
export const TAB_FODDER_VALUE = 'fodder-value'

export const UNIT_DEFAULT_TAB = TAB_BASE_KIT

export type UnitTab =
  | typeof TAB_BASE_KIT
  | typeof TAB_ARTS
  | typeof TAB_FODDER
  | typeof TAB_STATS
  | typeof TAB_SKILLS
  | typeof TAB_FODDER_VALUE
export const UNIT_TABS: UnitTab[] = [
  TAB_BASE_KIT,
  TAB_ARTS,
  TAB_STATS,
  TAB_SKILLS,
  TAB_FODDER,
  TAB_FODDER_VALUE,
]
export const UNIT_TABS_WITH_TOOLTIP = [TAB_FODDER, TAB_FODDER_VALUE]

// export const ALFONSE_ID = 'PID_アルフォンス'
// export const SHARENA_ID = 'PID_シャロン'
// export const ANNA_ID = 'PID_アンナ'
// export const ASKR_TRIO_IDS = [ALFONSE_ID, SHARENA_ID, ANNA_ID]

// only for sorting purposes (when no rating from game8)
export const RATING_0 = '0'

export interface IUnitThumbnail {
  id: UnitId
  full_name: string
  nameForDisplay: string

  image_url_for_portrait: string
  image_url_for_icon_legendary?: string
  image_url_for_icon_chosen?: string
  image_url_for_icon_mythic?: string

  move_type: MoveType
  weapon_type: WeaponType

  is_refresher?: true
  is_duo?: true
  is_harmonized?: true
  is_aided?: true
  is_ascended?: true
  is_attuned?: true
  is_emblem?: true
  is_rearmed?: true
  is_entwined?: true
  is_chosen?: true
}

export type Gender = 'F' | 'FF' | 'FM' | 'M' | 'MF' | 'MM' | 'N' | 'NF'

export interface IUnitData {
  id: UnitId
  id_int: number
  game8_id?: Game8Id

  name: string
  title: string
  full_name: string
  abbreviated_name: string

  image_url_for_portrait: string
  image_url_for_icon_legendary?: string
  image_url_for_icon_chosen?: string
  image_url_for_icon_mythic?: string

  move_type: MoveType
  weapon_type: WeaponType

  book: number
  origin: string
  gender: Gender
  games: string[]

  has_respl?: true // has resplendent attire

  is_brave?: true
  is_fallen?: true
  is_story?: true
  is_tt?: true
  is_ghb?: true
  // is_special?: true
  // is_generic_pool?: true

  is_legendary?: true
  is_mythic?: true
  element?: Element

  is_duo?: true
  is_harmonized?: true

  is_refresher?: true

  is_rearmed?: true
  is_attuned?: true
  is_ascended?: true
  is_emblem?: true
  is_aided?: true
  is_entwined?: true
  is_chosen?: true

  bst: number
  duel_score: number
  clash_score: number
  // visible_bst: number
  max_score: number
  max_df: number
  theme?: UnitTheme

  // addition_date: string
  release_date: string
  version: string
}

export interface IUnit extends IUnitData {
  weaponFamily: WeaponFamily
  weaponColor: WeaponColor

  nameForLink: string
  nameForSelect: string
  nameForSorting: string
  nameForFiltering: string
  nameForDisplay: string

  sortableType: number
  sortableWeaponColor: number
  sortableWeaponType: number
  sortableMoveType: number
  sortableVersion: string
}

export interface IUnitWithAvailability extends IUnit {
  availability: Availability
}
export interface IUnitWithReleaseDate extends IUnit {
  releaseDate: DateTime
  releaseYearMonth: string
}

export interface IUnitInstance {
  id: UnitId | null
  skillIds: IndexedBy<SkillCategory, SkillId | undefined>
}

export function getEmptyUnitInstanceSkillIds(): IndexedBy<
  SkillCategory,
  SkillId | undefined
> {
  return objectFromEntries(SKILL_CATEGORIES.map((cat) => [cat, undefined]))
}

export function getEmptyUnitInstance(): IUnitInstance {
  return {
    id: null,
    skillIds: getEmptyUnitInstanceSkillIds(),
  }
}

export interface IUnitRatingsGame8 {
  id: UnitId
  game8_rating: string
  recommended_boon: StatOrNone
  recommended_bane: StatOrNone
  recommended_plus10: StatOrNone
}

export function getEmptyUnitsCountByWeaponColor(): IndexedBy<
  WeaponColor,
  number
> {
  return objectFromEntries(SORTED_WEAPON_COLORS.map((color) => [color, 0]))
}

export function getEmptyUnitsCountByWeaponColorByAvailability(): IndexedByBy<
  Availability,
  WeaponColor,
  number
> {
  return objectFromEntries(
    SORTED_AVAILABILITIES.map((availability) => [
      availability,
      getEmptyUnitsCountByWeaponColor(),
    ]),
  )
}

export function filterByName(
  unit: IUnit,
  r: RegExp | null | undefined,
): boolean {
  if (!r) return false

  return (
    !!unit.nameForFiltering.match(r) ||
    !!unit.nameForSelect.match(r) ||
    !!unit.full_name.match(r) ||
    !!unit.abbreviated_name.match(r) ||
    false
  )
}
