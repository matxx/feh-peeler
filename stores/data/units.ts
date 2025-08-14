import some from 'lodash-es/some'
import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'
import _groupBy from 'lodash-es/groupBy'
import { DateTime } from 'luxon'

import {
  groupBy,
  nestedGroupBy,
  objectEntries,
  type GroupedBy,
} from '~/utils/functions/typeSafe'
import type {
  IUnitData,
  IUnit,
  UnitsBy,
  UnitsByWeaponColorByAvailability,
  IUnitWithAvailability,
  IUnitWithReleaseDate,
} from '~/utils/types/units'
import {
  WEAPON_FAMILY_FOR_TYPE,
  WEAPON_COLOR_FOR_TYPE,
  getSortableType,
  getSortableWeaponColor,
  getSortableWeaponType,
  type WeaponColor,
} from '~/utils/types/weapons'
import type { Availability } from '~/utils/types/units-availabilities'
import { getAvailability } from '~/utils/types/units-availabilities'
import { getSortableMoveType } from '~/utils/types/moves'
import { SKILL_WEAPON, type SkillId } from '~/utils/types/skills'

export const useStoreDataUnits = defineStore('data/units', () => {
  const unitsData = ref<IUnitData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'units.json',
    'stores/data/units/load',
    unitsData,
  )

  const storeDataAccents = useStoreDataAccents()
  const storeDataSkills = useStoreDataSkills()
  const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

  function hasPrfWeapon(unit: IUnitData) {
    if (!storeDataSkills.isLoaded) return false
    if (!storeDataUnitsAvailabilities.isLoaded) return false

    return some(
      storeDataUnitsAvailabilities.availabilitiesById[unit.id].skill_ids,
      (skillId: SkillId) => {
        const skill = storeDataSkills.skillsById[skillId]
        return skill.is_prf && skill.category === SKILL_WEAPON
      },
    )
  }
  function hasPrfSkill(unit: IUnitData) {
    if (!storeDataSkills.isLoaded) return false
    if (!storeDataUnitsAvailabilities.isLoaded) return false

    return some(
      storeDataUnitsAvailabilities.availabilitiesById[unit.id].skill_ids,
      (skillId: SkillId) => {
        const skill = storeDataSkills.skillsById[skillId]
        return skill.is_prf && skill.category !== SKILL_WEAPON
      },
    )
  }

  const unitsCount = computed(() => unitsData.value.length)
  const units = computed<IUnit[]>(() =>
    storeDataAccents.isLoaded
      ? unitsData.value.map((unit) => ({
          ...unit,
          weaponFamily: WEAPON_FAMILY_FOR_TYPE[unit.weapon_type],
          weaponColor: WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          nameForLink: escapeName(unit.full_name),
          nameForFilters: storeDataAccents.transliterate(unit.full_name),
          nameForSorting: unit.full_name,
          nameForDisplay: `${unit.full_name} [${unit.abbreviated_name}]`,
          sortableType: getSortableType(unit),
          sortableWeaponColor: getSortableWeaponColor(
            WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          ),
          sortableWeaponType: getSortableWeaponType(unit),
          sortableMoveType: getSortableMoveType(unit),
          hasPrfWeapon: hasPrfWeapon(unit),
          hasPrfSkill: hasPrfSkill(unit),
        }))
      : [],
  )
  const unitsWithAvailability = computed<IUnitWithAvailability[]>(() =>
    units.value.map((unit) => ({
      ...unit,
      availability: getAvailability(
        storeDataUnitsAvailabilities.availabilitiesById[unit.id],
      ),
    })),
  )
  const unitsWithReleaseDate = computed<IUnitWithReleaseDate[]>(() =>
    units.value.map((unit) => {
      const releaseDate = DateTime.fromISO(unit.release_date)
      return {
        ...unit,
        releaseDate,
        releaseYearMonth: releaseDate.toFormat('yyyy-LL'),
      }
    }),
  )

  const unitsById = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'id'),
  )
  // to put name in URL
  // const unitsByNameForLink = computed<{ [index: string]: IUnit }>(() =>
  //   keyBy(units.value, 'nameForLink'),
  // )

  const unitsByAvailability = computed<UnitsBy<Availability>>(() =>
    groupBy(unitsWithAvailability.value, 'availability'),
  )
  const unitsByWeaponColor = computed<UnitsBy<WeaponColor>>(() =>
    groupBy(units.value, 'weaponColor'),
  )
  const unitsByWeaponColorByAvailability =
    // @ts-expect-error unsafe typing :/
    computed<UnitsByWeaponColorByAvailability>(() =>
      nestedGroupBy(unitsWithAvailability.value, [
        'availability',
        'weaponColor',
      ]),
    )

  const sortedUnits = computed<IUnit[]>(() =>
    sortBy(units.value, 'nameForSorting'),
  )

  const unitsByReleaseYearMonth = computed<
    GroupedBy<IUnitWithReleaseDate, string>
  >(() => _groupBy(unitsWithReleaseDate.value, (unit) => unit.releaseYearMonth))
  const unitsUntilYearMonth = computed<GroupedBy<IUnitWithReleaseDate, string>>(
    () => {
      const list = sortBy(
        objectEntries(unitsByReleaseYearMonth.value),
        ([month, _]) => month,
      )
      const res: GroupedBy<IUnitWithReleaseDate, string> = {}
      const unitsUntilNow: IUnitWithReleaseDate[] = []
      list.forEach(([month, units]) => {
        unitsUntilNow.push(...units)
        res[month] = [...unitsUntilNow]
      })
      return res
    },
  )

  return {
    isLoading,
    isLoaded,
    load,

    unitsData,
    units,
    unitsCount,
    unitsWithAvailability,
    unitsWithReleaseDate,

    unitsById,
    // unitsByNameForLink,

    unitsByAvailability,
    unitsByWeaponColor,
    unitsByWeaponColorByAvailability,
    unitsByReleaseYearMonth,
    unitsUntilYearMonth,

    sortedUnits,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataUnits, import.meta.hot))
}
