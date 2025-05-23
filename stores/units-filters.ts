import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import every from 'lodash-es/every'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

import * as a from '~/utils/types/units-availabilities'
import {
  STATS,
  type IUnitStatById,
  type StatOrBST,
} from '~/utils/types/units-stats'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '~/utils/types/obfuscated-keys'

import type { IUnit } from '~/utils/types/units'
import { createFilters, type IFilters } from '~/utils/types/units-filters'
import {
  SORT_MOVE,
  SORT_WEAP,
  SORT_AVAILABILITY,
  SORT_IV_HP,
  SORT_IV_ATK,
  SORT_IV_SPD,
  SORT_IV_DEF,
  SORT_IV_RES,
  SORT_NOTHING,
  createEmptySorters,
  type ISorter,
  type ISorters,
} from '~/utils/types/units-sorters'
import { SORTED_MOVE_TYPES_INDEXES } from '~/utils/types/moves'
import { SORTED_WEAPON_TYPES_INDEXES } from '~/utils/types/weapons'

function filterName(u: IUnit, r?: RegExp) {
  if (!r) return true

  return u.nameForFilters.match(r)
}

function filterMoveType(filters: IFilters, u: IUnit) {
  if (filters.moves.size === 0) return true

  return filters.moves.has(u.move_type)
}

function filterWeaponType(filters: IFilters, u: IUnit) {
  if (filters.weapons.size === 0) return true

  return filters.weapons.has(u.weapon_type)
}

function filterBoolean(condition: boolean | null, bool: boolean) {
  switch (condition) {
    case true:
      return bool
    case false:
      return !bool
    default:
      return true
  }
}
const filterRefresher = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isRefresher, u.is_refresher)
const filterResplendent = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.hasResplendent, u.has_respl)
const filterBrave = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isBrave, u.is_brave)
const filterHasPrfWeapon = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.hasPrfWeapon, u.hasPrfWeapon)
const filterHasPrfSkill = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.hasPrfSkill, u.hasPrfSkill)

function filterStats(filters: IFilters, u: IUnit, statById: IUnitStatById) {
  if (u.bst < filters.stats.bst[0]) return false
  if (u.bst > filters.stats.bst[1]) return false

  const stats = statById[u.id]
  if (!stats) return false

  return every(STATS, (stat) => {
    if (stats[`level40_${stat}`] < filters.stats[stat][0]) return false
    if (stats[`level40_${stat}`] > filters.stats[stat][1]) return false

    return true
  })
}

function filterAvailability(
  filters: IFilters,
  u: IUnit,
  availabilitiesById: a.IUnitAvailabilityById,
) {
  if (filters.availabilities.size === 0) return true

  const availability = availabilitiesById[u.id]
  if (!availability) return false

  if (
    availability.is_in[HEROIC_GRAILS] &&
    filters.availabilities.has(a.AV_SCORE_HEROIC_GRAILS)
  ) {
    return true
  }
  if (
    availability.is_in[LIMITED_DIVINE_CODES] &&
    filters.availabilities.has(a.AV_SCORE_LIMITED_DIVINE_CODES)
  ) {
    return true
  }
  if (
    availability.is_in[NORMAL_DIVINE_CODES] &&
    filters.availabilities.has(a.AV_SCORE_NORMAL_DIVINE_CODES)
  ) {
    return true
  }
  if (
    availability.is_in[FOCUS_ONLY] &&
    filters.availabilities.has(a.AV_SCORE_LIMITED_HEROES)
  ) {
    return true
  }

  if (availability.is_in[GENERIC_SUMMON_POOL]) {
    switch (availability.lowest_rarity[GENERIC_SUMMON_POOL]) {
      case 3:
      case 4:
        if (filters.availabilities.has(a.AV_SCORE_GENERIC_POOL_3_4)) return true
        break
      case 4.5:
        if (filters.availabilities.has(a.AV_SCORE_GENERIC_POOL_45)) return true
        break
      case 5:
        if (filters.availabilities.has(a.AV_SCORE_GENERIC_POOL_5)) return true
    }
  }

  if (availability.is_in[SPECIAL_SUMMON_POOL]) {
    switch (availability.lowest_rarity[SPECIAL_SUMMON_POOL]) {
      case 4:
        if (filters.availabilities.has(a.AV_SCORE_SPECIAL_POOL_4)) return true
        break
      case 4.5:
        if (filters.availabilities.has(a.AV_SCORE_SPECIAL_POOL_45)) return true
        break
      case 5:
        if (filters.availabilities.has(a.AV_SCORE_SPECIAL_POOL_5)) return true
    }
  }

  return false
}

// https://stackoverflow.com/a/78061467/5032734
const f =
  <V, I, R>(func: (v: V, i: I) => R, i: I) =>
  (v: V) =>
    func(v, i)

