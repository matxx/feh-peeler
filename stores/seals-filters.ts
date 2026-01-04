import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import every from 'lodash-es/every'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'
import { objectEntries } from '~/utils/functions/typeSafe'
import { filterBoolean } from '~/utils/functions/filterBoolean'

import {
  isSkillAvailableToUnitMoveType,
  isSkillAvailableToUnitWeaponType,
} from '~/stores/skills-filters'

import {
  createFilters,
  getDefaultSealStatsMinMax,
  STATS,
  type IFilters,
} from '~/utils/types/seals-filters'
import {
  SORT_NAME,
  SORT_MAX,
  // SORT_RATING,
  SORT_GRADE,
  // SORT_RESTRICTIONS,
  SORT_DESCRIPTION,
  SORT_NOTHING,
  createEmptySorters,
  type ISorter,
  type ISorters,
} from '~/utils/types/seals-sorters'
import {
  filterByName,
  filterByDescription,
  // RATING_0,
  type SealId,
  type ISeal,
} from '~/utils/types/seals'
import type { IUnitData } from '~/utils/types/units'
import { GRADE_F, SORTED_GRADE_INDEXES } from '~/utils/types/grades'
import * as w from '~/utils/types/weapons'

const filterIsMax = (filters: IFilters, s: ISeal) =>
  filterBoolean(filters.isMax, !s.upgrade_ids)

// https://stackoverflow.com/a/78061467/5032734
const f =
  <V, I, R>(func: (v: V, i: I) => R, i: I) =>
  (v: V) =>
    func(v, i)

