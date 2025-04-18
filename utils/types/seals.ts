import type { Grade } from '@/utils/types/grades'
import type { Game8Id } from '@/utils/types/game8'
import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'

export type SealId = string

export interface ISealRestrictions<T> {
  none?: true
  can_use?: T[]
  can_not_use?: T[]
}

export interface ISealData {
  id: SealId
  game8_id: Game8Id | null

  name: string
  group_name: string

  image_url: string | null

  sp: number
  // tier: number

  restrictions: {
    moves: ISealRestrictions<MoveType>
    weapons: ISealRestrictions<ExtendedWeaponType>
  }
}

export interface ISeal extends ISealData {
  filterableName: string
  sortableName: string
}

export type ISealById = {
  [index: SealId]: ISeal
}

export interface ISealDescription {
  id: SealId
  description: string | null
}

export interface ISealRatingsGame8 {
  id: SealId
  game8_grade: Grade | null
}
