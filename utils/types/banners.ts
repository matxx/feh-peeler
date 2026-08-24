import type { UnitId } from '~/utils/types/units'

export interface IBannerData {
  name: string
  start_time: string
  end_time: string
  unit_ids: UnitId[]
}
export interface IBanner extends IBannerData {
  nameForSorting: string
}
