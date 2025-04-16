import type { UnitId } from '~/utils/types/units'

interface IConstants {
  units_count: number
  units_max_hp: number
  units_max_hp_ids: UnitId[]
  units_max_atk: number
  units_max_atk_ids: UnitId[]
  units_max_spd: number
  units_max_spd_ids: UnitId[]
  units_max_def: number
  units_max_def_ids: UnitId[]
  units_max_res: number
  units_max_res_ids: UnitId[]
  units_max_bst: number
  units_max_bst_ids: UnitId[]
}

export const useStoreDataConstants = defineStore('data/constants', () => {
  const constants = ref<IConstants>()

  const { isLoading, isLoaded, load } = useData(
    'constants.json',
    'stores/data/constants/load',
    constants,
  )

  return {
    isLoading,
    isLoaded,
    load,

    constants,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useStoreDataConstants, import.meta.hot),
  )
}
