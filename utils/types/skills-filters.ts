import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import type { Availability } from '@/utils/types/units-availabilities'
import type { IConstants } from '~/utils/types/constants'
import type { SkillCategory } from './skills'

export const TIER = 'tier'
export const SP = 'sp'
export const CD = 'cd'
export type Stat = typeof TIER | typeof SP | typeof CD
export const STATS: Stat[] = [TIER, SP, CD]

export type ISkillStatMinMax = {
  [TIER]: [number, number]
  [SP]: [number, number]
  [CD]: [number, number]
}

export interface IFilters {
  name: string | null
  description: string | null

  categories: Set<SkillCategory>
  weaponTypes: Set<ExtendedWeaponType>

  canUse: {
    weapons: Set<ExtendedWeaponType>
    moves: Set<MoveType>
  }

  availabilities: Set<Availability>
  preInheritance: Set<Availability>

  isPrf: boolean | null
  isMax: boolean | null

  stats: ISkillStatMinMax
}

export const createFilters = (stats: ISkillStatMinMax): IFilters => ({
  name: null,
  description: null,

  categories: new Set(),
  weaponTypes: new Set(),

  canUse: {
    weapons: new Set(),
    moves: new Set(),
  },

  availabilities: new Set(),
  preInheritance: new Set(),

  isPrf: null,
  isMax: null,

  stats,
})

export const getDefaulSkillStatsMinMax = (
  constants?: IConstants,
): ISkillStatMinMax => {
  if (!constants) {
    return {
      [TIER]: [0, 4],
      [SP]: [0, 500],
      [CD]: [0, 5],
    }
  }

  return {
    [TIER]: [0, constants.skills_max_tier],
    [SP]: [0, constants.skills_max_sp],
    [CD]: [0, constants.skills_max_cd],
  }
}
