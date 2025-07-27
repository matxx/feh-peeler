export const ASC = 'asc'
export const DESC = 'desc'

export type Order = typeof ASC | typeof DESC

// keys directly on skill data

export const SORT_NAME = 'name'
export const SORT_SLOT = 'category'
export const SORT_PRF = 'is_prf'
export const SORT_SP = 'sp'
export const SORT_CD = 'cd'
export const SORT_TIER = 'tier'
export const SORT_RELEASE_DATE = 'release_date'

// keys not on skill data

export const SORT_EFFECTIVENESS = 'eff'
export const SORT_MAX = 'isMax'

export const SORT_RATING = 'game8_rating'
export const SORT_GRADE = 'game8_grade'
export const SORT_DESCRIPTION = 'description'

export const SORT_RESTRICTIONS = 'restrictions'
export const SORT_AVAILABILITY = 'availability'
export const SORT_PRE_INHERITANCE = 'preInheritance'

// special key to disable sorting
export const SORT_NOTHING = 'nothing'

export type SortingField =
  | typeof SORT_NAME
  | typeof SORT_SLOT
  | typeof SORT_PRF
  | typeof SORT_SP
  | typeof SORT_CD
  | typeof SORT_TIER
  | typeof SORT_RELEASE_DATE
  // not on unit
  | typeof SORT_EFFECTIVENESS
  | typeof SORT_MAX
  | typeof SORT_RATING
  | typeof SORT_GRADE
  | typeof SORT_DESCRIPTION
  | typeof SORT_RESTRICTIONS
  | typeof SORT_AVAILABILITY
  | typeof SORT_PRE_INHERITANCE
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
