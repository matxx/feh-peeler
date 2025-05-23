import keyBy from 'lodash-es/keyBy'

import type { SkillId, ISkillRatingsGame8 } from '@/utils/types/skills'

export const useStoreDataSkillsRatingsGame8 = defineStore(
  'data/skills-ratings-game8',
  () => {
    const skillsRatingsGame8 = ref<ISkillRatingsGame8[]>([])

    const { isLoading, isLoaded, load } = useData(
      'skills-ratings-game8.json',
      'stores/data/skills-ratings-game8/load',
      skillsRatingsGame8,
    )

    const skillsRatingsGame8ById = computed<{
      [index: SkillId]: ISkillRatingsGame8
    }>(() => keyBy(skillsRatingsGame8.value, 'id'))

    return {
      isLoading,
      isLoaded,
      load,

      skillsRatingsGame8,
      skillsRatingsGame8ById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataSkillsRatingsGame8, import.meta.hot),
  )
}
