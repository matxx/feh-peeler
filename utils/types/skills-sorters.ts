import * as skillsColumns from '~/utils/types/skills-columns'

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
export const SORT_VERSION = 'version'

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
  | typeof SORT_VERSION
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

export const COLUMN_TO_SORT: { [key: string]: SortingField | undefined } = {
  [skillsColumns.COLUMN_NAME]: SORT_NAME,
  [skillsColumns.COLUMN_SLOT]: SORT_SLOT,
  [skillsColumns.COLUMN_PRF]: SORT_PRF,
  [skillsColumns.COLUMN_SP]: SORT_SP,
  [skillsColumns.COLUMN_CD]: SORT_CD,
  [skillsColumns.COLUMN_TIER]: SORT_TIER,
  [skillsColumns.COLUMN_RELEASE_DATE]: SORT_RELEASE_DATE,
  [skillsColumns.COLUMN_VERSION]: SORT_VERSION,
  // proxy fields
  [skillsColumns.COLUMN_EFFECTIVENESS]: SORT_EFFECTIVENESS,
  [skillsColumns.COLUMN_MAX]: SORT_MAX,
  [skillsColumns.COLUMN_RATING]: SORT_RATING,
  [skillsColumns.COLUMN_GRADE]: SORT_GRADE,
  [skillsColumns.COLUMN_DESCRIPTION]: SORT_DESCRIPTION,
  [skillsColumns.COLUMN_RESTRICTIONS]: SORT_RESTRICTIONS,
  [skillsColumns.COLUMN_AVAILABILITY]: SORT_AVAILABILITY,
  [skillsColumns.COLUMN_PRE_INHERITANCE]: SORT_PRE_INHERITANCE,
  [skillsColumns.COLUMN_OWNERS]: SORT_NOTHING,
}
