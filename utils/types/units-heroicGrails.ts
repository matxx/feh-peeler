import type { UnitId } from '~/utils/types/units'

export interface IHeroicGrailData {
  start_time: string
  unit_id: UnitId
}

export interface IHeroicGrail extends IHeroicGrailData {
  startTime: Date
}

export const SORT_BY_NEWEST = 'NEWEST'
export const SORT_BY_ADDED = 'ADDED'
export const SORT_BY_ORIGIN = 'ORIGIN'
export const SORT_BY_TYPE = 'TYPE'
export const SORT_BY_WEAPON_TYPE = 'WEAPON_TYPE'
export const SORT_BY_MOVE_TYPE = 'MOVE_TYPE'

export const DEFAULT_ORDER = SORT_BY_NEWEST

export type SortOrder =
  | typeof SORT_BY_NEWEST
  | typeof SORT_BY_ADDED
  | typeof SORT_BY_ORIGIN
  | typeof SORT_BY_TYPE
  | typeof SORT_BY_WEAPON_TYPE
  | typeof SORT_BY_MOVE_TYPE

export const SORT_ORDERS: SortOrder[] = [
  SORT_BY_NEWEST,
  SORT_BY_ADDED,
  SORT_BY_ORIGIN,
  SORT_BY_TYPE,
  SORT_BY_WEAPON_TYPE,
  SORT_BY_MOVE_TYPE,
]