export const useStoreSealsFilters = defineStore('seals-filters', () => {
  const storeDataConstants = useStoreDataConstants()
  const storeDataSeals = useStoreDataSeals()
  const storeDataSealsRatingsGame8 = useStoreDataSealsRatingsGame8()
  const storeDataSealsDescriptions = useStoreDataSealsDescriptions()

  function getNewFilters() {
    return createFilters(
      getDefaultSealStatsMinMax(storeDataConstants.constants),
    )
  }
  function resetFilters() {
    filters.value = getNewFilters()
  }

  const filters = ref<IFilters>(getNewFilters())
  const sorters = ref<ISorters>(createEmptySorters())

  function $reset() {
    filters.value = getNewFilters()
    sorters.value = createEmptySorters()
  }

  const isFilterActiveOnCanUseMoves = computed(
    () => filters.value.canUse.moves.size > 0,
  )
  const isFilterActiveOnCanUseWeapons = computed(
    () => filters.value.canUse.weapons.size > 0,
  )

  const isFilterActiveOnIsMax = computed(() => filters.value.isMax !== null)

  const isFilterActiveOnStats = computed(() =>
    some(
      objectEntries(filters.value.stats),
      ([stat, [min, max]]) =>
        min > storeDataConstants.defaultSealStatsMinMax[stat][0] ||
        max < storeDataConstants.defaultSealStatsMinMax[stat][1],
    ),
  )

  const anyFilterActiveExceptName = computed(
    () =>
      searchDescriptionIsActive.value ||
      isFilterActiveOnCanUseMoves.value ||
      isFilterActiveOnCanUseWeapons.value ||
      isFilterActiveOnIsMax.value ||
      isFilterActiveOnStats.value ||
      false,
  )

  function filterName(s: ISeal, r?: RegExp) {
    if (!r) return true

    return filterByName(s, r)
  }

  function filterDescription(s: ISeal, r?: RegExp) {
    if (!r) return true

    const desc = storeDataSealsDescriptions.byId[s.id]
    if (!desc) return true

    return filterByDescription(desc, r)
  }

  function filterCanUseMoveType(filters: IFilters, s: ISeal) {
    if (!isFilterActiveOnCanUseMoves.value) return true

    if (s.restrictions.moves.none) return true

    if (s.restrictions.moves.can_use) {
      return !new Set(s.restrictions.moves.can_use).isDisjointFrom(
        filters.canUse.moves,
      )
    }
    if (s.restrictions.moves.can_not_use) {
      return new Set(s.restrictions.moves.can_not_use).isDisjointFrom(
        filters.canUse.moves,
      )
    }

    return false
  }

  function filterCanUseWeaponType(filters: IFilters, s: ISeal) {
    if (!isFilterActiveOnCanUseWeapons.value) return true

    if (s.restrictions.weapons.none) return true

    if (s.restrictions.weapons.can_use) {
      const canUse = new Set(s.restrictions.weapons.can_use)
      if (filters.canUse.weapons.has(w.WEAPON_R_SW)) {
        return canUse.has(w.WEAPON_R_SW) || canUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_B_LA)) {
        return canUse.has(w.WEAPON_B_LA) || canUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_G_AX)) {
        return canUse.has(w.WEAPON_G_AX) || canUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_C_ST)) {
        return canUse.has(w.WEAPON_C_ST)
      }
      if (filters.canUse.weapons.has(w.WEAPON_R_TO)) {
        return canUse.has(w.WEAPON_R_TO) || canUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_B_TO)) {
        return canUse.has(w.WEAPON_B_TO) || canUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_G_TO)) {
        return canUse.has(w.WEAPON_G_TO) || canUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_C_TO)) {
        return canUse.has(w.WEAPON_C_TO) || canUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BO)) {
        return canUse.has(w.WEAPON_A_BO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_DA)) {
        return canUse.has(w.WEAPON_A_DA)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BR)) {
        return canUse.has(w.WEAPON_A_BR)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BE)) {
        return canUse.has(w.WEAPON_A_BE)
      }
    }

    if (s.restrictions.weapons.can_not_use) {
      const canNotUse = new Set(s.restrictions.weapons.can_not_use)
      if (filters.canUse.weapons.has(w.WEAPON_R_SW)) {
        return !canNotUse.has(w.WEAPON_R_SW) && !canNotUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_B_LA)) {
        return !canNotUse.has(w.WEAPON_B_LA) && !canNotUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_G_AX)) {
        return !canNotUse.has(w.WEAPON_G_AX) && !canNotUse.has(w.WEAPON_A_ME)
      }
      if (filters.canUse.weapons.has(w.WEAPON_C_ST)) {
        return !canNotUse.has(w.WEAPON_C_ST)
      }
      if (filters.canUse.weapons.has(w.WEAPON_R_TO)) {
        return !canNotUse.has(w.WEAPON_R_TO) && !canNotUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_B_TO)) {
        return !canNotUse.has(w.WEAPON_B_TO) && !canNotUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_G_TO)) {
        return !canNotUse.has(w.WEAPON_G_TO) && !canNotUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_C_TO)) {
        return !canNotUse.has(w.WEAPON_C_TO) && !canNotUse.has(w.WEAPON_A_TO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BO)) {
        return !canNotUse.has(w.WEAPON_A_BO)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_DA)) {
        return !canNotUse.has(w.WEAPON_A_DA)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BR)) {
        return !canNotUse.has(w.WEAPON_A_BR)
      }
      if (filters.canUse.weapons.has(w.WEAPON_A_BE)) {
        return !canNotUse.has(w.WEAPON_A_BE)
      }
    }

    return false
  }

  function filterStats(filters: IFilters, s: ISeal) {
    if (!isFilterActiveOnStats.value) return true

    return every(STATS, (stat) => {
      if (s[stat] === undefined) {
        return (
          filters.stats[stat][0] ===
            storeDataConstants.defaultSealStatsMinMax[stat][0] &&
          filters.stats[stat][1] ===
            storeDataConstants.defaultSealStatsMinMax[stat][1]
        )
      }
      if (s[stat] < filters.stats[stat][0]) return false
      if (s[stat] > filters.stats[stat][1]) return false

      return true
    })
  }

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

  const searchDescriptionText = computed(() => filters.value.description)
  const searchDescriptionTextLength = computed(() =>
    searchDescriptionText.value ? searchDescriptionText.value.length : 0,
  )
  const searchDescriptionCounter = computed(() =>
    searchDescriptionTextLength.value <= MINIMAL_TEXT_SEARCH_LENGTH
      ? 3
      : undefined,
  )
  const searchDescriptionIsActive = computed(
    () => searchDescriptionTextLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
  )
  const {
    regexp: searchDescriptionRegexp,
    errorMessages: searchDescriptionErrorMessages,
  } = useSearch(searchDescriptionText)

  const filterSeals = (seals: ISeal[]) =>
    flow(
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) =>
        filterName(
          s,
          searchNameIsActive.value ? searchNameRegexp.value : undefined,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) =>
        filterDescription(
          s,
          searchDescriptionIsActive.value
            ? searchDescriptionRegexp.value
            : undefined,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) => filterIsMax(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) => filterCanUseMoveType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) => filterCanUseWeaponType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISeal) => filterStats(filters.value, s)),
    )(seals)

  const updateSealsFiltered = () => {
    sealsFiltered.value = filterSeals(storeDataSeals.seals)
  }
  const { isUpdating, update: updateSeals } = useDebounce(updateSealsFiltered, [
    [searchNameRegexp],
    [searchDescriptionRegexp],
    [filters, { deep: true }],
    [() => storeDataSeals.seals],
  ])

  function sort(seals: ISeal[], sorters: ISorters) {
    return orderBy(
      seals,
      sorters.fields.map((field) => {
        switch (field) {
          case SORT_NAME:
            return (seal: ISeal) => seal.nameForSorting
          case SORT_MAX:
            return (seal: ISeal) => (!seal.upgrade_ids ? 1 : 0)
          // case SORT_RATING:
          //   return (seal: ISeal) =>
          //     storeDataSealsRatingsGame8.byId[seal.id]?.game8_rating || RATING_0
          case SORT_GRADE:
            return (seal: ISeal) => {
              const grade =
                storeDataSealsRatingsGame8.byId[seal.id]?.game8_grade || GRADE_F
              return grade && SORTED_GRADE_INDEXES[grade]
            }
          // case SORT_RESTRICTIONS: // TODO
          case SORT_DESCRIPTION:
            return (seal: ISeal) =>
              storeDataSealsDescriptions.byId[seal.id]?.description
          case SORT_NOTHING:
            return () => 0
        }
        return field
      }),
      sorters.orders,
    )
  }

  const sealsFiltered = ref<ISeal[]>([])
  const sealsFilteredSorted = computed(() =>
    sort(sealsFiltered.value, sorters.value),
  )

  const sealsFilteredCount = computed(() => sealsFiltered.value.length)

  function isSealAvailableToUnit(seal: ISeal, unit: IUnitData) {
    if (!isSkillAvailableToUnitMoveType(seal.restrictions.moves, unit)) {
      return false
    }
    if (!isSkillAvailableToUnitWeaponType(seal.restrictions.weapons, unit)) {
      return false
    }

    return true
  }

  const isSealIdAvailableToUnit = (sealId: SealId, unit: IUnitData) =>
    isSealAvailableToUnit(storeDataSeals.sealsById[sealId], unit)

  return {
    $reset,

    filters,
    sorters,

    resetFilters,

    isUpdating,
    anyFilterActiveExceptName,

    searchNameIsActive,
    searchNameCounter,
    searchNameErrorMessages,

    searchDescriptionIsActive,
    searchDescriptionCounter,
    searchDescriptionErrorMessages,

    updateSorter,
    updateSeals,

    sealsFilteredSorted,
    sealsFilteredCount,

    isSealAvailableToUnit,
    isSealIdAvailableToUnit,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreSealsFilters, import.meta.hot))
}
