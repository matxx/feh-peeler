import min from 'lodash-es/min'
import keyBy from 'lodash-es/keyBy'
import compact from 'lodash-es/compact'

import type { IUnit, UnitId } from '@/utils/types/units'
import {
  AV_SCORE_GENERIC_POOL_3_4,
  AV_SCORE_HEROIC_GRAILS,
  // AV_SCORE_NORMAL_DIVINE_CODES,
  // AV_SCORE_LIMITED_DIVINE_CODES,
  AV_SCORE_SPECIAL_POOL_4,
  AV_SCORE_GENERIC_POOL_45,
  AV_SCORE_SPECIAL_POOL_45,
  AV_SCORE_GENERIC_POOL_5,
  AV_SCORE_LIMITED_HEROES,
  AV_SCORE_SPECIAL_POOL_5,
  AV_SCORE_INFINITY,
  type IUnitAvailability,
} from '@/utils/types/units-availabilities'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  // NORMAL_DIVINE_CODES,
  // LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'
import type { IndexedBy } from '~/utils/functions/typeSafe'

export const useStoreDataUnitsAvailabilities = defineStore(
  'data/units-availabilities',
  () => {
    const availabilities = ref<IUnitAvailability[]>([])

    const { isLoading, isLoaded, load } = useData(
      'units-availabilities.json',
      'stores/data/units-availabilities/load',
      availabilities,
    )

    const availabilitiesById = computed<IndexedBy<UnitId, IUnitAvailability>>(
      () => keyBy(availabilities.value, 'id'),
    )

    function availabilitySortingValue(unit: IUnit) {
      const availability = availabilitiesById.value[unit.id]
      if (!availability) return AV_SCORE_INFINITY

      const availabilities = [AV_SCORE_INFINITY]

      if (availability.is_in[GENERIC_SUMMON_POOL]) {
        switch (availability.lowest_rarity[GENERIC_SUMMON_POOL]) {
          case 3:
          case 4:
            availabilities.push(AV_SCORE_GENERIC_POOL_3_4)
            break
          case 4.5:
            availabilities.push(AV_SCORE_GENERIC_POOL_45)
            break
          case 5:
            availabilities.push(AV_SCORE_GENERIC_POOL_5)
            break
        }
      }
      if (availability.is_in[HEROIC_GRAILS]) {
        availabilities.push(AV_SCORE_HEROIC_GRAILS)
      }
      // if (availability.is_in[LIMITED_DIVINE_CODES]) {
      //   availabilities.push(AV_SCORE_LIMITED_DIVINE_CODES)
      // }
      // if (availability.is_in[NORMAL_DIVINE_CODES]) {
      //   availabilities.push(AV_SCORE_NORMAL_DIVINE_CODES)
      // }
      if (availability.is_in[FOCUS_ONLY]) {
        availabilities.push(AV_SCORE_LIMITED_HEROES)
      }
      if (availability.is_in[SPECIAL_SUMMON_POOL]) {
        switch (availability.lowest_rarity[SPECIAL_SUMMON_POOL]) {
          case 4:
            availabilities.push(AV_SCORE_SPECIAL_POOL_4)
            break
          case 4.5:
            availabilities.push(AV_SCORE_SPECIAL_POOL_45)
            break
          case 5:
            availabilities.push(AV_SCORE_SPECIAL_POOL_5)
            break
        }
      }

      return min(availabilities)
    }

    const isFiveStarLocked = (availability: IUnitAvailability) =>
      availability
        ? (min(compact(Object.values(availability.lowest_rarity))) || 0) > 4
        : null
    const isIdFiveStarLocked = (unitId: UnitId) =>
      isFiveStarLocked(availabilitiesById.value[unitId])
    const isUnitFiveStarLocked = (unit: IUnit) => isIdFiveStarLocked(unit.id)

    return {
      isLoading,
      isLoaded,
      load,

      availabilities,
      availabilitiesById,

      availabilitySortingValue,

      isFiveStarLocked,
      isIdFiveStarLocked,
      isUnitFiveStarLocked,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsAvailabilities, import.meta.hot),
  )
}
