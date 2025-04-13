import { objectFromEntries } from '@/utils/functions/typeSafe'

import type { MoveType } from '@/utils/types/moves'
import type { WeaponType } from '@/utils/types/weapons'
import type { IV } from '@/utils/types/IVs'
import type { Game8Id } from '@/utils/types/game8'
import { SKILL_CATEGORIES } from '@/utils/types/skills'
import type { ISkillIdByCategory } from '@/utils/types/skills'

export type UnitId = string

export const TAB_FODDER = 'fodder'
export const TAB_STATS = 'stats'
export const SHOW_TABS = [TAB_STATS, TAB_FODDER]
export const SHOW_DEFAULT_TAB = TAB_STATS

export interface IUnitThumbnail {
  id: UnitId
  full_name: string

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

export interface IUnitData {
  id: UnitId
  game8_id?: Game8Id

  name: string
  title: string
  full_name: string

  image_url_for_portrait: string
  image_url_for_icon_legendary?: string
  image_url_for_icon_mythic?: string

  move_type: MoveType
  weapon_type: WeaponType

  is_brave: boolean
  is_fallen: boolean
  is_story: boolean
  is_tt: boolean
  is_ghb: boolean
  is_special: boolean
  is_generic_pool: boolean

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
  visible_bst: number
  max_score: number
}

export interface IUnit extends IUnitData {
  nameForLink: string
  nameForFilters: string
  nameForSorting: string
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
