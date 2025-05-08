import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'

import { groupBy, nestedGroupBy } from '~/utils/functions/typeSafe'
import type {
  IUnitData,
  IUnit,
  UnitsByWeaponColor,
  UnitsByAvailability,
  UnitsByWeaponColorByAvailability,
  IUnitWithAvailability,
} from '~/utils/types/units'
import {
  WEAPON_FAMILY_FOR_TYPE,
  WEAPON_COLOR_FOR_TYPE,
  getSortableType,
  getSortableWeaponColor,
  getSortableWeaponType,
} from '~/utils/types/weapons'
import { getAvailability } from '~/utils/types/units-availabilities'
import { getSortableMoveType } from '~/utils/types/moves'

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
          nameForFilters: storeDataAccents.transliterate(unit.full_name),
          nameForSorting: unit.full_name,
          nameForDisplay:
            unit.game8_name && unit.game8_name !== unit.title
              ? `${unit.full_name} (${unit.game8_name})`
              : unit.full_name,
          sortableType: getSortableType(unit),
          sortableWeaponColor: getSortableWeaponColor(
            WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          ),
          sortableWeaponType: getSortableWeaponType(unit),
          sortableMoveType: getSortableMoveType(unit),
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

  const unitsById = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'id'),
  )
  // to put name in URL
  // const unitsByNameForLink = computed<{ [index: string]: IUnit }>(() =>
  //   keyBy(units.value, 'nameForLink'),
  // )

  const unitsByAvailability = computed<UnitsByAvailability>(() =>
    groupBy(unitsWithAvailability.value, 'availability'),
  )
  const unitsByWeaponColor = computed<UnitsByWeaponColor>(() =>
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

  return {
    isLoading,
    isLoaded,
    load,

    unitsData,
    units,
    unitsCount,
    unitsWithAvailability,

    unitsById,
    // unitsByNameForLink,

    unitsByAvailability,
    unitsByWeaponColor,
    unitsByWeaponColorByAvailability,

    sortedUnits,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataUnits, import.meta.hot))
}
