import sortBy from 'lodash-es/sortBy'

import type { UnitId } from '~/utils/types/units'
import { chunkMaxLength } from '~/utils/functions/typeSafe'
import { getSortableName } from '~/utils/functions/bannerSortingVector'

interface IBannerData {
  name: string
  unit_ids: UnitId[]
}
interface IBanner extends IBannerData {
  nameForSorting: string
}

export const useStoreDataBanners = defineStore('data/banners', () => {
  const storeDataUnits = useStoreDataUnits()

  const bannersData = ref<IBannerData[]>([])

  const { isLoading, isLoaded, load } = useData(
    'banners.json',
    'stores/data/banners/load',
    bannersData,
  )

  const banners = computed<IBanner[]>(() =>
    sortBy(
      bannersData.value.map((banner) => ({
        ...banner,
        nameForSorting: getSortableName(banner.name),
      })),
      'nameForSorting',
    ),
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
