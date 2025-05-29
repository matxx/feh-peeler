import type { IConstants } from '~/utils/types/constants'

import { getDefaulUnitStatsMinMax } from '~/utils/types/units-stats'
import { getDefaulSkillStatsMinMax } from '~/utils/types/skills-filters'

export const useStoreDataConstants = defineStore('data/constants', () => {
  const constants = ref<IConstants>()

  const { isLoading, isLoaded, load } = useData(
    'constants.json',
    'stores/data/constants/load',
    constants,
  )

  const defaulUnitStatsMinMax = computed(() =>
    getDefaulUnitStatsMinMax(constants.value),
  )
  const defaulSkillStatsMinMax = computed(() =>
    getDefaulSkillStatsMinMax(constants.value),
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
