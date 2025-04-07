import min from 'lodash-es/min'
import keyBy from 'lodash-es/keyBy'
import compact from 'lodash-es/compact'

import { type SkillId, type ISkill, SKILL_SPECIAL } from '~/utils/types/skills'
import type {
  Availability,
  ISkillAvailability,
  ISkillAvailabilityById,
} from '@/utils/types/skills-availabilities'
import { FODDER_LOWEST_RARITY_WHEN_OBTAINED } from '~/utils/types/obfuscated-keys'

export const useStoreDataSkillsAvailabilities = defineStore(
  'data/skills-availabilities',
  () => {
    const { isLoading, isLoaded, load } = useData(
      'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills-availabilities.json',
      'stores/data/skills-availabilities/load',
      (result) => {
        availabilities.value = JSON.parse(result as string)
        // availabilities.value = result
      },
    )

    const availabilities = ref<ISkillAvailability[]>([])

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

    return {
      isLoading,
      isLoaded,
      load,

      availabilities,
      availabilitiesById,

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