export const useStoreUnitsFilters = defineStore('units-filters', () => {
  const storeDataConstants = useStoreDataConstants()
  const storeDataUnits = useStoreDataUnits()
  const storeDataUnitsStats = useStoreDataUnitsStats()
  const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

  const filters = ref<IFilters>(createFilters(storeDataConstants.constants))
  const sorters = ref<ISorters>(createEmptySorters())

  function $reset() {
    filters.value = createFilters(storeDataConstants.constants)
    sorters.value = createEmptySorters()
  }

  const anyFilterActive = computed(
    () =>
      filters.value.traits.size > 0 ||
      filters.value.moves.size > 0 ||
      filters.value.weapons.size > 0 ||
      filters.value.availabilities.size > 0 ||
      filters.value.isRefresher !== null ||
      filters.value.hasResplendent !== null ||
      filters.value.isBrave !== null ||
      filters.value.hasPrfWeapon !== null ||
      filters.value.hasPrfSkill !== null ||
      // @ts-expect-error unsafe typings
      some(
        filters.value.stats,
        ([min, max], stat: StatOrBST) =>
          min > 0 ||
          (storeDataConstants.constants
            ? max < storeDataConstants.constants[`units_max_${stat}`]
            : false),
      ) ||
      false,
  )

  function updateSorter([index, sorter]: [number, ISorter]) {
    if (!sorters.value) return

    sorters.value.fields[index] = sorter.field
    sorters.value.orders[index] = sorter.order
  }

  const search = computed(() => filters.value.name)
  const searchLength = computed(() =>
    filters.value.name ? filters.value.name.length : 0,
  )
  const counter = computed(() =>
    searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
  )
  const searchIsActive = computed(
    () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
  )
  const { regexp, errorMessages } = useSearch(search)

  const filterUnits = (units: IUnit[]) =>
    flow(
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) =>
        filterName(u, searchIsActive.value ? regexp.value : undefined),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) =>
        filterAvailability(
          filters.value,
          u,
          storeDataUnitsAvailabilities.availabilitiesById,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => {
        if (filters.value.traits.size === 0) return true

        return some(Array.from(filters.value.traits), (trait) => {
          if (u[trait]) return true
        })
      }),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterRefresher(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterResplendent(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterBrave(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterHasPrfWeapon(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterHasPrfSkill(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterMoveType(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterWeaponType(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) =>
        filterStats(filters.value, u, storeDataUnitsStats.statsById),
      ),
    )(units)

  const updateUnitsFiltered = () => {
    unitsFiltered.value = filterUnits(storeDataUnits.units)
  }
  const { isUpdating, update: updateUnits } = useDebounce(updateUnitsFiltered, [
    [regexp],
    [filters, { deep: true }],
    [() => storeDataUnits.units],
  ])

  function sort(units: IUnit[], sorters: ISorters) {
    return orderBy(
      units,
      sorters.fields.map((field) => {
        switch (field) {
          case SORT_MOVE:
            return (unit: IUnit) => SORTED_MOVE_TYPES_INDEXES[unit.move_type]
          case SORT_WEAP:
            return (unit: IUnit) =>
              SORTED_WEAPON_TYPES_INDEXES[unit.weapon_type]
          case SORT_AVAILABILITY:
            return (unit: IUnit) =>
              storeDataUnitsAvailabilities.availabiltySortingVector(unit)
          case SORT_IV_HP:
            return (unit: IUnit) =>
              storeDataUnitsStats.statsById[unit.id].level40_hp
          case SORT_IV_ATK:
            return (unit: IUnit) =>
              storeDataUnitsStats.statsById[unit.id].level40_atk
          case SORT_IV_SPD:
            return (unit: IUnit) =>
              storeDataUnitsStats.statsById[unit.id].level40_spd
          case SORT_IV_DEF:
            return (unit: IUnit) =>
              storeDataUnitsStats.statsById[unit.id].level40_def
          case SORT_IV_RES:
            return (unit: IUnit) =>
              storeDataUnitsStats.statsById[unit.id].level40_res
          case SORT_NOTHING:
            return () => 0
        }
        return field
      }),
      sorters.orders,
    )
  }

  const unitsFiltered = ref<IUnit[]>([])
  const unitsFilteredSorted = computed(() =>
    sort(unitsFiltered.value, sorters.value),
  )

  const unitsFilteredCount = computed(() => unitsFiltered.value.length)

  return {
    $reset,

    filters,
    sorters,

    isUpdating,
    searchIsActive,
    anyFilterActive,
    counter,
    errorMessages,

    updateSorter,
    updateUnits,

    unitsFilteredSorted,
    unitsFilteredCount,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreUnitsFilters, import.meta.hot))
}
