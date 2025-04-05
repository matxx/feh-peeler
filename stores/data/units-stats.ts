import keyBy from 'lodash-es/keyBy'

import type { IUnitStat, IUnitStatById } from '@/utils/types/units-stats'

export const useStoreDataUnitsStats = defineStore('data-units-stats', () => {
  const { isLoading, isLoaded, load } = useData(
    'https://raw.githubusercontent.com/matxx/feh-data/refs/heads/main/units-stats.json',
    (result) => {
      stats.value = JSON.parse(result as string)
      // stats.value = result
    },
  )

  const stats = ref<IUnitStat[]>([])
  const statsById = computed<IUnitStatById>(() => keyBy(stats.value, 'id'))

  return {
    isLoading,
    isLoaded,
    load,

    stats,
    statsById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsStats, import.meta.hot),
  )
}
