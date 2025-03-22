import min from 'lodash-es/min'
import keyBy from 'lodash-es/keyBy'
import * as Sentry from '@sentry/nuxt'

import type { IUnit } from '@/utils/types/units'
import {
  AV_SCORE_GENERIC_POOL_3_4,
  AV_SCORE_HEROIC_GRAILS,
  AV_SCORE_NORMAL_DIVINE_CODES,
  AV_SCORE_SPECIAL_POOL_4,
  AV_SCORE_GENERIC_POOL_45,
  AV_SCORE_SPECIAL_POOL_45,
  AV_SCORE_GENERIC_POOL_5,
  AV_SCORE_LIMITED_HEROES,
  AV_SCORE_SPECIAL_POOL_5,
  AV_SCORE_INFINITY,
  type IUnitAvailability,
  type IUnitAvailabilityById,
} from '@/utils/types/units-availabilities'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  // LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'

const JSON_URL =
  'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units-availabilities.json'

export const useStoreUnitsAvailabilities = defineStore(
  'units-availabilities',
  () => {
    const { addToastWithGenericError } = useStoreSnackbar()

    const isLoading = ref(false)
    const isLoaded = ref(false)
    const availabilities = ref<IUnitAvailability[]>([])

    const availabilitiesById = computed<IUnitAvailabilityById>(() =>
      keyBy(availabilities.value, 'id'),
    )

    function load() {
      if (isLoaded.value) return

      isLoading.value = true

      return $fetch(JSON_URL)
        .then(
          (result) => {
            availabilities.value = JSON.parse(result as string)
            // availabilities.value = result
          },
          (error) => {
            addToastWithGenericError()
            Sentry.captureException(error, {
              tags: { locator: 'stores/units/load' },
            })
          },
        )
        .finally(() => {
          isLoaded.value = true
          isLoading.value = false
        })
    }

    function availabiltySortingVector(unit: IUnit) {
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
      if (availability.is_in[NORMAL_DIVINE_CODES]) {
        availabilities.push(AV_SCORE_NORMAL_DIVINE_CODES)
      }
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

    return {
      isLoading,
      isLoaded,
      load,

      availabilities,
      availabilitiesById,

      availabiltySortingVector,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreUnitsAvailabilities, import.meta.hot),
  )
}
