import keyBy from 'lodash-es/keyBy'
import sortBy from 'lodash-es/sortBy'

import { groupBy, nestedGroupBy } from '~/utils/functions/typeSafe'
import type {
  IUnitData,
  IUnit,
  UnitsByWeaponColor,
  TrueUnitsByWeaponColorByAvailability,
} from '~/utils/types/units'
import {
  WEAPON_FAMILY_FOR_TYPE,
  WEAPON_COLOR_FOR_TYPE,
} from '~/utils/types/weapons'
import { getAvailability } from '~/utils/types/units-availabilities'

export const useStoreDataUnits = defineStore('data/units', () => {
  const unitsData = ref<IUnitData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'units.json',
    'stores/data/units/load',
    unitsData,
  )

  const storeDataAccents = useStoreDataAccents()
  const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

  const units = computed<IUnit[]>(() =>
    storeDataAccents.isLoaded
      ? unitsData.value.map((unit) => ({
          ...unit,
          availability: getAvailability(
            storeDataUnitsAvailabilities.availabilitiesById[unit.id],
          ),
          weaponFamily: WEAPON_FAMILY_FOR_TYPE[unit.weapon_type],
          weaponColor: WEAPON_COLOR_FOR_TYPE[unit.weapon_type],
          nameForLink: escapeName(unit.full_name),
          nameForFilters: storeDataAccents.transliterate(unit.full_name),
          nameForSorting: unit.full_name,
          nameForDisplay:
            unit.game8_name && unit.game8_name !== unit.title
              ? `${unit.full_name} (${unit.game8_name})`
              : unit.full_name,
        }))
      : [],
  )

  const unitsById = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'id'),
  )
  const unitsByNameForLink = computed<{ [index: string]: IUnit }>(() =>
    keyBy(units.value, 'nameForLink'),
  )

  const unitsByWeaponColor = computed<UnitsByWeaponColor>(() =>
    groupBy(units.value, 'weaponColor'),
  )
  const unitsByWeaponColorByAvailability =
    // @ts-expect-error unsafe typing :/
    computed<TrueUnitsByWeaponColorByAvailability>(() =>
      // @ts-expect-error unsafe typing :/
      nestedGroupBy(units.value, ['availability', 'weaponColor']),
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
    unitsById,
    unitsByNameForLink,
    unitsByWeaponColor,
    unitsByWeaponColorByAvailability,
    sortedUnits,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataUnits, import.meta.hot))
}
