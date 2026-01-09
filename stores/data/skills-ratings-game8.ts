import keyBy from 'lodash-es/keyBy'

import type { SkillId, ISkillRatingsGame8 } from '@/utils/types/skills'
import type { IndexedBy } from '~/utils/functions/typeSafe'

export const useStoreDataSkillsRatingsGame8 = defineStore(
  'data/skills-ratings-game8',
  () => {
    const items = ref<ISkillRatingsGame8[]>([])

    const { isLoading, isLoaded, load } = useData(
      'skills-ratings-game8.json',
      'stores/data/skills-ratings-game8/load',
      items,
    )

    const byId = computed<IndexedBy<SkillId, ISkillRatingsGame8>>(() =>
      keyBy(items.value, 'id'),
    )

    return {
      isLoading,
      isLoaded,
      load,

      byId,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataSkillsRatingsGame8, import.meta.hot),
  )
}
