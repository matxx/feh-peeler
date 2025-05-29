import keyBy from 'lodash-es/keyBy'

import type { SkillId, ISkillDescription } from '@/utils/types/skills'

export const useStoreDataSkillsDescriptions = defineStore(
  'data/skills-descriptions',
  () => {
    const items = ref<ISkillDescription[]>([])

    const { isLoading, isLoaded, load } = useData(
      'skills-descriptions.json',
      'stores/data/skills-descriptions/load',
      items,
    )

    const byId = computed<{
      [index: SkillId]: ISkillDescription
    }>(() => keyBy(items.value, 'id'))

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
    acceptHMRUpdate(useStoreDataSkillsDescriptions, import.meta.hot),
  )
}
