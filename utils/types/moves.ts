import { objectFromEntries } from '~/utils/functions/typeSafe'

export const MOVE_I = 'Infantry'
export const MOVE_A = 'Armored'
export const MOVE_C = 'Cavalry'
export const MOVE_F = 'Flying'

export type MoveType =
  | typeof MOVE_I
  | typeof MOVE_A
  | typeof MOVE_C
  | typeof MOVE_F

export const SORTED_MOVE_TYPES: MoveType[] = [MOVE_I, MOVE_A, MOVE_C, MOVE_F]

export const SORTED_MOVE_TYPES_INDEXES: { [key in MoveType]: number } =
  objectFromEntries(SORTED_MOVE_TYPES.map((type, index) => [type, index]))
