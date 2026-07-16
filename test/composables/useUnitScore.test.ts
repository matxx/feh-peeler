// @vitest-environment nuxt
//
// Anti-regression tests for useUnitScore().
//
// Each team below is stored as the exact "SCTv1:..." save/load code produced
// by encodeTeamInScoreCalc(), referencing real production units/skills
// (loaded from the live, commit-pinned data feed the app itself uses - see
// test/support/loadProdData.ts), paired with the scores useUnitScore()
// currently computes for its 4 units. If a future change to the scoring
// formula alters these numbers, these tests will fail - update the expected
// scores deliberately, don't just make them pass.
import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import useUnitScore from '~/composables/useUnitScore'
import useScoreContext from '~/composables/useScoreContext'
import { decodeTeamInScoreCalc } from '~/utils/types/score-calc'
import type { ElementLegendary } from '~/utils/types/units-filters'

import { loadProdDataStores } from '../support/loadProdData'

beforeEach(async () => {
  setActivePinia(createPinia())
  await loadProdDataStores()
})

interface TeamCase {
  name: string
  code: string
  context: {
    hasBonusUnit: boolean
    seasonElements: ElementLegendary[]
  }
  expectedVisibleFinalScores: number[]
}

// Covers: boon/bane, a manual blessing, a tier-1 duel skill (Alfonse); a
// legendary Armored unit (no access to duel skills) with a duel_score-based
// visible BST and a chosen hero attached (recursive useUnitScore call,
// Black Knight -> Fjorm); a chosen unit picking up its clash_score-based
// visible BST and in-season blessing (Fjorm); a mythic unit with a tier-4
// duel skill (Rune).
const TEAM_STANDARD: TeamCase = {
  name: 'standard team (boons/banes, chosen hero, duel skills)',
  code: 'SCTv1:W3siaWQiOiJQSURf44Ki44Or44OV44Kp44Oz44K5Iiwic2tpbGxJZHMiOnsicGFzc2l2ZWEiOiJTSURf6LWk44Gu5q276ZeY44O75q2p6KGMMSJ9LCJyYXJpdHkiOjUsImxldmVsIjo0MCwibWVyZ2VzIjoyLCJib29uIjoiYXRrIiwiYmFuZSI6ImRlZiIsImJsZXNzaW5nIjoiRmlyZSIsInNraWxsU1BzIjp7InBhc3NpdmVhIjo3MCwicGFzc2l2ZWIiOjEyMCwicGFzc2l2ZWMiOjgwLCJzYWNyZWRzZWFsIjo1MH0sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/kvJ3mib/mvIbpu5Ljga7pqI7lo6siLCJza2lsbElkcyI6e30sInJhcml0eSI6NSwibGV2ZWwiOjQwLCJtZXJnZXMiOjQsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6eyJ3ZWFwb24iOjEwMCwic3BlY2lhbCI6MTAwLCJzYWNyZWRzZWFsIjo1MH0sImNob3Nlbkhlcm9JZCI6IlBJRF/mlZHkuJbjg5XjgqPjg6jjg6vjg6AiLCJjaG9zZW5IZXJvTWVyZ2VzIjozfSx7ImlkIjoiUElEX+aVkeS4luODleOCo+ODqOODq+ODoCIsInNraWxsSWRzIjp7fSwicmFyaXR5Ijo1LCJsZXZlbCI6NDAsIm1lcmdlcyI6MSwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOm51bGwsInNraWxsU1BzIjp7fSwiY2hvc2VuSGVyb0lkIjpudWxsLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+ODq+ODvOODsyIsInNraWxsSWRzIjp7InBhc3NpdmVhIjoiU0lEX+eEoeOBruatu+mXmOODu+atqeihjDQifSwicmFyaXR5Ijo1LCJsZXZlbCI6NDAsIm1lcmdlcyI6MCwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOm51bGwsInNraWxsU1BzIjp7InBhc3NpdmVhIjozMDB9LCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9XQ==',
  context: {
    hasBonusUnit: false,
    seasonElements: ['Fire', 'Water'],
  },
  expectedVisibleFinalScores: [341, 374, 370, 338],
}

// Covers: sub-max level/rarity (no duel effects), the bonus-unit factor x2,
// two mythic units with tier-4 duel skills (Sothis, Rune) - none of the 4
// units here are legendary, so legendaryCounts is all zeros - and a chosen
// unit's in-season blessing score (Fjorm).
const TEAM_BONUS_FACTOR: TeamCase = {
  name: 'team with the bonus-unit x2 factor',
  code: 'SCTv1:W3siaWQiOiJQSURf44Ki44Or44OV44Kp44Oz44K5Iiwic2tpbGxJZHMiOnt9LCJyYXJpdHkiOjQsImxldmVsIjozMCwibWVyZ2VzIjowLCJib29uIjoiaHAiLCJiYW5lIjoiZGVmIiwiYmxlc3NpbmciOiJXYXRlciIsInNraWxsU1BzIjp7fSwiY2hvc2VuSGVyb0lkIjpudWxsLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+elnumajuOCveODhuOCo+OCuSIsInNraWxsSWRzIjp7fSwicmFyaXR5Ijo1LCJsZXZlbCI6NDAsIm1lcmdlcyI6MSwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOm51bGwsInNraWxsU1BzIjp7fSwiY2hvc2VuSGVyb0lkIjpudWxsLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+ODq+ODvOODsyIsInNraWxsSWRzIjp7InBhc3NpdmVhIjoiU0lEX+eEoeOBruatu+mXmOODu+atqeihjDQifSwicmFyaXR5Ijo1LCJsZXZlbCI6NDAsIm1lcmdlcyI6MiwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOm51bGwsInNraWxsU1BzIjp7InBhc3NpdmVhIjozMDB9LCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9LHsiaWQiOiJQSURf5pWR5LiW44OV44Kj44Oo44Or44OgIiwic2tpbGxJZHMiOnt9LCJyYXJpdHkiOjUsImxldmVsIjo0MCwibWVyZ2VzIjowLCJib29uIjpudWxsLCJiYW5lIjpudWxsLCJibGVzc2luZyI6bnVsbCwic2tpbGxTUHMiOnt9LCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9XQ==',
  context: {
    hasBonusUnit: true,
    seasonElements: ['Fire', 'Water'],
  },
  expectedVisibleFinalScores: [582, 668, 684, 736],
}

const TEAM_CASES: TeamCase[] = [TEAM_STANDARD, TEAM_BONUS_FACTOR]

describe('useUnitScore', () => {
  it.each(TEAM_CASES)(
    'computes the expected visibleFinalScore for: $name',
    ({ code, context, expectedVisibleFinalScores }) => {
      const units = decodeTeamInScoreCalc(code)
      const scoreContext = useScoreContext(
        ref(units),
        ref(context.hasBonusUnit),
        ref(context.seasonElements),
      )

      const scores = units.map((unitInstance) => {
        const { visibleFinalScore } = useUnitScore(
          ref(unitInstance),
          scoreContext,
        )
        return visibleFinalScore.value
      })

      expect(scores).toEqual(expectedVisibleFinalScores)
    },
  )
})
