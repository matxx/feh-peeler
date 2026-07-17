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
import { describe, expect, it, beforeAll, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import useUnitScore from '~/composables/useUnitScore'
import useScoreContext from '~/composables/useScoreContext'
import {
  decodeTeamInScoreCalc,
  TEAM_BASE_SCORE,
} from '~/utils/types/score-calc'
import {
  ELEMENT_FIRE,
  ELEMENT_WATER,
  ELEMENT_EARTH,
  type ElementLegendary,
} from '~/utils/types/units-filters'
import { mean } from '~/utils/functions/math'

import {
  fetchProdDataSnapshot,
  loadProdDataStores,
} from '../support/loadProdData'

beforeAll(async () => {
  await fetchProdDataSnapshot()
})

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
  expectedVisibleFinalScores: [582, 670, 686, 736],
  expectedTeamFinalScore: 668,
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

// Covers the fix for attached chosen hero scoring: the unit's own score and
// the attached chosen hero's score must be compared *without* the blessing
// bonus, and the blessing bonus added only afterward, on top of whichever of
// the two wins. Base team (Anna, Garcia, L!Claude, Gromel), no chosen hero
// attached yet.
const TEAM_ANNA_BASE: TeamCase = {
  name: 'chosen hero blessing bonus: base team, no chosen hero attached',
  code: 'SCTv1:W3siaWQiOiJQSURf44Ki44Oz44OKIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjoic3BkIiwiYmFuZSI6InJlcyIsImJsZXNzaW5nIjoiTGlnaHQiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgqzjg6vjgrfjgqIiLCJza2lsbElkcyI6eyJ3ZWFwb24iOiJTSURf5oSb44Gu56Wt44Gu5pan77yLIiwiYXNzaXN0IjoiU0lEX+W8leOBjeaIu+OBl+ODu+atqeazlSIsInNwZWNpYWwiOiJTSURf6KeS6YCQIiwicGFzc2l2ZWEiOiJTSURf5r+B5rWB44Gu5LiA5pKDIiwicGFzc2l2ZWIiOiJTSURf5b6M44Gu5YWIIiwicGFzc2l2ZWMiOiJTSURf5pS75pKD6YCf44GV44Gu5L+h5b+1Iiwic2FjcmVkc2VhbCI6IlNTSURf5LiN5YuV44Gu5ae/5YuiMyJ9LCJza2lsbFNQcyI6eyJ3ZWFwb24iOjM1MCwiYXNzaXN0Ijo0MDAsInNwZWNpYWwiOjUwMCwicGFzc2l2ZWEiOjMwMCwicGFzc2l2ZWIiOjQwMCwicGFzc2l2ZWMiOjMwMCwic2FjcmVkc2VhbCI6MjAwLCJwYXNzaXZleCI6MH0sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjEwLCJib29uIjpudWxsLCJiYW5lIjpudWxsLCJibGVzc2luZyI6IkVhcnRoIiwiY2hvc2VuSGVyb0lkIjpudWxsLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+S8neaJv+OCr+ODreODvOODiSIsInNraWxsSWRzIjp7IndlYXBvbiI6IlNJRF/jg5XjgqfjgqTjg6vjg47jg7zjg4hf5LiAIiwiYXNzaXN0IjoiU0lEX+mAn+OBleWuiOWCmeOBruW/nOaPtO+8iyIsInNwZWNpYWwiOiJTSURf5puy5bCEIiwicGFzc2l2ZWEiOiJTSURf6ay856We6aOb54eV44Gu54KO5pKDMyIsInBhc3NpdmViIjoiU0lEX+iQveaYn+ODu+aJvyIsInBhc3NpdmVjIjoiU0lEX+S4jeayu+OBruW5u+eFmTQiLCJzYWNyZWRzZWFsIjoiU1NJRF/ov5Hlj43jg7vlvJPmmpflsILnlKgifSwic2tpbGxTUHMiOnsid2VhcG9uIjo0MDAsImFzc2lzdCI6NDAwLCJzcGVjaWFsIjo1MDAsInBhc3NpdmVhIjozMDAsInBhc3NpdmViIjozMDAsInBhc3NpdmVjIjozMDAsInNhY3JlZHNlYWwiOjMwMCwicGFzc2l2ZXgiOjB9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjoxMCwiYm9vbiI6InNwZCIsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiRWFydGgiLCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9LHsiaWQiOiJQSURf44Kw44Ot44O844Oh44OrIiwic2tpbGxJZHMiOnsid2VhcG9uIjoiU0lEX+ODnOODq+ODiOOCouOCr+OCuSIsImFzc2lzdCI6IlNJRF/mlLvmkoPlrojlgpnjga7lv5zmj7TvvIsiLCJzcGVjaWFsIjoiU0lEX+inkumAkCIsInBhc3NpdmVhIjoiU0lEX+msvOelnumjm+eHleOBrueCjuaSgzMiLCJwYXNzaXZlYiI6IlNJRF/lpKnoiJ7jgYTnq4vjgaQiLCJwYXNzaXZlYyI6IlNJRF/mlLvmkoPpgJ/jgZXjga7kv6Hnvqk0Iiwic2FjcmVkc2VhbCI6IlNTSURf6YGg5Y+N44O75Ymj5qeN5pan5bCC55SoIn0sInNraWxsU1BzIjp7IndlYXBvbiI6NDAwLCJhc3Npc3QiOjQwMCwic3BlY2lhbCI6NTAwLCJwYXNzaXZlYSI6MzAwLCJwYXNzaXZlYiI6NDAwLCJwYXNzaXZlYyI6MzAwLCJzYWNyZWRzZWFsIjozMDAsInBhc3NpdmV4IjowfSwibGV2ZWwiOjQwLCJyYXJpdHkiOjUsIm1lcmdlcyI6MTAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiRWFydGgiLCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9XQ==',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER, ELEMENT_EARTH],
  },
  expectedVisibleFinalScores: [658, 774, 760, 776],
  expectedTeamFinalScore: 742,
}

