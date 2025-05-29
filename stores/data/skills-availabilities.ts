import min from 'lodash-es/min'
import keyBy from 'lodash-es/keyBy'
import compact from 'lodash-es/compact'

import { type SkillId, type ISkill, SKILL_SPECIAL } from '~/utils/types/skills'
import type {
  Availability,
  ISkillAvailability,
  ISkillAvailabilityById,
} from '@/utils/types/skills-availabilities'
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
} from '@/utils/types/units-availabilities'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  // LIMITED_DIVINE_CODES,
  // NORMAL_DIVINE_CODES,
  FOCUS_ONLY,
  FODDER_LOWEST_RARITY_WHEN_OBTAINED,
} from '~/utils/types/obfuscated-keys'

export const useStoreDataSkillsAvailabilities = defineStore(
  'data/skills-availabilities',
  () => {
    const availabilities = ref<ISkillAvailability[]>([])

    const { isLoading, isLoaded, load } = useData(
      'skills-availabilities.json',
      'stores/data/skills-availabilities/load',
      availabilities,
    )

    const availabilitiesById = computed<ISkillAvailabilityById>(() =>
      keyBy(availabilities.value, 'id'),
    )

    const isFiveStarLocked = (availability?: ISkillAvailability) =>
      availability
        ? (min(
            compact(
              Object.values(availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED]),
            ),
          ) || 0) > 4
        : null
    const isIdFiveStarLocked = (skillId: SkillId) =>
      isFiveStarLocked(availabilitiesById.value[skillId])
    const isSkillFiveStarLocked = (skill: ISkill) =>
      isIdFiveStarLocked(skill.id)

    const requiredInheritSlotsCount = (
      skill: ISkill,
      isUnitFiveStarLocked: boolean,
      avail: Availability,
    ) => {
      if (skill.is_prf) return 0

      const availability = availabilitiesById.value[skill.id]
      if (!availability) return 0
      if (
        isUnitFiveStarLocked &&
        skill.category === SKILL_SPECIAL &&
        !isFiveStarLocked(availability)
      ) {
        return 0
      }

      return availability.fodder[avail]
    }

    function availabilitySortingValue(skill: ISkill) {
      const availability = availabilitiesById.value[skill.id]
      if (!availability) return AV_SCORE_INFINITY

      const availabilities = [AV_SCORE_INFINITY]

      if (availability.is_in[GENERIC_SUMMON_POOL]) {
        switch (
          availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][GENERIC_SUMMON_POOL]
        ) {
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
        switch (
          availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][SPECIAL_SUMMON_POOL]
        ) {
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

      availabilitySortingValue,

      isFiveStarLocked,
      isIdFiveStarLocked,
      isSkillFiveStarLocked,

      requiredInheritSlotsCount,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataSkillsAvailabilities, import.meta.hot),
  )
}
