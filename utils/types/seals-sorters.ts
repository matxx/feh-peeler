import * as sealsColumns from '~/utils/types/seals-columns'

export const ASC = 'asc'
export const DESC = 'desc'

export type Order = typeof ASC | typeof DESC

// keys directly on seal data

export const SORT_NAME = 'name'
export const SORT_SP = 'sp'
export const SORT_TIER = 'tier'

// keys not on seal data

export const SORT_MAX = 'isMax'

export const SORT_RATING = 'game8_rating'
export const SORT_GRADE = 'game8_grade'
export const SORT_DESCRIPTION = 'description'

export const SORT_RESTRICTIONS = 'restrictions'

// special key to disable sorting
export const SORT_NOTHING = 'nothing'

export type SortingField =
  | typeof SORT_NAME
  | typeof SORT_SP
  | typeof SORT_TIER
  // not on unit
  | typeof SORT_MAX
  | typeof SORT_RATING
  | typeof SORT_GRADE
  | typeof SORT_DESCRIPTION
  | typeof SORT_RESTRICTIONS
  // special
  | typeof SORT_NOTHING

export interface ISorter {
  field: SortingField
  order: Order
}

export interface ISorters {
  fields: SortingField[]
  orders: Order[]
}

export const createEmptySorters = (): ISorters => ({
  fields: [],
  orders: [],
})

export const COLUMN_TO_SORT: { [key: string]: SortingField | undefined } = {
  [sealsColumns.COLUMN_NAME]: SORT_NAME,
  [sealsColumns.COLUMN_SP]: SORT_SP,
  [sealsColumns.COLUMN_TIER]: SORT_TIER,
  // proxy fields
  [sealsColumns.COLUMN_MAX]: SORT_MAX,
  [sealsColumns.COLUMN_RATING]: SORT_RATING,
  [sealsColumns.COLUMN_GRADE]: SORT_GRADE,
  [sealsColumns.COLUMN_DESCRIPTION]: SORT_DESCRIPTION,
  [sealsColumns.COLUMN_RESTRICTIONS]: SORT_RESTRICTIONS,
}
