import { objectFromEntries } from '~/utils/functions/typeSafe'
import type { IUnitData } from '~/utils/types/units'

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

export function getSortableMoveType(unit: IUnitData) {
  switch (unit.move_type) {
    case MOVE_I:
      return 0
    case MOVE_A:
      return 1
    case MOVE_C:
      return 2
    case MOVE_F:
      return 3
  }
}

export const MOVES_COLORS = {
  [MOVE_I]: 'red-darken-4',
  [MOVE_A]: 'green-darken-4',
  [MOVE_C]: 'yellow-darken-1',
  [MOVE_F]: 'blue-darken-4',
}
