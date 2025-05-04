import { objectFromEntries } from '~/utils/functions/typeSafe'

import type { MoveType } from '~/utils/types/moves'
import type {
  WeaponType,
  WeaponFamily,
  WeaponColor,
} from '~/utils/types/weapons'
import type { IV } from '~/utils/types/IVs'
import type { Game8Id } from '~/utils/types/game8'
import { SKILL_CATEGORIES } from '~/utils/types/skills'
import type { ISkillIdByCategory } from '~/utils/types/skills'
import type { Availability } from '~/utils/types/units-availabilities'

export type UnitId = string

export const TAB_FODDER = 'fodder'
export const TAB_STATS = 'stats'
export const SHOW_TABS = [TAB_STATS, TAB_FODDER]
export const SHOW_DEFAULT_TAB = TAB_STATS

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
  game8_name?: string

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
}

export interface IUnit extends IUnitData {
  weaponFamily: WeaponFamily
  weaponColor: WeaponColor
  availability?: Availability
  nameForLink: string
  nameForFilters: string
  nameForSorting: string
  nameForDisplay: string
}

export interface IUnitInstance {
  id: UnitId | null
  skillIds: ISkillIdByCategory
}

export function getEmptyUnitInstance(): IUnitInstance {
  return {
    id: null,
    skillIds: objectFromEntries(SKILL_CATEGORIES.map((cat) => [cat, null])),
  }
}

export interface IUnitRatingsGame8 {
  id: UnitId
  game8_rating: string
  recommended_boon: IV
  recommended_bane: IV
  recommended_plus10: IV
}

export const COLUMN_THUMBNAIL = 'thumbnail'

export const COLUMN_NAME = 'name'
export const COLUMN_GENDER = 'gender'
export const COLUMN_HAS_RESPLENDENT = 'has_respl'
export const COLUMN_AVAILABILITY = 'availability'
export const COLUMN_WEAPON = 'weapon'
export const COLUMN_MOVE = 'move'
export const COLUMN_VERSION = 'version'
export const COLUMN_GENERATION = 'generation'
export const COLUMN_BOOK = 'book'
export const COLUMN_RELEASE_DATE = 'release-date'
export const COLUMN_GAME = 'game'
export const COLUMN_IV_HP = 'HP'
export const COLUMN_IV_ATK = 'Atk'
export const COLUMN_IV_SPD = 'Spd'
export const COLUMN_IV_DEF = 'Def'
export const COLUMN_IV_RES = 'Res'
export const COLUMN_BST = 'bst'
export const COLUMN_ELEMENT = 'element'
export const COLUMN_ARTIST = 'artist'
export const COLUMN_VA = 'VA'
export const COLUMN_DRAGONFLOWERS = 'dragonflowers'
export const COLUMN_MAX_SCORE = 'max_score'

export const DEFAULT_COLUMNS = [
  COLUMN_NAME,
  COLUMN_AVAILABILITY,
  COLUMN_WEAPON,
  COLUMN_MOVE,
  COLUMN_VERSION,
  COLUMN_IV_HP,
  COLUMN_IV_ATK,
  COLUMN_IV_SPD,
  COLUMN_IV_DEF,
  COLUMN_IV_RES,
  COLUMN_BST,
]

export const ALL_COLUMNS = [
  COLUMN_THUMBNAIL,
  COLUMN_NAME,
  COLUMN_GENDER,
  COLUMN_HAS_RESPLENDENT,
  COLUMN_AVAILABILITY,
  COLUMN_WEAPON,
  COLUMN_MOVE,
  // COLUMN_VERSION,
  // COLUMN_GENERATION,
  COLUMN_BOOK,
  // COLUMN_RELEASE_DATE,
  // COLUMN_GAME,
  COLUMN_IV_HP,
  COLUMN_IV_ATK,
  COLUMN_IV_SPD,
  COLUMN_IV_DEF,
  COLUMN_IV_RES,
  COLUMN_BST,
  // COLUMN_ELEMENT,
  // COLUMN_ARTIST,
  // COLUMN_VA,
  // COLUMN_DRAGONFLOWERS,
]

export const COLUMNS_IN_FILTERS = [
  COLUMN_NAME,
  COLUMN_GENDER,
  COLUMN_HAS_RESPLENDENT,
  COLUMN_AVAILABILITY,
  COLUMN_WEAPON,
  COLUMN_MOVE,
  // COLUMN_VERSION,
  // COLUMN_GENERATION,
  COLUMN_BOOK,
  // COLUMN_RELEASE_DATE,
  // COLUMN_GAME,
  COLUMN_IV_HP,
  COLUMN_IV_ATK,
  COLUMN_IV_SPD,
  COLUMN_IV_DEF,
  COLUMN_IV_RES,
  COLUMN_BST,
  // COLUMN_ELEMENT,
  // COLUMN_ARTIST,
  // COLUMN_VA,
  // COLUMN_DRAGONFLOWERS,
]

export type UnitsByWeaponColor = {
  [key in WeaponColor]: IUnit[]
}
export type UnitsCountByWeaponColor = {
  [key in WeaponColor]: number
}

export type UnitsByWeaponColorByAvailability = {
  [key in Availability]: UnitsByWeaponColor
}
export interface TrueUnitsByWeaponColorByAvailability
  extends UnitsByWeaponColorByAvailability {
  undefined: UnitsByWeaponColor
}
export interface TrueUnitsCountByWeaponColor extends UnitsCountByWeaponColor {
  undefined: number
}

export type UnitsCountByWeaponColorByAvailability = {
  [key in Availability]: UnitsCountByWeaponColor
}
export interface TrueUnitsCountByWeaponColorByAvailability
  extends UnitsCountByWeaponColorByAvailability {
  undefined: UnitsCountByWeaponColor
}

export type UnitsCountByAvailability = {
  [key in Availability]: number
}
export interface TrueUnitsCountByAvailability extends UnitsCountByAvailability {
  undefined: number
}
