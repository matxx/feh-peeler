import type { IConstants } from '~/utils/types/constants'

import { getDefaultUnitStatsMinMax } from '~/utils/types/units-stats'
import { getDefaultSkillStatsMinMax } from '~/utils/types/skills-filters'

export const useStoreDataConstants = defineStore('data/constants', () => {
  const constants = ref<IConstants>()

  const { isLoading, isLoaded, load } = useData(
    'constants.json',
    'stores/data/constants/load',
    constants,
  )

  const defaulUnitStatsMinMax = computed(() =>
    getDefaultUnitStatsMinMax(constants.value),
  )
  const defaulSkillStatsMinMax = computed(() =>
    getDefaultSkillStatsMinMax(constants.value),
  )

  return {
    isLoading,
    isLoaded,
    load,

    constants,

    defaulUnitStatsMinMax,
    defaulSkillStatsMinMax,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataConstants, import.meta.hot),
  )
}
