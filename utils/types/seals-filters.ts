import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import type { IConstants } from '~/utils/types/constants'

export const TIER = 'tier'
export const SP = 'sp'
export type Stat = typeof TIER | typeof SP
export const STATS: Stat[] = [TIER, SP]

export type ISealStatMinMax = {
  [TIER]: [number, number]
  [SP]: [number, number]
}

export interface IFilters {
  name: string | null
  description: string | null

  canUse: {
    weapons: Set<ExtendedWeaponType>
    moves: Set<MoveType>
  }

  isMax: boolean | null

  stats: ISealStatMinMax
}

export const createFilters = (stats: ISealStatMinMax): IFilters => ({
  name: null,
  description: null,

  canUse: {
    weapons: new Set(),
    moves: new Set(),
  },

  isMax: null,

  stats,
})

export const getDefaultSealStatsMinMax = (
  constants?: IConstants,
): ISealStatMinMax => {
  if (!constants) {
    return {
      [TIER]: [0, 3],
      [SP]: [0, 300],
    }
  }

  return {
    [TIER]: [0, constants.seals_max_tier],
    [SP]: [0, constants.seals_max_sp],
  }
}
