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
import {
  ELEMENT_FIRE,
  ELEMENT_WATER,
  type ElementLegendary,
} from '~/utils/types/units-filters'
import { mean } from '~/utils/functions/math'

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
  expectedTeamFinalScore: number
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
    seasonElements: [ELEMENT_FIRE, ELEMENT_WATER],
  },
  expectedVisibleFinalScores: [341, 374, 370, 338],
  expectedTeamFinalScore: 355,
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
    seasonElements: [ELEMENT_FIRE, ELEMENT_WATER],
  },
  expectedVisibleFinalScores: [582, 668, 684, 736],
  expectedTeamFinalScore: 667,
}

// Covers the fix in 360db5b: a legendary bonus unit (Legendary Camilla) with
// a chosen hero attached (Fjorm) must not have that chosen hero's score
// inflated by legendaryCounts, regardless of how many other Water-blessed
// legendaries (Legendary Byleth, Legendary Guinevere) sit on the team.
// The 3 team codes below only differ by that Water legendary count (0/1/2);
// Fjorm's visible score (units index 0, via the chosen hero) must stay
// identical across all 3 - a regression would make it grow with the count.
const TEAM_BONUS_LEGENDARY_NO_OTHER_LEGENDARY: TeamCase = {
  name: 'L!Camilla as bonus unit w/o other legendaries',
  code: 'SCTv1:W3siaWQiOiJQSURf5Lyd5om/44Kr44Of44OpIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjpudWxsLCJiYW5lIjpudWxsLCJibGVzc2luZyI6IldhdGVyIiwic2tpbGxTUHMiOnt9LCJjaG9zZW5IZXJvSWQiOiJQSURf5pWR5LiW44OV44Kj44Oo44Or44OgIiwiY2hvc2VuSGVyb01lcmdlcyI6Mn0seyJpZCI6IlBJRF/mr5Tnv7zjg5jjgq/jg4jjg6siLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/mr5Tnv7zjg6zjg7zjgq7jg6Pjg6vjg7MiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgq/jg6rjgrnlpbMiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH1d',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER],
  },
  expectedVisibleFinalScores: [744, 670, 676, 664],
  expectedTeamFinalScore: 688,
}

const TEAM_BONUS_LEGENDARY_1_OTHER_LEGENDARY: TeamCase = {
  name: 'L!Camilla as bonus unit w/ 1 other legendary',
  code: 'SCTv1:W3siaWQiOiJQSURf5Lyd5om/44Kr44Of44OpIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjpudWxsLCJiYW5lIjpudWxsLCJibGVzc2luZyI6IldhdGVyIiwic2tpbGxTUHMiOnt9LCJjaG9zZW5IZXJvSWQiOiJQSURf5pWR5LiW44OV44Kj44Oo44Or44OgIiwiY2hvc2VuSGVyb01lcmdlcyI6Mn0seyJpZCI6IlBJRF/kvJ3mib/jg5njg6zjg4giLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiV2F0ZXIiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/mr5Tnv7zjg6zjg7zjgq7jg6Pjg6vjg7MiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgq/jg6rjgrnlpbMiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH1d',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER],
  },
  expectedVisibleFinalScores: [744, 670, 676, 664],
  expectedTeamFinalScore: 688,
}

const TEAM_BONUS_LEGENDARY_2_OTHER_LEGENDARIES: TeamCase = {
  name: 'L!Camilla as bonus unit w/ 2 other legendaries',
  code: 'SCTv1:W3siaWQiOiJQSURf5Lyd5om/44Kr44Of44OpIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjpudWxsLCJiYW5lIjpudWxsLCJibGVzc2luZyI6IldhdGVyIiwic2tpbGxTUHMiOnt9LCJjaG9zZW5IZXJvSWQiOiJQSURf5pWR5LiW44OV44Kj44Oo44Or44OgIiwiY2hvc2VuSGVyb01lcmdlcyI6Mn0seyJpZCI6IlBJRF/kvJ3mib/jg5njg6zjg4giLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiV2F0ZXIiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/kvJ3mib/jgq7jg43jg7TjgqPjgqIiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiV2F0ZXIiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgq/jg6rjgrnlpbMiLCJza2lsbElkcyI6e30sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjpudWxsLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH1d',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER],
  },
  expectedVisibleFinalScores: [744, 670, 676, 664],
  expectedTeamFinalScore: 688,
}

const TEAM_CASES: TeamCase[] = [
  TEAM_STANDARD,
  TEAM_BONUS_FACTOR,
  TEAM_BONUS_LEGENDARY_NO_OTHER_LEGENDARY,
  TEAM_BONUS_LEGENDARY_1_OTHER_LEGENDARY,
  TEAM_BONUS_LEGENDARY_2_OTHER_LEGENDARIES,
]

describe('useUnitScore', () => {
  it.each(TEAM_CASES)(
    'computes the expected visibleFinalScore for: $name',
    ({
      code,
      context,
      expectedVisibleFinalScores,
      expectedTeamFinalScore,
    }) => {
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
      expect(Math.floor(mean(scores))).toEqual(expectedTeamFinalScore)
    },
  )

  // The 3 cases above (TEAM_BONUS_LEGENDARY_*) only differ in
  // legendaryCounts.Water (0/1/2 other Water legendaries on the team besides
  // L!Camilla herself, who is already excluded since she's legendary). Per
  // the fix in 360db5b, Fjorm - attached as L!Camilla's chosen hero - must
  // not gain any score from those legendaries: its visibleFinalScore must
  // stay identical across all 3 contexts.
  it('does not increase an attached chosen hero score with legendaryCounts (360db5b)', () => {
    const fjormScores = [
      TEAM_BONUS_LEGENDARY_NO_OTHER_LEGENDARY,
      TEAM_BONUS_LEGENDARY_1_OTHER_LEGENDARY,
      TEAM_BONUS_LEGENDARY_2_OTHER_LEGENDARIES,
    ].map(({ code, context }) => {
      const units = decodeTeamInScoreCalc(code)
      const scoreContext = useScoreContext(
        ref(units),
        ref(context.hasBonusUnit),
        ref(context.seasonElements),
      )
      const { chosenHeroFinalScore } = useUnitScore(ref(units[0]), scoreContext)
      return chosenHeroFinalScore.value
    })

    expect(fjormScores[0]).toBeGreaterThan(0)
    expect(fjormScores).toEqual([
      fjormScores[0],
      fjormScores[1],
      fjormScores[2],
    ])
  })
})
