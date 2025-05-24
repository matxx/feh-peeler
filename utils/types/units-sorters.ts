export const ASC = 'asc'
export const DESC = 'desc'

export type Order = typeof ASC | typeof DESC

// keys directly on unit data

export const SORT_NAME = 'full_name'
export const SORT_GENDER = 'gender'
export const SORT_HAS_RESPLENDENT = 'has_respl'
// export const SORT_VERSION = 'version'
// export const SORT_GENERATION = 'generation'
export const SORT_BOOK = 'book'
export const SORT_RELEASE_DATE = 'release_date'
// export const SORT_GAME = 'game'
export const SORT_BST = 'bst'
// export const SORT_ELEMENT = 'element'
// export const SORT_ARTIST = 'artist'
// export const SORT_VA = 'VA'
// export const SORT_DRAGONFLOWERS = 'dragonflowers'
export const SORT_MAX_SCORE = 'max_score'
export const SORT_RATING = 'game8_rating'
export const SORT_ORIGIN = 'origin'
export const SORT_ID_INT = 'id_int'

// keys not on unit data

export const SORT_MOVE = 'move_type'
export const SORT_WEAP = 'weapon_type'
export const SORT_AVAILABILITY = 'availability'
export const SORT_IV_HP = 'HP'
export const SORT_IV_ATK = 'Atk'
export const SORT_IV_SPD = 'Spd'
export const SORT_IV_DEF = 'Def'
export const SORT_IV_RES = 'Res'

// special key to disable sorting
export const SORT_NOTHING = 'nothing'

export type SortingField =
  | typeof SORT_NAME
  | typeof SORT_GENDER
  | typeof SORT_HAS_RESPLENDENT
  // | typeof SORT_VERSION
  // | typeof SORT_GENERATION
  | typeof SORT_BOOK
  | typeof SORT_RELEASE_DATE
  // | typeof SORT_GAME
  | typeof SORT_BST
  // | typeof SORT_ELEMENT
  // | typeof SORT_ARTIST
  // | typeof SORT_VA
  // | typeof SORT_DRAGONFLOWERS
  | typeof SORT_MAX_SCORE
  | typeof SORT_RATING
  | typeof SORT_ORIGIN
  | typeof SORT_ID_INT
  // not on unit
  | typeof SORT_MOVE
  | typeof SORT_WEAP
  | typeof SORT_AVAILABILITY
  | typeof SORT_IV_HP
  | typeof SORT_IV_ATK
  | typeof SORT_IV_SPD
  | typeof SORT_IV_DEF
  | typeof SORT_IV_RES
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

export const createEmptySorters = () =>
  ({
    fields: [],
    orders: [],
  }) as ISorters

export const createDefaultSortersForUnitsByMaxScore = () =>
  ({
    fields: [SORT_MOVE, SORT_WEAP, SORT_NAME],
    orders: [ASC, ASC, ASC],
  }) as ISorters
