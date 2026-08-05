import filter from 'lodash-es/filter'

import { objectFromEntries } from '~/utils/functions/typeSafe'
import type {
  IUnitInstanceInScoreCalc,
  ScoreContextIn,
  ScoreContextOut,
} from '~/utils/types/score-calc'
import { SORTED_LEGENDARY_ELEMENTS } from '~/utils/types/elements'

export default function useScoreContext(
  units: Ref<IUnitInstanceInScoreCalc[]>,
  arena?: Ref<ScoreContextIn['arena']>,
  mjolnirStrike?: Ref<ScoreContextIn['mjolnirStrike']>,
) {
  const storeDataUnits = useStoreDataUnits()

  return computed<ScoreContextOut>(() => ({
    bonusFactor:
      arena?.value?.hasBonusUnit || mjolnirStrike?.value?.isActive ? 2 : 1,
    arena: {
      ...(arena?.value ?? {
        isActive: false,
        hasBonusUnit: false,
        seasons: [],
      }),
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
    },
    mjolnirStrike: mjolnirStrike?.value ?? {
      isActive: false,
      tier: null,
      major: null,
      minor: null,
    },
  }))
}
