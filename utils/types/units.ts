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

export type UnitId = string

export const TAB_STATS = 'stats'
export const TAB_SKILLS = 'skills'
export const TAB_FODDER = 'fodder'
export type UnitTab = typeof TAB_FODDER | typeof TAB_STATS | typeof TAB_SKILLS
export const UNIT_TABS: UnitTab[] = [TAB_STATS, TAB_SKILLS, TAB_FODDER]
export const UNIT_DEFAULT_TAB = TAB_STATS

export const ALFONSE_ID = 'PID_アルフォンス'
export const SHARENA_ID = 'PID_シャロン'
export const ANNA_ID = 'PID_アンナ'
export const ASKR_TRIO_IDS = [ALFONSE_ID, SHARENA_ID, ANNA_ID]

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
  // game8_name?: string
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
  // is_fallen: boolean
  // is_story: boolean
  // is_tt: boolean
  // is_ghb: boolean
  // is_special: boolean
  // is_generic_pool: boolean

  is_legendary: boolean
  is_mythic: boolean

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

export type UnitsByAvailability = {
  [key in Availability]: IUnit[]
}
export type UnitsByWeaponColor = {
  [key in WeaponColor]: IUnit[]
}
export type UnitsCountByAvailability = {
  [key in Availability]: number
}
export type UnitsCountByWeaponColor = {
  [key in WeaponColor]: number
}
export type UnitsByWeaponColorByAvailability = {
  [key in Availability]: UnitsByWeaponColor
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
