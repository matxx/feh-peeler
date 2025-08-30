import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import every from 'lodash-es/every'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

import * as a from '~/utils/types/units-availabilities'
import { STATS, type IUnitStatById } from '~/utils/types/units-stats'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  // NORMAL_DIVINE_CODES,
  // LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '~/utils/types/obfuscated-keys'

import { filterByName, RATING_0, type IUnit } from '~/utils/types/units'
import { createFilters, type IFilters } from '~/utils/types/units-filters'
import {
  SORT_NAME,
  SORT_VERSION,
  SORT_RATING,
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
import { objectEntries } from '~/utils/functions/typeSafe'
import { filterBoolean } from '~/utils/functions/filterBoolean'

function filterName(u: IUnit, r?: RegExp) {
  if (!r) return true

  return filterByName(u, r)
}

function filterMoveType(filters: IFilters, u: IUnit) {
  if (filters.moves.size === 0) return true

  return filters.moves.has(u.move_type)
}

function filterWeaponType(filters: IFilters, u: IUnit) {
  if (filters.weapons.size === 0) return true

  return filters.weapons.has(u.weapon_type)
}

const filterRefresher = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isRefresher, u.is_refresher)
const filterResplendent = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.hasResplendent, u.has_respl)
const filterBrave = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isBrave, u.is_brave)
const filterIsFallen = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isFallen, u.is_fallen)
const filterIsStory = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isStory, u.is_story)
const filterIsTT = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isTT, u.is_tt)
const filterIsGHB = (filters: IFilters, u: IUnit) =>
  filterBoolean(filters.isGHB, u.is_ghb)
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
    filters.availabilities.has(a.AV_HEROIC_GRAILS)
  ) {
    return true
  }
  // if (
  //   availability.is_in[LIMITED_DIVINE_CODES] &&
  //   filters.availabilities.has(a.AV_LIMITED_DIVINE_CODES)
  // ) {
  //   return true
  // }
  // if (
  //   availability.is_in[NORMAL_DIVINE_CODES] &&
  //   filters.availabilities.has(a.AV_NORMAL_DIVINE_CODES)
  // ) {
  //   return true
  // }
  if (
    availability.is_in[FOCUS_ONLY] &&
    filters.availabilities.has(a.AV_LIMITED_HEROES)
  ) {
    return true
  }

  if (availability.is_in[GENERIC_SUMMON_POOL]) {
    switch (availability.lowest_rarity[GENERIC_SUMMON_POOL]) {
      case 3:
      case 4:
        if (filters.availabilities.has(a.AV_GENERIC_POOL_3_4)) return true
        break
      case 4.5:
        if (filters.availabilities.has(a.AV_GENERIC_POOL_45)) return true
        break
      case 5:
        if (filters.availabilities.has(a.AV_GENERIC_POOL_5)) return true
    }
  }

  if (availability.is_in[SPECIAL_SUMMON_POOL]) {
    switch (availability.lowest_rarity[SPECIAL_SUMMON_POOL]) {
      case 4:
        if (filters.availabilities.has(a.AV_SPECIAL_POOL_4)) return true
        break
      case 4.5:
        if (filters.availabilities.has(a.AV_SPECIAL_POOL_45)) return true
        break
      case 5:
        if (filters.availabilities.has(a.AV_SPECIAL_POOL_5)) return true
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
  const storeDataUnitsRatingsGame8 = useStoreDataUnitsRatingsGame8()

  const filters = ref<IFilters>(
    createFilters(storeDataConstants.defaulUnitStatsMinMax),
  )
  const sorters = ref<ISorters>(createEmptySorters())

  function $reset() {
    filters.value = createFilters(storeDataConstants.defaulUnitStatsMinMax)
    sorters.value = createEmptySorters()
  }

  const anyFilterActiveExceptName = computed(
    () =>
      filters.value.traits.size > 0 ||
      filters.value.moves.size > 0 ||
      filters.value.weapons.size > 0 ||
      filters.value.availabilities.size > 0 ||
      filters.value.isRefresher !== null ||
      filters.value.hasResplendent !== null ||
      filters.value.isBrave !== null ||
      filters.value.isFallen !== null ||
      filters.value.isStory !== null ||
      filters.value.isTT !== null ||
      filters.value.isGHB !== null ||
      filters.value.hasPrfWeapon !== null ||
      filters.value.hasPrfSkill !== null ||
      some(
        objectEntries(filters.value.stats),
        ([stat, [min, max]]) =>
          min > storeDataConstants.defaulUnitStatsMinMax[stat][0] ||
          max < storeDataConstants.defaulUnitStatsMinMax[stat][1],
      ) ||
      false,
  )

  function updateSorter([index, sorter]: [number, ISorter]) {
    if (!sorters.value) return

    sorters.value.fields[index] = sorter.field
    sorters.value.orders[index] = sorter.order
  }

  const searchNameText = computed(() => filters.value.name)
  const searchNameTextLength = computed(() =>
    searchNameText.value ? searchNameText.value.length : 0,
  )
  const searchNameCounter = computed(() =>
    searchNameTextLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
  )
  const searchNameIsActive = computed(
    () => searchNameTextLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
  )
  const { regexp: searchNameRegexp, errorMessages: searchNameErrorMessages } =
    useSearch(searchNameText)

  const filterUnits = (units: IUnit[]) =>
    flow(
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) =>
        filterName(
          u,
          searchNameIsActive.value ? searchNameRegexp.value : undefined,
        ),
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
      f(filter, (u: IUnit) => {
        if (filters.value.elements.size === 0) return true

        return some(
          Array.from(filters.value.elements),
          (element) => u.element === element,
        )
      }),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterRefresher(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterResplendent(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterBrave(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterIsFallen(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterIsStory(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterIsTT(filters.value, u)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) => filterIsGHB(filters.value, u)),
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
    [searchNameRegexp],
    [filters, { deep: true }],
    [() => storeDataUnits.units],
  ])

  function sort(units: IUnit[], sorters: ISorters) {
    return orderBy(
      units,
      sorters.fields.map((field) => {
        switch (field) {
          case SORT_NAME:
            return (unit: IUnit) => unit.nameForSorting
          case SORT_VERSION:
            return (unit: IUnit) => unit.sortableVersion
          case SORT_RATING:
            return (unit: IUnit) =>
              storeDataUnitsRatingsGame8.byId[unit.id]?.game8_rating || RATING_0
          case SORT_MOVE:
            return (unit: IUnit) => SORTED_MOVE_TYPES_INDEXES[unit.move_type]
          case SORT_WEAP:
            return (unit: IUnit) =>
              SORTED_WEAPON_TYPES_INDEXES[unit.weapon_type]
          case SORT_AVAILABILITY:
            return (unit: IUnit) =>
              storeDataUnitsAvailabilities.availabilitySortingValue(unit)
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
    anyFilterActiveExceptName,

    searchNameIsActive,
    searchNameCounter,
    searchNameErrorMessages,

    updateSorter,
    updateUnits,

    unitsFilteredSorted,
    unitsFilteredCount,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreUnitsFilters, import.meta.hot))
}
