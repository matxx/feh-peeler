import type { UnitId } from '@/utils/types/units'

export const BANE = 'bane'
export const BOON = 'boon'
type IV = typeof BANE | typeof BANE

type Stat = 'hp' | 'atk' | 'spd' | 'def' | 'res'

export const STATS: Stat[] = ['hp', 'atk', 'spd', 'def', 'res']

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

  iv_hp: IV | null
  iv_atk: IV | null
  iv_spd: IV | null
  iv_def: IV | null
  iv_res: IV | null
}

export type IUnitStatById = {
  [index: UnitId]: IUnitStat
}
