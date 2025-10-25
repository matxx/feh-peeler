import min from 'lodash-es/min'
import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import every from 'lodash-es/every'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

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
  HOF_DISABLED,
  HOF_13_20,
  HOF_21_24,
  HOF_25,
  VERSION_8_0,
  type IFilters,
} from '~/utils/types/skills-filters'
import {
  SORT_NAME,
  SORT_SLOT,
  SORT_RELEASE_DATE,
  SORT_VERSION,
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
import {
  filterByName,
  filterByDescription,
  RATING_0,
  SORTED_SLOT_INDEXES,
  SKILL_PASSIVE_ABC,
  type ISkill,
} from '~/utils/types/skills'
import { objectEntries } from '~/utils/functions/typeSafe'
import { filterBoolean } from '~/utils/functions/filterBoolean'
import { GRADE_F, SORTED_GRADE_INDEXES } from '~/utils/types/grades'
import * as w from '~/utils/types/weapons'

const filterIsPrf = (filters: IFilters, s: ISkill) =>
  filterBoolean(filters.isPrf, s.is_prf)
const filterIsMax = (filters: IFilters, s: ISkill) =>
  filterBoolean(filters.isMax, !s.upgrade_ids)
const filterIsArcane = (filters: IFilters, s: ISkill) =>
  filterBoolean(filters.isArcane, s.name.includes('Arcane'))

const filterHoF = (filters: IFilters, s: ISkill) => {
  switch (filters.hof) {
    case HOF_13_20:
      return (
        !s.is_prf &&
        (!SKILL_PASSIVE_ABC.includes(s.category) || s.sp >= 240) &&
        true
      )
    case HOF_21_24:
      return (
        !s.is_prf &&
        (!SKILL_PASSIVE_ABC.includes(s.category) || s.sp >= 300) && // special >= 200 sp ?
        true
      )
    case HOF_25:
      return (
        !s.is_prf &&
        (!SKILL_PASSIVE_ABC.includes(s.category) || s.sp >= 300) &&
        s.sortableVersion >= VERSION_8_0 &&
        true
      )
    case HOF_DISABLED:
    default:
      return true
  }
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

  function getNewFilters() {
    return createFilters(
      getDefaulSkillStatsMinMax(storeDataConstants.constants),
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

  const isFilterActiveOnCategories = computed(
    () => filters.value.categories.size > 0,
  )
  const isFilterActiveOnWeaponTypes = computed(
    () => filters.value.weaponTypes.size > 0,
  )
  const isFilterActiveOnCanUseMoves = computed(
    () => filters.value.canUse.moves.size > 0,
  )
  const isFilterActiveOnCanUseWeapons = computed(
    () => filters.value.canUse.weapons.size > 0,
  )
  const isFilterActiveOnAvailabilities = computed(
    () => filters.value.availabilities.size > 0,
  )
  const isFilterActiveOnPreInheritance = computed(
    () => filters.value.preInheritance.size > 0,
  )

  const isFilterActiveOnIsPrf = computed(() => filters.value.isPrf !== null)
  const isFilterActiveOnIsMax = computed(() => filters.value.isMax !== null)
  const isFilterActiveOnIsArcane = computed(
    () => filters.value.isArcane !== null,
  )

  const isFilterActiveOnStats = computed(() =>
    some(
      objectEntries(filters.value.stats),
      ([stat, [min, max]]) =>
        min > storeDataConstants.defaulSkillStatsMinMax[stat][0] ||
        max < storeDataConstants.defaulSkillStatsMinMax[stat][1],
    ),
  )

  const anyFilterActiveExceptName = computed(
    () =>
      searchDescriptionIsActive.value ||
      isFilterActiveOnCategories.value ||
      isFilterActiveOnWeaponTypes.value ||
      isFilterActiveOnCanUseMoves.value ||
      isFilterActiveOnCanUseWeapons.value ||
      isFilterActiveOnAvailabilities.value ||
      isFilterActiveOnPreInheritance.value ||
      isFilterActiveOnIsPrf.value ||
      isFilterActiveOnIsMax.value ||
      isFilterActiveOnIsArcane.value ||
      isFilterActiveOnStats.value ||
      false,
  )

  function filterName(s: ISkill, r?: RegExp) {
    if (!r) return true

    return filterByName(s, r)
  }

  function filterDescription(s: ISkill, r?: RegExp) {
    if (!r) return true

    const desc = storeDataSkillsDescriptions.byId[s.id]
    if (!desc) return true

    return filterByDescription(desc, r)
  }

  function filterCategoryAndWeaponType(filters: IFilters, s: ISkill) {
    if (
      !isFilterActiveOnCategories.value &&
      !isFilterActiveOnWeaponTypes.value
    ) {
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
    if (!isFilterActiveOnCanUseMoves.value) return true

    if (s.is_prf) return false
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

  function filterCanUseWeaponType(filters: IFilters, s: ISkill) {
    if (!isFilterActiveOnCanUseWeapons.value) return true

    if (s.is_prf) return false
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

  function filterStats(filters: IFilters, s: ISkill) {
    if (!isFilterActiveOnStats.value) return true

    return every(STATS, (stat) => {
      if (s[stat] === undefined) {
        return (
          filters.stats[stat][0] ===
            storeDataConstants.defaulSkillStatsMinMax[stat][0] &&
          filters.stats[stat][1] ===
            storeDataConstants.defaulSkillStatsMinMax[stat][1]
        )
      }
      if (s[stat] < filters.stats[stat][0]) return false
      if (s[stat] > filters.stats[stat][1]) return false

      return true
    })
  }

  function isAvailable(availabilities: Set<a.Availability>, s: ISkill) {
    const availability = storeDataSkillsAvailabilities.availabilitiesById[s.id]
    if (!availability) return false

    if (
      availability.is_in[HEROIC_GRAILS] &&
      availabilities.has(a.AV_HEROIC_GRAILS)
    ) {
      return true
    }
    // if (
    //   availability.is_in[LIMITED_DIVINE_CODES] &&
    //   availabilities.has(a.AV_LIMITED_DIVINE_CODES)
    // ) {
    //   return true
    // }
    // if (
    //   availability.is_in[NORMAL_DIVINE_CODES] &&
    //   availabilities.has(a.AV_NORMAL_DIVINE_CODES)
    // ) {
    //   return true
    // }
    if (
      availability.is_in[FOCUS_ONLY] &&
      availabilities.has(a.AV_LIMITED_HEROES)
    ) {
      return true
    }

    if (availability.is_in[GENERIC_SUMMON_POOL]) {
      switch (
        availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][GENERIC_SUMMON_POOL]
      ) {
        case 3:
        case 4:
          if (availabilities.has(a.AV_GENERIC_POOL_3_4)) return true
          break
        case 4.5:
          if (availabilities.has(a.AV_GENERIC_POOL_45)) return true
          break
        case 5:
          if (availabilities.has(a.AV_GENERIC_POOL_5)) return true
      }
    }

    if (availability.is_in[SPECIAL_SUMMON_POOL]) {
      switch (
        availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][SPECIAL_SUMMON_POOL]
      ) {
        case 4:
          if (availabilities.has(a.AV_SPECIAL_POOL_4)) return true
          break
        case 4.5:
          if (availabilities.has(a.AV_SPECIAL_POOL_45)) return true
          break
        case 5:
          if (availabilities.has(a.AV_SPECIAL_POOL_5)) return true
      }
    }

    return false
  }

  function filterAvailability(filters: IFilters, s: ISkill) {
    if (!isFilterActiveOnAvailabilities.value) return true

    return isAvailable(filters.availabilities, s)
  }

  function filterPreInheritance(filters: IFilters, s: ISkill) {
    if (!isFilterActiveOnPreInheritance.value) return true

    if (!s.downgrade_ids) return false

    return some(s.downgrade_ids, (id) =>
      isAvailable(filters.preInheritance, storeDataSkills.skillsById[id]),
    )
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

  const filterSkills = (skills: ISkill[]) =>
    flow(
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) =>
        filterName(
          s,
          searchNameIsActive.value ? searchNameRegexp.value : undefined,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) =>
        filterDescription(
          s,
          searchDescriptionIsActive.value
            ? searchDescriptionRegexp.value
            : undefined,
        ),
      ),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterHoF(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterAvailability(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterIsPrf(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterIsMax(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterIsArcane(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCategoryAndWeaponType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCanUseMoveType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterCanUseWeaponType(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterStats(filters.value, s)),
      // @ts-expect-error unsafe typings
      f(filter, (s: ISkill) => filterPreInheritance(filters.value, s)),
    )(skills)

  const updateSkillsFiltered = () => {
    skillsFiltered.value = filterSkills(storeDataSkills.skills)
  }
  const { isUpdating, update: updateSkills } = useDebounce(
    updateSkillsFiltered,
    [
      [searchNameRegexp],
      [searchDescriptionRegexp],
      [filters, { deep: true }],
      [() => storeDataSkills.skills],
    ],
  )

  function sort(skills: ISkill[], sorters: ISorters) {
    return orderBy(
      skills,
      sorters.fields.map((field) => {
        switch (field) {
          case SORT_NAME:
            return (skill: ISkill) => skill.nameForSorting
          case SORT_SLOT:
            return (skill: ISkill) => SORTED_SLOT_INDEXES[skill.category]
          case SORT_RELEASE_DATE:
            return (skill: ISkill) =>
              storeDataSkills.skillsById[skill.baseId].release_date
          case SORT_VERSION:
            return (skill: ISkill) =>
              storeDataSkills.skillsById[skill.baseId].sortableVersion
          case SORT_MAX:
            return (skill: ISkill) => (!skill.upgrade_ids ? 1 : 0)
          case SORT_RATING:
            return (skill: ISkill) =>
              storeDataSkillsRatingsGame8.byId[skill.id]?.game8_rating ||
              RATING_0
          case SORT_GRADE:
            return (skill: ISkill) => {
              const grade =
                storeDataSkillsRatingsGame8.byId[skill.id]?.game8_grade ||
                GRADE_F
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
