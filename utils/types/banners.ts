import type { UnitId } from '~/utils/types/units'
import type { FandomId } from '~/utils/types/fandom'

export interface IBannerReoccurrence {
  start_time: string
  end_time: string
}

export interface IBannerData {
  name: string
  fandom_id: FandomId
  start_time: string
  end_time: string
  unit_ids: UnitId[]
  reruns?: IBannerReoccurrence[]
}
export interface IBanner extends IBannerData {
  nameForSorting: string
}

export interface IBannerOccurrence {
  banner: IBanner
  start_time: string
  end_time: string
}
