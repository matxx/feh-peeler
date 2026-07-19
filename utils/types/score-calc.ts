import { base64ToJson, jsonToBase64 } from '~/utils/functions/base64'
import { objectFromEntries, type IndexedBy } from '~/utils/functions/typeSafe'
import { SKILL_CATEGORIES, type SkillCategory } from '~/utils/types/skills'
import {
  getEmptyUnitInstance,
  type IUnitInstance,
  type UnitId,
} from '~/utils/types/units'
import type {
  Element,
  ElementLegendary,
  ElementMythic,
} from '~/utils/types/elements'
import type { Stat } from '~/utils/types/units-stats'
import { WEAPON_R, WEAPON_B, WEAPON_G, WEAPON_C } from '~/utils/types/weapons'
import { MOVE_I, MOVE_C, MOVE_F } from '~/utils/types/moves'

export const MAX_RARITY = 5
export const MAX_LEVEL = 40
export const MAX_MERGES = 10

export const GROWTH_RATE_DIFF = 5

export interface IUnitInstanceInScoreCalcV1 extends IUnitInstance {
  rarity: number
  level: number
  merges: number
  boon: null | Stat
  bane: null | Stat
  blessing: null | Element

  skillSPs: IndexedBy<SkillCategory, number | undefined>
}
export interface IUnitInstanceInScoreCalcV2 extends IUnitInstanceInScoreCalcV1 {
  chosenHeroId: null | UnitId
  chosenHeroMerges: number
}
export type IUnitInstanceInScoreCalc = IUnitInstanceInScoreCalcV2

export interface ScoreContext {
  bonusFactor: number
  seasonElements: Element[]
  legendaryCounts: IndexedBy<ElementLegendary, number>
  mjolnirStrike: {
    isActive: boolean
    minor: ElementMythic | null
    major: ElementMythic | null
  }
}

export type EditableKey =
  | 'id'
  | 'rarity'
  | 'level'
  | 'merges'
  | 'boon'
  | 'bane'
  | 'blessing'
  | 'chosenHeroId'
  | 'chosenHeroMerges'

export type TeamInScoreCalc = [
  IUnitInstanceInScoreCalc,
  IUnitInstanceInScoreCalc,
  IUnitInstanceInScoreCalc,
  IUnitInstanceInScoreCalc,
]

export function getEmptyTeamInScoreCalc(): TeamInScoreCalc {
  return [
    getEmptyUnitInstanceInScoreCalc(),
    getEmptyUnitInstanceInScoreCalc(),
    getEmptyUnitInstanceInScoreCalc(),
    getEmptyUnitInstanceInScoreCalc(),
  ]
}

export function getEmptyUnitInstanceSkillSPs(): IndexedBy<
  SkillCategory,
  number | undefined
> {
  return objectFromEntries(SKILL_CATEGORIES.map((cat) => [cat, undefined]))
}

export function getEmptyUnitInstanceInScoreCalc(): IUnitInstanceInScoreCalc {
  return {
    ...getEmptyUnitInstance(),

    level: MAX_LEVEL,
    rarity: MAX_RARITY,
    merges: 0,
    boon: null,
    bane: null,
    blessing: null,

    skillSPs: getEmptyUnitInstanceSkillSPs(),

    chosenHeroId: null,
    chosenHeroMerges: 0,
  }
}

// save/load codes for a single unit ("SCU" = Score Calc Unit) or a full team ("SCT" = Score Calc Team)

export const SCU_CODE_PREFIX = 'SCUv1:'
export const SCT_CODE_PREFIX = 'SCTv1:'

export type ScoreCalcCodeErrorReason =
  'expectedUnitGotTeam' | 'expectedTeamGotUnit' | 'invalidCode'

export class ScoreCalcCodeError extends Error {
  reason: ScoreCalcCodeErrorReason

  constructor(reason: ScoreCalcCodeErrorReason) {
    super(reason)
    this.reason = reason
  }
}

export function encodeUnitInstanceInScoreCalc(
  unitInstance: IUnitInstanceInScoreCalc,
): string {
  return `${SCU_CODE_PREFIX}${jsonToBase64(unitInstance)}`
}

export function decodeUnitInstanceInScoreCalc(
  code: string,
): IUnitInstanceInScoreCalc {
  if (code.startsWith(SCT_CODE_PREFIX)) {
    throw new ScoreCalcCodeError('expectedUnitGotTeam')
  }
  if (!code.startsWith(SCU_CODE_PREFIX)) {
    throw new ScoreCalcCodeError('invalidCode')
  }

  try {
    return base64ToJson<IUnitInstanceInScoreCalc>(
      code.slice(SCU_CODE_PREFIX.length),
    )
  } catch {
    throw new ScoreCalcCodeError('invalidCode')
  }
}

export function encodeTeamInScoreCalc(
  units: IUnitInstanceInScoreCalc[],
): string {
  return `${SCT_CODE_PREFIX}${jsonToBase64(units)}`
}

