import type { UnitId } from '@/utils/types/units'

export const BANE = 'bane'
export const BOON = 'boon'
export type IV = typeof BANE | typeof BANE

export const HP = 'hp'
export const ATK = 'atk'
export const SPD = 'spd'
export const DEF = 'def'
export const RES = 'res'

export const BST = 'bst'

export type Stat = typeof HP | typeof ATK | typeof SPD | typeof DEF | typeof RES
export type StatOrBST = Stat | typeof BST

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

  rank_hp: number
  rank_atk: number
  rank_spd: number
  rank_def: number
  rank_res: number
  rank_bst: number

  iv_hp: IV | null
  iv_atk: IV | null
  iv_spd: IV | null
  iv_def: IV | null
  iv_res: IV | null
}

export type IUnitStatById = {
  [index: UnitId]: IUnitStat
}
