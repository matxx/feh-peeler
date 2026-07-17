import filter from 'lodash-es/filter'

import { objectFromEntries } from '~/utils/functions/typeSafe'
import type {
  IUnitInstanceInScoreCalc,
  ScoreContext,
} from '~/utils/types/score-calc'
import {
  SORTED_LEGENDARY_ELEMENTS,
  type Element,
} from '~/utils/types/units-filters'

export default function useScoreContext(
  units: Ref<IUnitInstanceInScoreCalc[]>,
  hasBonusUnit: Ref<boolean>,
  seasonElements: Ref<Element[]>,
  mjolnirStrike?: Ref<ScoreContext['mjolnirStrike']>,
) {
  const storeDataUnits = useStoreDataUnits()

  return computed<ScoreContext>(() => ({
    bonusFactor: hasBonusUnit.value ? 2 : 1,
    seasonElements: seasonElements.value,
    legendaryCounts: objectFromEntries(
      SORTED_LEGENDARY_ELEMENTS.map((element) => [
        element,
        filter(units.value, (u) => {
          if (!u.id) return false

          const unit = storeDataUnits.unitsById[u.id]
          if (!unit) return false
          if (!unit.is_legendary) return false

          return unit.element === element
        }).length,
      ]),
    ),
    mjolnirStrike: mjolnirStrike?.value ?? {
      isActive: false,
      minor: null,
      major: null,
    },
  }))
}
