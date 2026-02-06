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

    const heroicGrailsSorted = computed(() => {
      if (!storeDataUnits.isLoaded) return heroicGrails.value

      switch (order.value) {
        case hgs.SORT_BY_NEWEST:
          return orderBy(
            heroicGrails.value,
            [
              'start_time',
              'rarity',
              (hg) => storeDataUnits.unitsById[hg.unit_id].release_date,
            ],
            ['desc', 'desc', 'desc'],
          )
        case hgs.SORT_BY_ADDED:
          return orderBy(
            heroicGrails.value,
            [
              'start_time',
              'rarity',
              (hg) => storeDataUnits.unitsById[hg.unit_id].release_date,
            ],
            ['asc', 'asc', 'asc'],
          )
        case hgs.SORT_BY_ORIGIN:
          return orderBy(
            heroicGrails.value,
            (hg) => storeDataUnits.unitsById[hg.unit_id].origin,
          )
        case hgs.SORT_BY_TYPE:
          return orderBy(
            heroicGrails.value,
            [
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableWeaponColor,
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableType,
              'rarity',
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableMoveType,
              (hg) => storeDataUnits.unitsById[hg.unit_id].origin,
            ],
            ['asc', 'asc', 'desc', 'asc', 'asc'],
          )
        case hgs.SORT_BY_WEAPON_TYPE:
          return orderBy(
            heroicGrails.value,
            [
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableWeaponType,
              'rarity',
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableMoveType,
              (hg) => storeDataUnits.unitsById[hg.unit_id].origin,
            ],
            ['asc', 'desc', 'asc', 'asc'],
          )
        case hgs.SORT_BY_MOVE_TYPE:
          return orderBy(
            heroicGrails.value,
            [
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableMoveType,
              (hg) => storeDataUnits.unitsById[hg.unit_id].sortableType,
              'rarity',
              (hg) => storeDataUnits.unitsById[hg.unit_id].origin,
            ],
            ['asc', 'asc', 'desc', 'asc'],
          )
      }
    })

    const heroicGrailsLines = computed(() =>
      chunkMaxLength(heroicGrailsSorted.value, columnsCount.value).map(
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
      heroicGrailsLines,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataUnitsHeroicGrails, import.meta.hot),
  )
}
