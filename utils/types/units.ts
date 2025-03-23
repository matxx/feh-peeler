import { objectFromEntries } from '@/utils/functions/typeSafe'

import type { MoveType } from '@/utils/types/moves'
import type { WeaponType } from '@/utils/types/weapons'
import type { IV } from '@/utils/types/IVs'
import type { Game8Id } from '@/utils/types/game8'
import { SKILL_CATEGORIES } from '@/utils/types/skills'
import type { ISkillIdByCategory } from '@/utils/types/skills'

export type UnitId = string

export interface IUnitThumbnail {
  id: UnitId
  full_name: string

  image_url_for_portrait: string
  image_url_for_icon_legendary: string | null
  image_url_for_icon_mythic: string | null

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
  game8_id: Game8Id | null

  name: string
  title: string
  full_name: string

  image_url_for_portrait: string
  image_url_for_icon_legendary: string | null
  image_url_for_icon_mythic: string | null

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
  filterableName: string
  sortableName: string
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

export interface IUnitStats {
  id: UnitId
  level1_hp: number
  level1_atk: number
  level1_spd: number
  level1_def: number
  level1_res: number
  growth_rate_hp: number
  growth_rate_atk: number
  growth_rate_spd: number
  growth_rate_def: number
  growth_rate_res: number
  level40_hp: number
  level40_atk: number
  level40_spd: number
  level40_def: number
  level40_res: number
}
