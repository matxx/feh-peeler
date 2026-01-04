import type { Grade } from '~/utils/types/grades'
import type { Game8Id } from '~/utils/types/game8'
import type { MoveType } from '~/utils/types/moves'
import type { ExtendedWeaponType } from '~/utils/types/weapons'
import type { IRestrictions } from '~/utils/types/skills'

// only for sorting purposes (when no rating from game8)
export const RATING_0 = '0'

export type SealId = string

export const TAB_DETAILS = 'details'
export const TAB_DOWNGRADES = 'downgrades'
export const TAB_UPGRADES = 'upgrades'
export type SealTab =
  | typeof TAB_DETAILS
  | typeof TAB_DOWNGRADES
  | typeof TAB_UPGRADES

export const SEAL_DEFAULT_TAB = TAB_DETAILS

export interface ISealData {
  id: SealId
  game8_id: Game8Id | null

  name: string
  group_name: string

  image_url: string | null

  sp: number
  tier: number

  restrictions: {
    moves: IRestrictions<MoveType>
    weapons: IRestrictions<ExtendedWeaponType>
  }

  downgrade_ids?: SealId[]
  upgrade_ids?: SealId[]
}

export interface ISeal extends ISealData {
  nameForLink: string
  nameForSelect: string
  nameForSorting: string
  nameForFiltering: string
}

export type ISealById = {
  [index: SealId]: ISeal
}
export type ISealByName = {
  [index: string]: ISeal
}

export interface ISealDescription {
  id: SealId
  description: string | null
}

export interface ISealRatingsGame8 {
  id: SealId
  game8_grade: Grade | null
}

export function filterByName(
  seal: ISeal,
  r: RegExp | null | undefined,
): boolean {
  if (!r) return false

  return (
    !!seal.nameForFiltering.match(r) ||
    !!seal.nameForSelect.match(r) ||
    !!seal.name.match(r) ||
    false
  )
}

export function filterByDescription(
  skillDescription: ISealDescription,
  r: RegExp | null | undefined,
): boolean {
  if (!r) return false
  if (!skillDescription.description) return false

  return !!skillDescription.description.match(r)
}
