import orderBy from 'lodash-es/orderBy'

import { chunkMaxLength } from '~/utils/functions/typeSafe'
import * as hgs from '~/utils/types/units-heroicGrails'

export const useStoreDataUnitsHeroicGrails = defineStore(
  'data/units-heroicGrails',
  () => {
    const storeDataUnits = useStoreDataUnits()

    const heroicGrailsData = ref<hgs.IHeroicGrailData[]>([])
    const { isLoading, isLoaded, load } = useData(
      'units-heroic_grails.json',
      'stores/data/units-heroicGrails/load',
      heroicGrailsData,
    )

    const order = ref<hgs.SortOrder>(hgs.DEFAULT_ORDER)
    const columnsCount = ref(5)

    const heroicGrails = computed<hgs.IHeroicGrail[]>(() =>
      heroicGrailsData.value.map((hg) => ({
        ...hg,
        startTime: new Date(hg.start_time),
      })),
    )

    const heroicGrailsUnits = computed(() =>
      heroicGrails.value.map((hg) => storeDataUnits.unitsById[hg.unit_id]),
    )

    const heroicGrailsUnitsSorted = computed(() => {
      switch (order.value) {
        case hgs.SORT_BY_NEWEST:
          return orderBy(heroicGrailsUnits.value, ['release_date'], ['desc'])
        case hgs.SORT_BY_ADDED:
          return orderBy(heroicGrailsUnits.value, 'release_date')
        case hgs.SORT_BY_ORIGIN:
          return orderBy(heroicGrailsUnits.value, 'origin')
        case hgs.SORT_BY_TYPE:
          return orderBy(heroicGrailsUnits.value, [
            'sortableWeaponColor',
            'rarity',
            'sortableType',
            'sortableMoveType',
            'origin',
          ])
        case hgs.SORT_BY_WEAPON_TYPE:
          return orderBy(heroicGrailsUnits.value, [
            'sortableWeaponType',
            'rarity',
            'sortableMoveType',
            'origin',
          ])
        case hgs.SORT_BY_MOVE_TYPE:
          return orderBy(heroicGrailsUnits.value, [
            'sortableMoveType',
            'rarity',
            'sortableType',
            'origin',
          ])
      }
    })

    const heroicGrailsUnitsLines = computed(() =>
      chunkMaxLength(heroicGrailsUnitsSorted.value, columnsCount.value).map(
        (line, index) => ({
          id: index,
          units: line,
        }),
      ),
    )

    return {
      isLoading,
      isLoaded,
      load,

      order,
      heroicGrailsUnitsLines,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsHeroicGrails, import.meta.hot),
  )
}
