import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'
import _groupBy from 'lodash-es/groupBy'
import { DateTime } from 'luxon'

import {
  groupBy,
  nestedGroupBy,
  objectEntries,
  type GroupedBy,
  type GroupedByBy,
  type IndexedBy,
} from '~/utils/functions/typeSafe'
import type {
  UnitId,
  IUnitData,
  IUnit,
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
import getSortableVersion from '~/utils/functions/getSortableVersion'

export const useStoreDataUnits = defineStore('data/units', () => {
  const unitsData = ref<IUnitData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'units.json',
    'stores/data/units/load',
    unitsData,
  )

  const storeDataAccents = useStoreDataAccents()
  const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

  const unitsCount = computed(() => unitsData.value.length)
  const units = computed<IUnit[]>(() =>
    storeDataAccents.isLoaded
      ? unitsData.value.map((unit) => ({
          ...unit,
          weaponFamily: WEAPON_FAMILY_FOR_TYPE[unit.weapon_type],
          weaponColor: WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          nameForLink: escapeName(unit.full_name),
          nameForSelect: `${unit.abbreviated_name} (${unit.title})`,
          nameForSorting: unit.full_name,
          nameForFiltering: storeDataAccents.transliterate(unit.full_name),
          nameForDisplay: `${unit.abbreviated_name} (${unit.full_name})`,
          sortableType: getSortableType(unit),
          sortableWeaponColor: getSortableWeaponColor(
            WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          ),
          sortableWeaponType: getSortableWeaponType(unit),
          sortableMoveType: getSortableMoveType(unit),
          sortableVersion: getSortableVersion(unit.version),
        }))
      : [],
  )
  const unitsWithAvailability = computed<IUnitWithAvailability[]>(() =>
    storeDataUnitsAvailabilities.isLoaded
      ? units.value.map((unit) => ({
          ...unit,
          availability: getAvailability(
            storeDataUnitsAvailabilities.availabilitiesById[unit.id],
          ),
        }))
      : [],
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

  const unitsById = computed<IndexedBy<UnitId, IUnit>>(() =>
    keyBy(units.value, 'id'),
  )
  // to put name in URL
  // const unitsByNameForLink = computed<IndexedBy<string, IUnit>>(() =>
  //   keyBy(units.value, 'nameForLink'),
  // )

  const unitsByAvailability = computed<GroupedBy<Availability, IUnit>>(() =>
    groupBy(unitsWithAvailability.value, 'availability'),
  )
  const unitsByWeaponColor = computed<GroupedBy<WeaponColor, IUnit>>(() =>
    groupBy(units.value, 'weaponColor'),
  )
  // @ts-expect-error unsafe typing :/
  const unitsByWeaponColorByAvailability = computed<
    GroupedByBy<Availability, WeaponColor, IUnit>
  >(() =>
    nestedGroupBy(unitsWithAvailability.value, ['availability', 'weaponColor']),
  )

  const sortedUnits = computed<IUnit[]>(() =>
    sortBy(units.value, 'nameForSorting'),
  )
  const sortedUnitIds = computed<UnitId[]>(() =>
    sortedUnits.value.map((unit) => unit.id),
  )

  const unitsByReleaseYearMonth = computed<
    GroupedBy<string, IUnitWithReleaseDate>
  >(() => _groupBy(unitsWithReleaseDate.value, (unit) => unit.releaseYearMonth))
  const unitsUntilYearMonth = computed<GroupedBy<string, IUnitWithReleaseDate>>(
    () => {
      const list = sortBy(
        objectEntries(unitsByReleaseYearMonth.value),
        ([month, _]) => month,
      )
      const res: GroupedBy<string, IUnitWithReleaseDate> = {}
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
    sortedUnitIds,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataUnits, import.meta.hot))
}
