import sortBy from 'lodash-es/sortBy'

import {
  chunkMaxLength,
  groupBy,
  type IndexedBy,
} from '~/utils/functions/typeSafe'
import { getSortableName } from '~/utils/functions/bannerSortingVector'
import type {
  IBannerData,
  IBanner,
  IBannerOccurrence,
} from '~/utils/types/banners'
import type { UnitId } from '~/utils/types/units'

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

  const bannerOccurrencesByUnitId = computed<
    Partial<IndexedBy<UnitId, IBannerOccurrence[]>>
  >(() =>
    groupBy(
      banners.value.flatMap((banner) =>
        banner.unit_ids.flatMap((unitId) => [
          {
            unitId,
            banner,
            start_time: banner.start_time,
            end_time: banner.end_time,
          },
          ...(banner.reruns || []).map((rerun) => ({
            unitId,
            banner,
            ...rerun,
          })),
        ]),
      ),
      'unitId',
    ),
  )

  return {
    isLoading,
    isLoaded,
    load,

    banners,
    selectedBanner,
    selectedBannerUnitsLines,
    bannerOccurrencesByUnitId,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreDataBanners, import.meta.hot))
}
