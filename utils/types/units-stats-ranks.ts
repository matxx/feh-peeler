import type { UnitId } from '@/utils/types/units'

export interface IUnitStatRank {
  id: UnitId

  rank_hp: number
  rank_atk: number
  rank_spd: number
  rank_def: number
  rank_res: number
  rank_bst: number
}
