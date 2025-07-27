import type { Grade } from '@/utils/types/grades'
import type { Game8Id } from '@/utils/types/game8'
import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import { objectFromEntries } from '@/utils/functions/typeSafe'

// only for sorting purposes (when no rating from game8)
export const RATING_0 = '0'

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

export const CATEGORIES_FOR_SKILLS_FILTERS: SkillCategory[][] = [
  [SKILL_ASSIST, SKILL_SPECIAL, SKILL_PASSIVE_X],
  [SKILL_PASSIVE_A, SKILL_PASSIVE_B, SKILL_PASSIVE_C],
]

export const SORTED_SKILL_CATEGORIES = SKILL_CATEGORIES
export const SORTED_SLOT_INDEXES: { [key in SkillCategory]: number } =
  objectFromEntries(SORTED_SKILL_CATEGORIES.map((type, index) => [type, index]))

export const SKILL_CATEGORIES_WITH_ICON: SkillCategory[] = [
  SKILL_WEAPON,
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
export const TAB_DOWNGRADES = 'downgrades'
export const TAB_UPGRADES = 'upgrades'
export type SkillTab =
  | typeof TAB_DETAILS
  | typeof TAB_FODDERS
  | typeof TAB_DOWNGRADES
  | typeof TAB_UPGRADES
export const SKILL_TABS: SkillTab[] = [
  TAB_DETAILS,
  TAB_FODDERS,
  TAB_DOWNGRADES,
  TAB_UPGRADES,
]
export const SKILL_DEFAULT_TAB = TAB_DETAILS

export const EFF_INFANTRY = 'infantry'
export const EFF_ARMORED = 'armored'
export const EFF_CAVALRY = 'cavalry'
export const EFF_FLYING = 'flying'

export const EFF_MELEE = 'melee'
export const EFF_C_BOW = 'colorless bow'
export const EFF_MAGIC = 'magic'
export const EFF_BEAST = 'beast'
export const EFF_DRAGON = 'dragon'
export const EFF_DRAGONSTONE = 'dragonstone'

export const EFF_ALL = 'all'

export type Effectiveness =
  | typeof EFF_INFANTRY
  | typeof EFF_ARMORED
  | typeof EFF_CAVALRY
  | typeof EFF_FLYING
  | typeof EFF_MELEE
  | typeof EFF_C_BOW
  | typeof EFF_MAGIC
  | typeof EFF_BEAST
  | typeof EFF_DRAGON
  | typeof EFF_DRAGONSTONE
  | typeof EFF_ALL

export type SkillId = string

export interface ISkillRestrictions<T> {
  none?: true
  can_use?: T[]
  can_not_use?: T[]
}

export interface ISkillData {
  id: SkillId
  base_id?: SkillId
  game8_id?: Game8Id

  name: string
  group_name: string
  category: SkillCategory
  weapon_type?: ExtendedWeaponType
  refine?: string

  image_url?: string

  is_prf: boolean
  sp: number
  cd?: number
  eff?: Effectiveness[]
  tier: number

  downgrade_ids?: SkillId[]
  upgrade_ids?: SkillId[]

  restrictions: {
    moves: ISkillRestrictions<MoveType>
    weapons: ISkillRestrictions<ExtendedWeaponType>
  }

  addition_date: string
  release_date: string
}

export interface ISkill extends ISkillData {
  baseId: SkillId
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
export type TBySkillCategory<T> = {
  [key in SkillCategory]: T
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

export function filterByName(
  skill: ISkill,
  r: RegExp | null | undefined,
): boolean {
  if (!r) return false

  return !!skill.nameForFilters.match(r) || !!skill.name.match(r)
}