// Same team, C!Fjorm attached to Anna as chosen hero (not yet blessed).
const TEAM_ANNA_WITH_CHOSEN_HERO: TeamCase = {
  name: 'chosen hero blessing bonus: C!Fjorm attached to Anna',
  code: 'SCTv1:W3siaWQiOiJQSURf44Ki44Oz44OKIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjoic3BkIiwiYmFuZSI6InJlcyIsImJsZXNzaW5nIjoiTGlnaHQiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6IlBJRF/mlZHkuJbjg5XjgqPjg6jjg6vjg6AiLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+OCrOODq+OCt+OCoiIsInNraWxsSWRzIjp7IndlYXBvbiI6IlNJRF/mhJvjga7npa3jga7mlqfvvIsiLCJhc3Npc3QiOiJTSURf5byV44GN5oi744GX44O75q2p5rOVIiwic3BlY2lhbCI6IlNJRF/op5LpgJAiLCJwYXNzaXZlYSI6IlNJRF/mv4HmtYHjga7kuIDmkoMiLCJwYXNzaXZlYiI6IlNJRF/lvozjga7lhYgiLCJwYXNzaXZlYyI6IlNJRF/mlLvmkoPpgJ/jgZXjga7kv6Hlv7UiLCJzYWNyZWRzZWFsIjoiU1NJRF/kuI3li5Xjga7lp7/li6IzIn0sInNraWxsU1BzIjp7IndlYXBvbiI6MzUwLCJhc3Npc3QiOjQwMCwic3BlY2lhbCI6NTAwLCJwYXNzaXZlYSI6MzAwLCJwYXNzaXZlYiI6NDAwLCJwYXNzaXZlYyI6MzAwLCJzYWNyZWRzZWFsIjoyMDAsInBhc3NpdmV4IjowfSwibGV2ZWwiOjQwLCJyYXJpdHkiOjUsIm1lcmdlcyI6MTAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiRWFydGgiLCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9LHsiaWQiOiJQSURf5Lyd5om/44Kv44Ot44O844OJIiwic2tpbGxJZHMiOnsid2VhcG9uIjoiU0lEX+ODleOCp+OCpOODq+ODjuODvOODiF/kuIAiLCJhc3Npc3QiOiJTSURf6YCf44GV5a6I5YKZ44Gu5b+c5o+077yLIiwic3BlY2lhbCI6IlNJRF/mm7LlsIQiLCJwYXNzaXZlYSI6IlNJRF/prLznpZ7po5vnh5Xjga7ngo7mkoMzIiwicGFzc2l2ZWIiOiJTSURf6JC95pif44O75om/IiwicGFzc2l2ZWMiOiJTSURf5LiN5rK744Gu5bm754WZNCIsInNhY3JlZHNlYWwiOiJTU0lEX+i/keWPjeODu+W8k+aal+WwgueUqCJ9LCJza2lsbFNQcyI6eyJ3ZWFwb24iOjQwMCwiYXNzaXN0Ijo0MDAsInNwZWNpYWwiOjUwMCwicGFzc2l2ZWEiOjMwMCwicGFzc2l2ZWIiOjMwMCwicGFzc2l2ZWMiOjMwMCwic2FjcmVkc2VhbCI6MzAwLCJwYXNzaXZleCI6MH0sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjEwLCJib29uIjoic3BkIiwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOiJFYXJ0aCIsImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgrDjg63jg7zjg6Hjg6siLCJza2lsbElkcyI6eyJ3ZWFwb24iOiJTSURf44Oc44Or44OI44Ki44Kv44K5IiwiYXNzaXN0IjoiU0lEX+aUu+aSg+WuiOWCmeOBruW/nOaPtO+8iyIsInNwZWNpYWwiOiJTSURf6KeS6YCQIiwicGFzc2l2ZWEiOiJTSURf6ay856We6aOb54eV44Gu54KO5pKDMyIsInBhc3NpdmViIjoiU0lEX+WkqeiInuOBhOeri+OBpCIsInBhc3NpdmVjIjoiU0lEX+aUu+aSg+mAn+OBleOBruS/oee+qTQiLCJzYWNyZWRzZWFsIjoiU1NJRF/pgaDlj43jg7vliaPmp43mlqflsILnlKgifSwic2tpbGxTUHMiOnsid2VhcG9uIjo0MDAsImFzc2lzdCI6NDAwLCJzcGVjaWFsIjo1MDAsInBhc3NpdmVhIjozMDAsInBhc3NpdmViIjo0MDAsInBhc3NpdmVjIjozMDAsInNhY3JlZHNlYWwiOjMwMCwicGFzc2l2ZXgiOjB9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjoxMCwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOiJFYXJ0aCIsImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH1d',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER, ELEMENT_EARTH],
  },
  expectedVisibleFinalScores: [736, 774, 760, 776],
  expectedTeamFinalScore: 760,
}

