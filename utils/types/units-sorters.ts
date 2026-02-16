import * as unitsColumns from '~/utils/types/units-columns'

export const ASC = 'asc'
export const DESC = 'desc'

export type Order = typeof ASC | typeof DESC

// keys directly on unit data

export const SORT_NAME = 'full_name'
export const SORT_GENDER = 'gender'
export const SORT_HAS_RESPLENDENT = 'has_respl'
export const SORT_VERSION = 'version'
// export const SORT_GENERATION = 'generation'
export const SORT_BOOK = 'book'
export const SORT_RELEASE_DATE = 'release_date'
// export const SORT_GAME = 'game'
export const SORT_BST = 'bst'
export const SORT_MAX_DRAGONFLOWERS = 'max_df'
export const SORT_ELEMENT = 'element'
// export const SORT_ARTIST = 'artist'
// export const SORT_VA = 'VA'
export const SORT_MAX_SCORE = 'max_score'
export const SORT_RATING = 'game8_rating'
export const SORT_ORIGIN = 'origin'
export const SORT_ID_INT = 'id_int'
export const SORT_THEME = 'theme'
export const SORT_OWNED = 'owned'

// keys not on unit data

export const SORT_MOVE = 'move_type'
export const SORT_WEAP = 'weapon_type'
export const SORT_AVAILABILITY = 'availability'
export const SORT_STAT_HP = 'HP'
export const SORT_STAT_ATK = 'Atk'
export const SORT_STAT_SPD = 'Spd'
export const SORT_STAT_DEF = 'Def'
export const SORT_STAT_RES = 'Res'

// special key to disable sorting
export const SORT_NOTHING = 'nothing'

export type SortingField =
  | typeof SORT_NAME
  | typeof SORT_GENDER
  | typeof SORT_HAS_RESPLENDENT
  | typeof SORT_VERSION
  // | typeof SORT_GENERATION
  | typeof SORT_BOOK
  | typeof SORT_RELEASE_DATE
  // | typeof SORT_GAME
  | typeof SORT_BST
  | typeof SORT_MAX_DRAGONFLOWERS
  | typeof SORT_ELEMENT
  // | typeof SORT_ARTIST
  // | typeof SORT_VA
  | typeof SORT_MAX_SCORE
  | typeof SORT_RATING
  | typeof SORT_ORIGIN
  | typeof SORT_ID_INT
  | typeof SORT_THEME // but order should
  // not on unit
  | typeof SORT_MOVE
  | typeof SORT_WEAP
  | typeof SORT_AVAILABILITY
  | typeof SORT_STAT_HP
  | typeof SORT_STAT_ATK
  | typeof SORT_STAT_SPD
  | typeof SORT_STAT_DEF
  | typeof SORT_STAT_RES
  | typeof SORT_OWNED
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

export const createDefaultSortersForUnitsByMaxScore = (): ISorters => ({
  fields: [SORT_MOVE, SORT_WEAP, SORT_NAME],
  orders: [ASC, ASC, ASC],
})

export const COLUMN_TO_SORT: { [key: string]: SortingField | undefined } = {
  [unitsColumns.COLUMN_NAME]: SORT_NAME,
  [unitsColumns.COLUMN_GENDER]: SORT_GENDER,
  [unitsColumns.COLUMN_HAS_RESPLENDENT]: SORT_HAS_RESPLENDENT,
  [unitsColumns.COLUMN_BOOK]: SORT_BOOK,
  [unitsColumns.COLUMN_RELEASE_DATE]: SORT_RELEASE_DATE,
  [unitsColumns.COLUMN_VERSION]: SORT_VERSION,
  [unitsColumns.COLUMN_ELEMENT]: SORT_ELEMENT,
  [unitsColumns.COLUMN_BST]: SORT_BST,
  [unitsColumns.COLUMN_MAX_DRAGONFLOWERS]: SORT_MAX_DRAGONFLOWERS,
  [unitsColumns.COLUMN_MAX_SCORE]: SORT_MAX_SCORE,
  [unitsColumns.COLUMN_RATING]: SORT_RATING,
  [unitsColumns.COLUMN_THEME]: SORT_THEME,
  // proxy fields
  [unitsColumns.COLUMN_MOVE]: SORT_MOVE,
  [unitsColumns.COLUMN_WEAPON]: SORT_WEAP,
  [unitsColumns.COLUMN_AVAILABILITY]: SORT_AVAILABILITY,
  [unitsColumns.COLUMN_STAT_HP]: SORT_STAT_HP,
  [unitsColumns.COLUMN_STAT_ATK]: SORT_STAT_ATK,
  [unitsColumns.COLUMN_STAT_SPD]: SORT_STAT_SPD,
  [unitsColumns.COLUMN_STAT_DEF]: SORT_STAT_DEF,
  [unitsColumns.COLUMN_STAT_RES]: SORT_STAT_RES,
  [unitsColumns.COLUMN_ORIGIN]: SORT_ORIGIN,
  [unitsColumns.COLUMN_ID_INT]: SORT_ID_INT,
  [unitsColumns.COLUMN_OWNED]: SORT_OWNED,
}
