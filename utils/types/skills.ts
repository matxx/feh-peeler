import type { Grade } from '@/utils/types/grades'
import type { Game8Id } from '@/utils/types/game8'
import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'

export const SKILL_WEAPON = 'weapon'
export const SKILL_ASSIST = 'assist'
export const SKILL_SPECIAL = 'special'
export const SKILL_PASSIVE_A = 'passivea'
export const SKILL_PASSIVE_B = 'passiveb'
export const SKILL_PASSIVE_C = 'passivec'
export const SKILL_PASSIVE_S = 'sacredseal'
export const SKILL_PASSIVE_X = 'passivex'

export type SkillCategory =
  | typeof SKILL_WEAPON
  | typeof SKILL_ASSIST
  | typeof SKILL_SPECIAL
  | typeof SKILL_PASSIVE_A
  | typeof SKILL_PASSIVE_B
  | typeof SKILL_PASSIVE_C
  | typeof SKILL_PASSIVE_S
  | typeof SKILL_PASSIVE_X

export type SkillCategoryWithIcon =
  | typeof SKILL_PASSIVE_A
  | typeof SKILL_PASSIVE_B
  | typeof SKILL_PASSIVE_C
  | typeof SKILL_PASSIVE_S
  | typeof SKILL_PASSIVE_X

export const SKILL_CATEGORIES: SkillCategory[] = [
  SKILL_WEAPON,
  SKILL_ASSIST,
  SKILL_SPECIAL,
  SKILL_PASSIVE_A,
  SKILL_PASSIVE_B,
  SKILL_PASSIVE_C,
  SKILL_PASSIVE_S,
  SKILL_PASSIVE_X,
]

export const SKILL_CATEGORIES_WITH_ICON: SkillCategory[] = [
  SKILL_PASSIVE_A,
  SKILL_PASSIVE_B,
  SKILL_PASSIVE_C,
  SKILL_PASSIVE_S,
  SKILL_PASSIVE_X,
]

export const SKILL_CATEGORIES_FOR_SKILLS_LISTS: SkillCategory[] = [
  SKILL_WEAPON,
  SKILL_ASSIST,
  SKILL_SPECIAL,
  SKILL_PASSIVE_A,
  SKILL_PASSIVE_B,
  SKILL_PASSIVE_C,
  // SKILL_PASSIVE_S, // TODO: handle seals
  SKILL_PASSIVE_X,
]

export const SKILL_CATEGORIES_FOR_HALL_OF_FORMS: SkillCategory[] = [
  SKILL_WEAPON,
  SKILL_ASSIST,
  SKILL_SPECIAL,
  SKILL_PASSIVE_A,
  SKILL_PASSIVE_B,
  SKILL_PASSIVE_C,
]

export const SKILL_CATEGORIES_FOR_BINDING_WORLDS: SkillCategory[] = [
  SKILL_WEAPON,
  SKILL_ASSIST,
  SKILL_SPECIAL,
  SKILL_PASSIVE_A,
  SKILL_PASSIVE_B,
  SKILL_PASSIVE_C,
  SKILL_PASSIVE_X,
]

export const DEFAULT_SELECTED_TAB = SKILL_WEAPON

export const TAB_DETAILS = 'details'
export const TAB_FODDERS = 'fodders'
export const SHOW_TABS = [TAB_DETAILS, TAB_FODDERS]
export const SHOW_DEFAULT_TAB = TAB_DETAILS

export type SkillId = string

export interface ISkillRestrictions<T> {
  none?: true
  can_use?: T[]
  can_not_use?: T[]
}

export interface ISkillData {
  id: SkillId
  game8_id?: Game8Id

  name: string
  group_name: string
  category: SkillCategory
  weapon_type?: ExtendedWeaponType
  refine?: string

  image_url?: string

  is_prf: boolean
  sp: number
  tier: number

  downgrade_ids?: SkillId[]
  upgrade_ids?: SkillId[]

  restrictions: {
    moves: ISkillRestrictions<MoveType>
    weapons: ISkillRestrictions<ExtendedWeaponType>
  }
}

export interface ISkill extends ISkillData {
  nameForLink: string
  nameForFilters: string
  nameForSorting: string
}

export interface ISkillTree {
  id: SkillId
  title: string
  skill: ISkill
  children?: ISkillTree[]
}

export type ISkillById = {
  [index: SkillId]: ISkill
}
export type ISkillByName = {
  [index: string]: ISkill
}
export type ISkillIdByCategory = {
  [key in SkillCategory]: SkillId | null
}

export type ISkillsByCategory = {
  [key in SkillCategory]: ISkill[]
}

export interface ISkillDescription {
  id: SkillId
  description: string | null
}

export interface ISkillRatingsGame8 {
  id: SkillId
  game8_rating: string | null
  game8_grade: Grade | null
}
