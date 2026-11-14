import type { IUnit } from '~/utils/types/units'
import { ASC, DESC, type Order } from '~/utils/types/units-sorters'
import {
  getSortableWeaponFamily,
  WEAPON_FAMILY_FOR_TYPE,
} from '~/utils/types/weapons'

export const GROUP_BY_NUMERIC_FIELDS = [
  'max_score',
  'bst',
  'duel_score',
  'clash_score',
  'skills_max_sp',
  'max_df',
  'book',
] as const satisfies (keyof IUnit)[]

export const GROUP_BY_STRING_FIELDS = [
  'name',
  'version',
  'origin',
  'gender',
  'move_type',
  'weapon_type',
  'weaponColor',
  'weaponFamily',
  'element',
  'theme',
] as const satisfies (keyof IUnit)[]

export const GROUP_BY_DATE_FIELDS = [
  'release_date',
  'refine_date',
  'remix_date',
] as const satisfies (keyof IUnit)[]

export type UnitGroupByNumericField = (typeof GROUP_BY_NUMERIC_FIELDS)[number]
export type UnitGroupByStringField = (typeof GROUP_BY_STRING_FIELDS)[number]
export type UnitGroupByDateField = (typeof GROUP_BY_DATE_FIELDS)[number]

export type UnitGroupByField =
  UnitGroupByNumericField | UnitGroupByStringField | UnitGroupByDateField

export const GROUP_BY_FIELDS: UnitGroupByField[] = [
  'name',
  ...GROUP_BY_NUMERIC_FIELDS,
  ...GROUP_BY_DATE_FIELDS,
  ...GROUP_BY_STRING_FIELDS.filter((field) => field !== 'name'),
]

export const DATE_PERIOD_YEAR = 'year'
export const DATE_PERIOD_MONTH = 'month'
export const DATE_PERIOD_DAY = 'day'

export type DatePeriod =
  typeof DATE_PERIOD_YEAR | typeof DATE_PERIOD_MONTH | typeof DATE_PERIOD_DAY

export const DATE_PERIODS: DatePeriod[] = [
  DATE_PERIOD_YEAR,
  DATE_PERIOD_MONTH,
  DATE_PERIOD_DAY,
]

const NUMERIC_FIELDS = new Set<UnitGroupByField>(GROUP_BY_NUMERIC_FIELDS)
const DATE_FIELDS = new Set<UnitGroupByField>(GROUP_BY_DATE_FIELDS)

export function isNumericGroupByField(field: UnitGroupByField) {
  return NUMERIC_FIELDS.has(field)
}

export function isDateGroupByField(field: UnitGroupByField | null) {
  return !!field && DATE_FIELDS.has(field)
}

// key used for units without value for the selected field
export const GROUP_BY_EMPTY_KEY = ''

// dates are ISO strings (YYYY-MM-DD)
const DATE_PERIOD_LENGTH: Record<DatePeriod, number> = {
  [DATE_PERIOD_YEAR]: 4,
  [DATE_PERIOD_MONTH]: 7,
  [DATE_PERIOD_DAY]: 10,
}

export function getGroupByKey(
  unit: IUnit,
  field: UnitGroupByField,
  datePeriod: DatePeriod,
): string {
  const value = unit[field]
  if (value === undefined || value === null || value === '') {
    return GROUP_BY_EMPTY_KEY
  }

  if (isDateGroupByField(field)) {
    return String(value).slice(0, DATE_PERIOD_LENGTH[datePeriod])
  }

  return String(value)
}

// numbers & dates are sorted descending by default, strings ascending
export function getDefaultGroupByOrder(field: UnitGroupByField): Order {
  return isNumericGroupByField(field) || isDateGroupByField(field) ? DESC : ASC
}

// fields whose groups are sorted with a dedicated value
// (taken from the first unit of the group) instead of the raw key
const SORTABLE_GETTERS: Partial<
  Record<UnitGroupByField, (unit: IUnit) => number | string>
> = {
  version: (unit) => unit.sortableVersion,
  element: (unit) => unit.sortableElement,
  move_type: (unit) => unit.sortableMoveType,
  weaponColor: (unit) => unit.sortableWeaponColor,
  weaponFamily: (unit) => getSortableWeaponFamily(unit.weaponFamily),
  weapon_type: (unit) =>
    unit.sortableWeaponColor * 10 +
    getSortableWeaponFamily(WEAPON_FAMILY_FOR_TYPE[unit.weapon_type]),
}

function compareValues(a: number | string, b: number | string) {
  if (typeof a === 'number' && typeof b === 'number') return a - b

  return String(a).localeCompare(String(b), undefined, { numeric: true })
}

// strings use natural order, units without value are always last
export function sortGroupByKeys(
  unitsByKey: Record<string, IUnit[]>,
  field: UnitGroupByField,
  order: Order,
): string[] {
  const numeric = isNumericGroupByField(field)
  const getSortable = SORTABLE_GETTERS[field]
  const direction = order === ASC ? 1 : -1

  const getValue = (key: string): number | string => {
    const unit = unitsByKey[key]?.[0]
    if (getSortable && unit) return getSortable(unit)
    if (numeric) return Number(key)

    return key
  }

  return Object.keys(unitsByKey).sort((a, b) => {
    if (a === b) return 0
    if (a === GROUP_BY_EMPTY_KEY) return 1
    if (b === GROUP_BY_EMPTY_KEY) return -1

    return direction * compareValues(getValue(a), getValue(b))
  })
}