// Same team, Anna now also blessed with Earth (in addition to C!Fjorm
// attached).
const TEAM_ANNA_WITH_CHOSEN_HERO_AND_BLESSING: TeamCase = {
  name: 'chosen hero blessing bonus: C!Fjorm attached to Anna, Anna blessed Earth',
  code: 'SCTv1:W3siaWQiOiJQSURf44Ki44Oz44OKIiwic2tpbGxJZHMiOnt9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjowLCJib29uIjoic3BkIiwiYmFuZSI6InJlcyIsImJsZXNzaW5nIjoiRWFydGgiLCJza2lsbFNQcyI6e30sImNob3Nlbkhlcm9JZCI6IlBJRF/mlZHkuJbjg5XjgqPjg6jjg6vjg6AiLCJjaG9zZW5IZXJvTWVyZ2VzIjowfSx7ImlkIjoiUElEX+OCrOODq+OCt+OCoiIsInNraWxsSWRzIjp7IndlYXBvbiI6IlNJRF/mhJvjga7npa3jga7mlqfvvIsiLCJhc3Npc3QiOiJTSURf5byV44GN5oi744GX44O75q2p5rOVIiwic3BlY2lhbCI6IlNJRF/op5LpgJAiLCJwYXNzaXZlYSI6IlNJRF/mv4HmtYHjga7kuIDmkoMiLCJwYXNzaXZlYiI6IlNJRF/lvozjga7lhYgiLCJwYXNzaXZlYyI6IlNJRF/mlLvmkoPpgJ/jgZXjga7kv6Hlv7UiLCJzYWNyZWRzZWFsIjoiU1NJRF/kuI3li5Xjga7lp7/li6IzIn0sInNraWxsU1BzIjp7IndlYXBvbiI6MzUwLCJhc3Npc3QiOjQwMCwic3BlY2lhbCI6NTAwLCJwYXNzaXZlYSI6MzAwLCJwYXNzaXZlYiI6NDAwLCJwYXNzaXZlYyI6MzAwLCJzYWNyZWRzZWFsIjoyMDAsInBhc3NpdmV4IjowfSwibGV2ZWwiOjQwLCJyYXJpdHkiOjUsIm1lcmdlcyI6MTAsImJvb24iOm51bGwsImJhbmUiOm51bGwsImJsZXNzaW5nIjoiRWFydGgiLCJjaG9zZW5IZXJvSWQiOm51bGwsImNob3Nlbkhlcm9NZXJnZXMiOjB9LHsiaWQiOiJQSURf5Lyd5om/44Kv44Ot44O844OJIiwic2tpbGxJZHMiOnsid2VhcG9uIjoiU0lEX+ODleOCp+OCpOODq+ODjuODvOODiF/kuIAiLCJhc3Npc3QiOiJTSURf6YCf44GV5a6I5YKZ44Gu5b+c5o+077yLIiwic3BlY2lhbCI6IlNJRF/mm7LlsIQiLCJwYXNzaXZlYSI6IlNJRF/prLznpZ7po5vnh5Xjga7ngo7mkoMzIiwicGFzc2l2ZWIiOiJTSURf6JC95pif44O75om/IiwicGFzc2l2ZWMiOiJTSURf5LiN5rK744Gu5bm754WZNCIsInNhY3JlZHNlYWwiOiJTU0lEX+i/keWPjeODu+W8k+aal+WwgueUqCJ9LCJza2lsbFNQcyI6eyJ3ZWFwb24iOjQwMCwiYXNzaXN0Ijo0MDAsInNwZWNpYWwiOjUwMCwicGFzc2l2ZWEiOjMwMCwicGFzc2l2ZWIiOjMwMCwicGFzc2l2ZWMiOjMwMCwic2FjcmVkc2VhbCI6MzAwLCJwYXNzaXZleCI6MH0sImxldmVsIjo0MCwicmFyaXR5Ijo1LCJtZXJnZXMiOjEwLCJib29uIjoic3BkIiwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOiJFYXJ0aCIsImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH0seyJpZCI6IlBJRF/jgrDjg63jg7zjg6Hjg6siLCJza2lsbElkcyI6eyJ3ZWFwb24iOiJTSURf44Oc44Or44OI44Ki44Kv44K5IiwiYXNzaXN0IjoiU0lEX+aUu+aSg+WuiOWCmeOBruW/nOaPtO+8iyIsInNwZWNpYWwiOiJTSURf6KeS6YCQIiwicGFzc2l2ZWEiOiJTSURf6ay856We6aOb54eV44Gu54KO5pKDMyIsInBhc3NpdmViIjoiU0lEX+WkqeiInuOBhOeri+OBpCIsInBhc3NpdmVjIjoiU0lEX+aUu+aSg+mAn+OBleOBruS/oee+qTQiLCJzYWNyZWRzZWFsIjoiU1NJRF/pgaDlj43jg7vliaPmp43mlqflsILnlKgifSwic2tpbGxTUHMiOnsid2VhcG9uIjo0MDAsImFzc2lzdCI6NDAwLCJzcGVjaWFsIjo1MDAsInBhc3NpdmVhIjozMDAsInBhc3NpdmViIjo0MDAsInBhc3NpdmVjIjozMDAsInNhY3JlZHNlYWwiOjMwMCwicGFzc2l2ZXgiOjB9LCJsZXZlbCI6NDAsInJhcml0eSI6NSwibWVyZ2VzIjoxMCwiYm9vbiI6bnVsbCwiYmFuZSI6bnVsbCwiYmxlc3NpbmciOiJFYXJ0aCIsImNob3Nlbkhlcm9JZCI6bnVsbCwiY2hvc2VuSGVyb01lcmdlcyI6MH1d',
  context: {
    hasBonusUnit: true,
    seasonElements: [ELEMENT_WATER, ELEMENT_EARTH],
  },
  expectedVisibleFinalScores: [744, 774, 760, 776],
  expectedTeamFinalScore: 762,
}

