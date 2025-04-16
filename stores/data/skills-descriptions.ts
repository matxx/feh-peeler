import keyBy from 'lodash-es/keyBy'

import type { SkillId, ISkillDescription } from '@/utils/types/skills'

export const useStoreDataSkillsDescriptions = defineStore(
  'data/skills-descriptions',
  () => {
    const skillsDescriptions = ref<ISkillDescription[]>([])

    const { isLoading, isLoaded, load } = useData(
      'skills-descriptions.json',
      'stores/data/skills-descriptions/load',
      skillsDescriptions,
    )

    const skillsDescriptionsById = computed<{
      [index: SkillId]: ISkillDescription
    }>(() => keyBy(skillsDescriptions.value, 'id'))

    return {
      isLoading,
      isLoaded,
      load,

      skillsDescriptions,
      skillsDescriptionsById,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataSkillsDescriptions, import.meta.hot),
  )
}
