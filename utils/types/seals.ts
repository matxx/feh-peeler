import type { Grade } from '~/utils/types/grades'
import type { Game8Id } from '~/utils/types/game8'
import type { MoveType } from '~/utils/types/moves'
import type { ExtendedWeaponType } from '~/utils/types/weapons'
import type { IRestrictions } from '~/utils/types/skills'

export type SealId = string

export const TAB_DEFAULT = 'default'
export type SealTab = typeof TAB_DEFAULT
export const SEAL_DEFAULT_TAB = TAB_DEFAULT

export interface ISealData {
  id: SealId
  game8_id: Game8Id | null

  name: string
  group_name: string

  image_url: string | null

  sp: number
  // tier: number

  restrictions: {
    moves: IRestrictions<MoveType>
    weapons: IRestrictions<ExtendedWeaponType>
  }
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
