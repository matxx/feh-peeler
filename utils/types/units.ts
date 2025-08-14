import type { DateTime } from 'luxon'

import { objectFromEntries } from '~/utils/functions/typeSafe'

import type { MoveType } from '~/utils/types/moves'
import {
  SORTED_WEAPON_COLORS,
  type WeaponType,
  type WeaponFamily,
  type WeaponColor,
} from '~/utils/types/weapons'
import type { IV } from '~/utils/types/IVs'
import type { Game8Id } from '~/utils/types/game8'
import { SKILL_CATEGORIES } from '~/utils/types/skills'
import type { TBySkillCategory, SkillId } from '~/utils/types/skills'
import {
  SORTED_AVAILABILITIES,
  type Availability,
} from '~/utils/types/units-availabilities'
import type { Element } from '~/utils/types/units-filters'

export type UnitId = string

export const TAB_STATS = 'stats'
export const TAB_SKILLS = 'skills'
export const TAB_FODDER = 'fodder'
export const TAB_FODDER_VALUE = 'fodder-value'

export const UNIT_DEFAULT_TAB = TAB_STATS

export type UnitTab =
  | typeof TAB_FODDER
  | typeof TAB_STATS
  | typeof TAB_SKILLS
  | typeof TAB_FODDER_VALUE
export const UNIT_TABS: UnitTab[] = [
  TAB_STATS,
  TAB_SKILLS,
  TAB_FODDER,
  TAB_FODDER_VALUE,
]
export const UNIT_TABS_WITH_TOOLTIP = [TAB_FODDER, TAB_FODDER_VALUE]

export const ALFONSE_ID = 'PID_アルフォンス'
export const SHARENA_ID = 'PID_シャロン'
export const ANNA_ID = 'PID_アンナ'
export const ASKR_TRIO_IDS = [ALFONSE_ID, SHARENA_ID, ANNA_ID]

// only for sorting purposes (when no rating from game8)
export const RATING_0 = '0'

export interface IUnitThumbnail {
  id: UnitId
  full_name: string
  nameForDisplay: string

  image_url_for_portrait: string
  image_url_for_icon_legendary?: string
  image_url_for_icon_mythic?: string

  move_type: MoveType
  weapon_type: WeaponType

  is_refresher: boolean
  is_duo: boolean
  is_harmonized: boolean
  is_aided: boolean
  is_ascended: boolean
  is_attuned: boolean
  is_emblem: boolean
  is_rearmed: boolean
}

type Gender =
  | 'Male'
  | 'Female'
  | 'MF'
  | 'FF'
  | 'N'
  | 'MM'
  | 'F'
  | 'M'
  | 'FM'
  | 'NF'

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
  image_url_for_icon_mythic?: string

  move_type: MoveType
  weapon_type: WeaponType

  book: number
  origin: string
  gender: Gender
  has_respl: boolean // has resplendent attire

  is_brave: boolean
  is_fallen: boolean
  is_story: boolean
  is_tt: boolean
  is_ghb: boolean
  // is_special: boolean
  // is_generic_pool: boolean

  is_legendary: boolean
  is_mythic: boolean
  element?: Element

  is_duo: boolean
  is_harmonized: boolean

  is_refresher: boolean

  is_rearmed: boolean
  is_attuned: boolean
  is_ascended: boolean
  is_emblem: boolean
  is_aided: boolean

  bst: number
  // duel_score: number
  // visible_bst: number
  max_score: number
  max_df: number
  theme?: string

  addition_date: string
  release_date: string
}

export interface IUnit extends IUnitData {
  weaponFamily: WeaponFamily
  weaponColor: WeaponColor

  nameForLink: string
  nameForFilters: string
  nameForSorting: string
  nameForDisplay: string

  sortableType: number
  sortableWeaponColor: number
  sortableWeaponType: number
  sortableMoveType: number

  hasPrfWeapon: boolean
  hasPrfSkill: boolean
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
  skillIds: TBySkillCategory<SkillId | undefined>
}

export function getEmptyUnitInstance(): IUnitInstance {
  return {
    id: null,
    skillIds: objectFromEntries(
      SKILL_CATEGORIES.map((cat) => [cat, undefined]),
    ),
  }
}

export interface IUnitRatingsGame8 {
  id: UnitId
  game8_rating: string
  recommended_boon: IV
  recommended_bane: IV
  recommended_plus10: IV
}

export type UnitsBy<T extends string | number | symbol> = {
  [key in T]: IUnit[]
}

export type UnitsCountByAvailability = {
  [key in Availability]: number
}
export type UnitsCountByWeaponColor = {
  [key in WeaponColor]: number
}
export type UnitsByWeaponColorByAvailability = {
  [key in Availability]: UnitsBy<WeaponColor>
}
export type UnitsCountByWeaponColorByAvailability = {
  [key in Availability]: UnitsCountByWeaponColor
}

export function getEmptyUnitsCountByWeaponColor(): UnitsCountByWeaponColor {
  return objectFromEntries(SORTED_WEAPON_COLORS.map((color) => [color, 0]))
}

export function getEmptyUnitsCountByWeaponColorByAvailability(): UnitsCountByWeaponColorByAvailability {
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
    !!unit.nameForFilters.match(r) ||
    !!unit.full_name.match(r) ||
    !!unit.abbreviated_name.match(r)
  )
}
