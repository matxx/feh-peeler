import min from 'lodash-es/min'
import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import every from 'lodash-es/every'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

import type { ISkillAvailabilityById } from '~/utils/types/skills-availabilities'
import * as a from '~/utils/types/units-availabilities'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  // NORMAL_DIVINE_CODES,
  // LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
  FODDER_LOWEST_RARITY_WHEN_OBTAINED,
} from '~/utils/types/obfuscated-keys'

import {
  createFilters,
  getDefaulSkillStatsMinMax,
  STATS,
  type IFilters,
  type ISkillStatMinMax,
} from '~/utils/types/skills-filters'
import {
  SORT_SLOT,
  SORT_MAX,
  SORT_RATING,
  SORT_GRADE,
  // SORT_RESTRICTIONS,
  SORT_DESCRIPTION,
  SORT_AVAILABILITY,
  SORT_PRE_INHERITANCE,
  SORT_NOTHING,
  createEmptySorters,
  type ISorter,
  type ISorters,
} from '~/utils/types/skills-sorters'
import { SORTED_SLOT_INDEXES, type ISkill } from '~/utils/types/skills'
import { objectEntries } from '~/utils/functions/typeSafe'
import { filterBoolean } from '~/utils/functions/filterBoolean'
import { SORTED_GRADE_INDEXES } from '~/utils/types/grades'

function filterName(s: ISkill, r?: RegExp) {
  if (!r) return true

  return s.nameForFilters.match(r)
}

function filterCategoryAndWeaponType(filters: IFilters, s: ISkill) {
  if (filters.categories.size === 0 && filters.weaponTypes.size == 0) {
    return true
  }
  if (filters.categories.has(s.category)) {
    return true
  }
  if (s.weapon_type && filters.weaponTypes.has(s.weapon_type)) {
    return true
  }

  return false
}

function filterCanUseMoveType(filters: IFilters, s: ISkill) {
  //   if (filters.canUse.moves.size === 0) return true
  //   if (s.restrictions.moves.none) return false
  //   SORTED_WEAPON_TYPES
  //   if (s.restrictions.moves.can_use) {
  //     return filters.canUse.moves.has(s.restrictions.moves.can_use)
  //   } else {
  //     return filters.canUse.moves.has(!s.restrictions.moves.can_not_use)
  //   }
  return true
}

function filterCanUseWeaponType(filters: IFilters, s: ISkill) {
  //   if (filters.canUse.weapons.size === 0) return true
  //   return filters.canUse.weapons.has(s.weapon_type)
  return true
}

const filterIsPrf = (filters: IFilters, s: ISkill) =>
  filterBoolean(filters.isPrf, s.is_prf)
const filterIsMax = (filters: IFilters, s: ISkill) =>
  filterBoolean(filters.isMax, !s.upgrade_ids)

