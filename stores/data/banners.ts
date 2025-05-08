import sortBy from 'lodash-es/sortBy'

import type { UnitId } from '~/utils/types/units'
import { chunkMaxLength } from '~/utils/functions/typeSafe'

interface IBanner {
  name: string
  unit_ids: UnitId[]
}

export const useStoreDataBanners = defineStore('data/banners', () => {
  const storeDataUnits = useStoreDataUnits()

  const banners = ref<IBanner[]>()

  const { isLoading, isLoaded, load } = useData(
    'banners.json',
    'stores/data/banners/load',
    banners,
  )

  const selectedBanner = ref<IBanner>()
  const selectedBannerUnitIds = computed(
    () => selectedBanner.value?.unit_ids || [],
  )
  const selectedBannerUnits = computed(() =>
    selectedBannerUnitIds.value.map((id) => storeDataUnits.unitsById[id]),
  )
  const selectedBannerUnitsLines = computed(() =>
    chunkMaxLength(
      sortBy(selectedBannerUnits.value, 'sortableWeaponColor'),
      4,
    ).map((line, index) => ({
      id: index,
      units: line,
    })),
  )

  return {
    isLoading,
    isLoaded,
    load,

    banners,
    selectedBanner,
    selectedBannerUnitsLines,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataBanners, import.meta.hot))
}
