import type { IConstants } from '~/utils/types/constants'

import { getDefaultSealStatsMinMax } from '~/utils/types/seals-filters'
import { getDefaultSkillStatsMinMax } from '~/utils/types/skills-filters'
import { getDefaultUnitStatsMinMax } from '~/utils/types/units-stats'

export const useStoreDataConstants = defineStore('data/constants', () => {
  const constants = ref<IConstants>()

  const { isLoading, isLoaded, load } = useData(
    'constants.json',
    'stores/data/constants/load',
    constants,
  )

  const defaultSealStatsMinMax = computed(() =>
    getDefaultSealStatsMinMax(constants.value),
  )
  const defaultSkillStatsMinMax = computed(() =>
    getDefaultSkillStatsMinMax(constants.value),
  )
  const defaultUnitStatsMinMax = computed(() =>
    getDefaultUnitStatsMinMax(constants.value),
  )

  return {
    isLoading,
    isLoaded,
    load,

    constants,

    defaultSealStatsMinMax,
    defaultSkillStatsMinMax,
    defaultUnitStatsMinMax,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataConstants, import.meta.hot),
  )
}