export function decodeTeamInScoreCalc(
  code: string,
): IUnitInstanceInScoreCalc[] {
  if (code.startsWith(SCU_CODE_PREFIX)) {
    throw new ScoreCalcCodeError('expectedTeamGotUnit')
  }
  if (!code.startsWith(SCT_CODE_PREFIX)) {
    throw new ScoreCalcCodeError('invalidCode')
  }

  try {
    const units = base64ToJson<IUnitInstanceInScoreCalc[]>(
      code.slice(SCT_CODE_PREFIX.length),
    )
    if (!Array.isArray(units) || units.length !== 4) {
      throw new ScoreCalcCodeError('invalidCode')
    }
    return units
  } catch (e) {
    if (e instanceof ScoreCalcCodeError) throw e
    throw new ScoreCalcCodeError('invalidCode')
  }
}

// https://imgur.com/NycQzxt
export const TEAM_BASE_SCORE = 150
export const OFFENSE_SCORE_DIFF_MIN = -1
export const OFFENSE_SCORE_DIFF_MAX = 6
export const SCORE_RARITY_CONSTANTS = [
  {
    baseValue: 47,
    levelFactor: 68 / 39,
  },
  {
    baseValue: 49,
    levelFactor: 73 / 39,
  },
  {
    baseValue: 51,
    levelFactor: 79 / 39,
  },
  {
    baseValue: 53,
    levelFactor: 84 / 39,
  },
  {
    baseValue: 55,
    levelFactor: 91 / 39,
  },
]

export const DUEL_SKILL_SCORES = [160, 165, 170]
export const DUEL_SKILL_SCORES_TIER4 = { min: 175, max: 180 }
export const DUEL_SKILL_IDS_BY_MOVE_BY_COLOR = {
  [WEAPON_R]: {
    [MOVE_I]: [
      // R Duel Infantry
      'SID_赤の死闘・歩行1',
      'SID_赤の死闘・歩行2',
      'SID_赤の死闘・歩行3',
      'SID_赤の死闘・歩行4',
    ],
    [MOVE_C]: [
      // R Duel Cavalry
      'SID_赤の死闘・騎馬1',
      'SID_赤の死闘・騎馬2',
      'SID_赤の死闘・騎馬3',
      'SID_赤の死闘・騎馬4',
    ],
    [MOVE_F]: [
      // R Duel Flying
      'SID_赤の死闘・飛行1',
      'SID_赤の死闘・飛行2',
      'SID_赤の死闘・飛行3',
      'SID_赤の死闘・飛行4',
    ],
  },
  [WEAPON_B]: {
    [MOVE_I]: [
      // B Duel Infantry
      'SID_青の死闘・歩行1',
      'SID_青の死闘・歩行2',
      'SID_青の死闘・歩行3',
      'SID_青の死闘・歩行4',
    ],
    [MOVE_C]: [
      // B Duel Cavalry
      'SID_青の死闘・騎馬1',
      'SID_青の死闘・騎馬2',
      'SID_青の死闘・騎馬3',
      'SID_青の死闘・騎馬4',
    ],
    [MOVE_F]: [
      // B Duel Flying
      'SID_青の死闘・飛行1',
      'SID_青の死闘・飛行2',
      'SID_青の死闘・飛行3',
      'SID_青の死闘・飛行4',
    ],
  },
  [WEAPON_G]: {
    [MOVE_I]: [
      // G Duel Infantry
      'SID_緑の死闘・歩行1',
      'SID_緑の死闘・歩行2',
      'SID_緑の死闘・歩行3',
      'SID_緑の死闘・歩行4',
    ],
    [MOVE_C]: [
      // G Duel Cavalry
      'SID_緑の死闘・騎馬1',
      'SID_緑の死闘・騎馬2',
      'SID_緑の死闘・騎馬3',
      'SID_緑の死闘・騎馬4',
    ],
    [MOVE_F]: [
      // G Duel Flying
      'SID_緑の死闘・飛行1',
      'SID_緑の死闘・飛行2',
      'SID_緑の死闘・飛行3',
      'SID_緑の死闘・飛行4',
    ],
  },
  [WEAPON_C]: {
    [MOVE_I]: [
      // C Duel Infantry
      'SID_無の死闘・歩行1',
      'SID_無の死闘・歩行2',
      'SID_無の死闘・歩行3',
      'SID_無の死闘・歩行4',
    ],
    [MOVE_C]: [
      // C Duel Cavalry
      'SID_無の死闘・騎馬1',
      'SID_無の死闘・騎馬2',
      'SID_無の死闘・騎馬3',
      'SID_無の死闘・騎馬4',
    ],
    [MOVE_F]: [
      // C Duel Flying
      'SID_無の死闘・飛行1',
      'SID_無の死闘・飛行2',
      'SID_無の死闘・飛行3',
      'SID_無の死闘・飛行4',
    ],
  },
}

export const DUEL_SKILL_IDS = Object.values(DUEL_SKILL_IDS_BY_MOVE_BY_COLOR)
  .map((value) => Object.values(value))
  .flat(2)
