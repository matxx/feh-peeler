import { STATS } from '~/utils/types/units-stats'
import {
  SORTED_LEGENDARY_ELEMENTS,
  SORTED_MYTHIC_ELEMENTS,
  SORTED_ELEMENTS,
} from '~/utils/types/units-filters'

export default function useSelects() {
  const { t } = useI18n()

  const itemsForStats = STATS.map((stat) => ({
    value: stat,
    title: t(`global.stats.${stat}`),
  }))
  const itemsForElements = SORTED_ELEMENTS.map((element) => ({
    value: element,
    title: t(`global.elements.${element}`),
  }))
  const itemsForElementsLegendary = SORTED_LEGENDARY_ELEMENTS.map(
    (element) => ({
      value: element,
      title: t(`global.elements.${element}`),
    }),
  )
  const itemsForElementsMythic = SORTED_MYTHIC_ELEMENTS.map((element) => ({
    value: element,
    title: t(`global.elements.${element}`),
  }))

  return {
    itemsForStats,
    itemsForElements,
    itemsForElementsLegendary,
    itemsForElementsMythic,
  }
}
