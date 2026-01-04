import { GRID_COLUMNS_COUNT } from '~/utils/constants'

export default function (count: Ref<number>) {
  const { mobile, xs, sm, md, lg, xl, xxl } = useDisplay()

  const colsSpanRaw = computed(() => {
    switch (count.value) {
      case 0:
      case 1:
        return GRID_COLUMNS_COUNT
      case 2:
        return GRID_COLUMNS_COUNT / 2
      case 3:
        return GRID_COLUMNS_COUNT / 3
      case 4:
        return GRID_COLUMNS_COUNT / 4
      case 5:
      case 6:
        return GRID_COLUMNS_COUNT / 6
      default:
        return GRID_COLUMNS_COUNT / GRID_COLUMNS_COUNT
    }
  })
  const colsSpanMin = computed(() => {
    if (mobile.value) return GRID_COLUMNS_COUNT

    if (xs.value) return GRID_COLUMNS_COUNT
    if (sm.value) return GRID_COLUMNS_COUNT
    if (md.value) return GRID_COLUMNS_COUNT / 2
    if (lg.value) return GRID_COLUMNS_COUNT / 3
    if (xl.value) return GRID_COLUMNS_COUNT / 4
    if (xxl.value) return GRID_COLUMNS_COUNT / 6

    return colsSpanRaw.value * 2
  })
  const colsSpanEffective = computed(() => {
    return Math.max(colsSpanRaw.value, colsSpanMin.value)
  })

  return {
    colsSpanRaw,
    colsSpanMin,
    colsSpanEffective,
  }
}