const TEAM_CASES: TeamCase[] = [
  TEAM_STANDARD,
  TEAM_BONUS_FACTOR,

  TEAM_BONUS_LEGENDARY_NO_OTHER_LEGENDARY,
  TEAM_BONUS_LEGENDARY_1_OTHER_LEGENDARY,
  TEAM_BONUS_LEGENDARY_2_OTHER_LEGENDARIES,

  TEAM_ANNA_BASE,
  TEAM_ANNA_WITH_CHOSEN_HERO,
  TEAM_ANNA_WITH_CHOSEN_HERO_AND_BLESSING,
]

describe('useUnitScore', () => {
  it.each(TEAM_CASES)(
    'computes the expected visibleFinalScore for: $name',
    ({ code, context, expectedVisibleFinalScores, expectedTeamFinalScore }) => {
      const units = decodeTeamInScoreCalc(code)
      const scoreContext = useScoreContext(
        ref(units),
        ref(context.hasBonusUnit),
        ref(context.seasonElements),
      )

      const scores: number[] = []
      const baseScores: number[] = []
      for (const unitInstance of units) {
        const { visibleFinalScore, visibleBaseScore } = useUnitScore(
          ref(unitInstance),
          scoreContext,
        )
        scores.push(visibleFinalScore.value)
        baseScores.push(visibleBaseScore.value)
      }

      expect(scores).toEqual(expectedVisibleFinalScores)

      // mirrors pages/score-calc.vue's actual team-score formula
      // (TEAM_BASE_SCORE + mean of visibleBaseScore, floored, then scaled by
      // bonusFactor) - NOT Math.floor(mean(visibleFinalScore)), which can
      // diverge from it by 1 whenever bonusFactor > 1 and the average base
      // score has a fractional part >= 0.5
      const teamScore =
        scoreContext.value.bonusFactor *
        Math.floor(TEAM_BASE_SCORE + mean(baseScores))
      expect(teamScore).toEqual(expectedTeamFinalScore)
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
