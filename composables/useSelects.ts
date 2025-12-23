import { STATS } from '~/utils/types/units-stats'
import { SORTED_LEGENDARY_ELEMENTS } from '~/utils/types/units-filters'

export default function useSelects() {
  const { t } = useI18n()

  const itemsForStats = STATS.map((stat) => ({
    value: stat,
    title: t(`global.stats.${stat}`),
  }))
  const itemsForElements = SORTED_LEGENDARY_ELEMENTS.map((element) => ({
    value: element,
    title: t(`global.elements.${element}`),
  }))

  return {
    itemsForStats,
    itemsForElements,
  }
}
