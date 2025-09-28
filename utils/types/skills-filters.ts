import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import type { Availability } from '@/utils/types/units-availabilities'
import type { IConstants } from '~/utils/types/constants'
import type { SkillCategory } from './skills'
import getSortableVersion from '~/utils/functions/getSortableVersion'

export const TIER = 'tier'
export const SP = 'sp'
export const CD = 'cd'
export type Stat = typeof TIER | typeof SP | typeof CD
export const STATS: Stat[] = [TIER, SP, CD]

export const VERSION_8_0 = getSortableVersion('8.0')

export const HOF_DISABLED = 'DISABLED'
export const HOF_13_20 = '13_20'
export const HOF_21_24 = '21_24'
export const HOF_25 = '25'
export type HoFChamber =
  | typeof HOF_DISABLED
  | typeof HOF_13_20
  | typeof HOF_21_24
  | typeof HOF_25
export const HOF_FILTER_LIST: HoFChamber[] = [HOF_25, HOF_21_24, HOF_13_20]

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

  hof: HoFChamber

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

  hof: HOF_DISABLED,

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
