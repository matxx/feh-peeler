import type { UnitId } from '@/utils/types/units'
import type { IConstants } from '@/utils/types/constants'

export const BANE = 'bane'
export const BOON = 'boon'
export type IV = typeof BANE | typeof BOON

export const HP = 'hp'
export const ATK = 'atk'
export const SPD = 'spd'
export const DEF = 'def'
export const RES = 'res'

export const BST = 'bst'
export const NONE = 'none'

export type Stat = typeof HP | typeof ATK | typeof SPD | typeof DEF | typeof RES
export type StatOrBST = Stat | typeof BST
export type StatOrNone = Stat | typeof NONE

export const STATS: Stat[] = [HP, ATK, SPD, DEF, RES]
export const STATS_AND_BST: StatOrBST[] = [HP, ATK, SPD, DEF, RES, BST]

export const STATS_IVS_COLORS = {
  [BANE]: 'text-red',
  [BOON]: 'text-blue',
  null: undefined,
}

export const STATS_NAMES = {
  [HP]: 'HP',
  [ATK]: 'Atk',
  [SPD]: 'Spd',
  [DEF]: 'Def',
  [RES]: 'Res',
}
export const STATS_COLORS = {
  [HP]: 'pink-accent-2',
  [ATK]: 'red-darken-4',
  [SPD]: 'green-darken-4',
  [DEF]: 'yellow-darken-1',
  [RES]: 'blue-darken-4',
}

export interface IUnitStat {
  id: UnitId

  level1_hp: number
  level1_atk: number
  level1_spd: number
  level1_def: number
  level1_res: number

  growth_rate_hp: number
  growth_rate_atk: number
  growth_rate_spd: number
  growth_rate_def: number
  growth_rate_res: number

  level40_hp: number
  level40_atk: number
  level40_spd: number
  level40_def: number
  level40_res: number

  iv_hp: IV | null
  iv_atk: IV | null
  iv_spd: IV | null
  iv_def: IV | null
  iv_res: IV | null
}

export type IUnitStatById = {
  [index: UnitId]: IUnitStat
}

export type IUnitStatMinMax = {
  [HP]: [number, number]
  [ATK]: [number, number]
  [SPD]: [number, number]
  [DEF]: [number, number]
  [RES]: [number, number]
  [BST]: [number, number]
}

export const getDefaulUnitStatsMinMax = (
  constants?: IConstants,
): IUnitStatMinMax => {
  if (!constants) {
    return {
      [HP]: [0, 60],
      [ATK]: [0, 50],
      [SPD]: [0, 48],
      [DEF]: [0, 50],
      [RES]: [0, 50],
      [BST]: [0, 212],
    }
  }

  return {
    [HP]: [0, constants.units_max_hp],
    [ATK]: [0, constants.units_max_atk],
    [SPD]: [0, constants.units_max_spd],
    [DEF]: [0, constants.units_max_def],
    [RES]: [0, constants.units_max_res],
    [BST]: [0, constants.units_max_bst],
  }
}

export const UNITS_RELEASED_ONLY_THAT_MONTH = 'UNITS_RELEASED_ONLY_THAT_MONTH'
export const UNITS_RELEASED_UP_TO_THAT_MONTH = 'UNITS_RELEASED_UP_TO_THAT_MONTH'
export const CONSIDERATIONS = [
  UNITS_RELEASED_ONLY_THAT_MONTH,
  UNITS_RELEASED_UP_TO_THAT_MONTH,
]

export const OPERATOR_AVERAGE = 'AVERAGE'
export const OPERATOR_MEDIAN = 'MEDIAN'
export const OPERATOR_MIN = 'MIN'
export const OPERATOR_MAX = 'MAX'
export const OPERATOR_MODE = 'MODE'
export const OPERATOR_RANGE = 'RANGE'
export const OPERATORS = [
  OPERATOR_AVERAGE,
  OPERATOR_MEDIAN,
  OPERATOR_MIN,
  OPERATOR_MAX,
  OPERATOR_MODE,
  OPERATOR_RANGE,
]
