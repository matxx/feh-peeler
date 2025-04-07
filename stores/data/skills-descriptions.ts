import keyBy from 'lodash-es/keyBy'

import type { SkillId, ISkillDescription } from '@/utils/types/skills'

export const useStoreDataSkillsDescriptions = defineStore(
  'data/skills-descriptions',
  () => {
    const { isLoading, isLoaded, load } = useData(
      'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/skills-descriptions.json',
      'stores/data/skills-descriptions/load',
      (result) => {
        skillsDescriptions.value = JSON.parse(result as string)
        // skillsDescriptions.value = result
      },
    )

    const skillsDescriptions = ref<ISkillDescription[]>([])

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