function filterAvailability(
  filters: IFilters,
  s: ISkill,
  availabilitiesById: ISkillAvailabilityById,
) {
  if (filters.availabilities.size === 0) return true

  const availability = availabilitiesById[s.id]
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
    switch (
      availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][GENERIC_SUMMON_POOL]
    ) {
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
    switch (
      availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][SPECIAL_SUMMON_POOL]
    ) {
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

function filterStats(
  filters: IFilters,
  s: ISkill,
  defaulSkillStatsMinMax: ISkillStatMinMax,
) {
  return every(STATS, (stat) => {
    if (s[stat] === undefined) {
      return (
        filters.stats[stat][0] === defaulSkillStatsMinMax[stat][0] &&
        filters.stats[stat][1] === defaulSkillStatsMinMax[stat][1]
      )
    }
    if (s[stat] < filters.stats[stat][0]) return false
    if (s[stat] > filters.stats[stat][1]) return false

    return true
  })
}

// https://stackoverflow.com/a/78061467/5032734
const f =
  <V, I, R>(func: (v: V, i: I) => R, i: I) =>
  (v: V) =>
    func(v, i)

export const useStoreSkillsFilters = defineStore('skills-filters', () => {
  const storeDataConstants = useStoreDataConstants()
  const storeDataSkills = useStoreDataSkills()
  const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()
  const storeDataSkillsRatingsGame8 = useStoreDataSkillsRatingsGame8()
  const storeDataSkillsDescriptions = useStoreDataSkillsDescriptions()

  const filters = ref<IFilters>(
    createFilters(getDefaulSkillStatsMinMax(storeDataConstants.constants)),
  )
  const sorters = ref<ISorters>(createEmptySorters())

  function $reset() {
    filters.value = createFilters(
      getDefaulSkillStatsMinMax(storeDataConstants.constants),
    )
    sorters.value = createEmptySorters()
  }
  const anyFilterActiveExceptName = computed(
    () =>
      filters.value.categories.size > 0 ||
      filters.value.weaponTypes.size > 0 ||
      filters.value.canUse.moves.size > 0 ||
      filters.value.canUse.weapons.size > 0 ||
      filters.value.availabilities.size > 0 ||
      filters.value.isPrf !== null ||
      filters.value.isMax !== null ||
      some(
        objectEntries(filters.value.stats),
        ([stat, [min, max]]) =>
          min > storeDataConstants.defaulSkillStatsMinMax[stat][0] ||
          max < storeDataConstants.defaulSkillStatsMinMax[stat][1],
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

  const filterSkills = (skills: ISkill[]) =>
    flow(
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) =>
        filterName(s, searchIsActive.value ? regexp.value : undefined),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) =>
        filterAvailability(
          filters.value,
          s,
          storeDataSkillsAvailabilities.availabilitiesById,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterIsPrf(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterIsMax(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCategoryAndWeaponType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCanUseMoveType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCanUseWeaponType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (u: IUnit) =>
        filterStats(
          filters.value,
          u,
          storeDataConstants.defaulSkillStatsMinMax,
        ),
      ),
    )(skills)

  const updateSkillsFiltered = () => {
    skillsFiltered.value = filterSkills(storeDataSkills.skills)
  }
  const { isUpdating, update: updateSkills } = useDebounce(
    updateSkillsFiltered,
    [[regexp], [filters, { deep: true }], [() => storeDataSkills.skills]],
  )

  function sort(skills: ISkill[], sorters: ISorters) {
    return orderBy(
      skills,
      sorters.fields.map((field) => {
        switch (field) {
          case SORT_SLOT:
            return (skill: ISkill) => SORTED_SLOT_INDEXES[skill.category]
          case SORT_MAX:
            return (skill: ISkill) => (!skill.upgrade_ids ? 1 : 0)
          case SORT_RATING:
            return (skill: ISkill) =>
              storeDataSkillsRatingsGame8.byId[skill.id]?.game8_rating
          case SORT_GRADE:
            return (skill: ISkill) => {
              const grade =
                storeDataSkillsRatingsGame8.byId[skill.id]?.game8_grade
              return grade && SORTED_GRADE_INDEXES[grade]
            }
          // case SORT_RESTRICTIONS: // TODO
          case SORT_DESCRIPTION:
            return (skill: ISkill) =>
              storeDataSkillsDescriptions.byId[skill.id]?.description
          case SORT_AVAILABILITY:
            return (skill: ISkill) =>
              storeDataSkillsAvailabilities.availabilitySortingValue(skill)
          case SORT_PRE_INHERITANCE:
            return (skill: ISkill) =>
              skill.downgrade_ids &&
              min(
                skill.downgrade_ids.map((s) =>
                  storeDataSkillsAvailabilities.availabilitySortingValue(
                    storeDataSkills.skillsById[s],
                  ),
                ),
              )
          case SORT_NOTHING:
            return () => 0
        }
        return field
      }),
      sorters.orders,
    )
  }

  const skillsFiltered = ref<ISkill[]>([])
  const skillsFilteredSorted = computed(() =>
    sort(skillsFiltered.value, sorters.value),
  )

  const skillsFilteredCount = computed(() => skillsFiltered.value.length)

  return {
    $reset,

    filters,
    sorters,

    isUpdating,
    searchIsActive,
    anyFilterActiveExceptName,
    counter,
    errorMessages,

    updateSorter,
    updateSkills,

    skillsFilteredSorted,
    skillsFilteredCount,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreSkillsFilters, import.meta.hot),
  )
}
