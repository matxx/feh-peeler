import type { UnitId, Gender } from '~/utils/types/units'

export const BOOKS_COUNT = 10

export interface IConstants {
  units_count: number
  units_max_hp: number
  units_max_hp_ids: UnitId[]
  units_max_atk: number
  units_max_atk_ids: UnitId[]
  units_max_spd: number
  units_max_spd_ids: UnitId[]
  units_max_def: number
  units_max_def_ids: UnitId[]
  units_max_res: number
  units_max_res_ids: UnitId[]
  units_max_bst: number
  units_max_bst_ids: UnitId[]

  skills_max_tier: number
  skills_max_sp: number
  skills_max_cd: number

  units_genders: Gender[]
  games: string[]
}
