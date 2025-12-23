import { objectFromEntries } from '~/utils/functions/typeSafe'
import { SKILL_CATEGORIES, type TBySkillCategory } from '~/utils/types/skills'
import { getEmptyUnitInstance, type IUnitInstance } from '~/utils/types/units'
import type { Element } from '~/utils/types/units-filters'
import type { Stat } from '~/utils/types/units-stats'
import { WEAPON_R, WEAPON_B, WEAPON_G, WEAPON_C } from '~/utils/types/weapons'
import { MOVE_I, MOVE_C, MOVE_F } from '~/utils/types/moves'

export const MAX_RARITY = 5
export const MAX_LEVEL = 40
export const MAX_MERGES = 10

export const GROWTH_RATE_DIFF = 5

export interface IUnitInstanceInScoreCalc extends IUnitInstance {
  rarity: number
  level: number
  merges: number
  boon: null | Stat
  bane: null | Stat
  blessing: null | Element

  skillSPs: TBySkillCategory<number | undefined>
}

export type EditableKey =
  | 'id'
  | 'rarity'
  | 'level'
  | 'merges'
  | 'boon'
  | 'bane'
  | 'blessing'

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

export function getEmptyUnitInstanceSkillSPs(): TBySkillCategory<
  number | undefined
> {
  return objectFromEntries(SKILL_CATEGORIES.map((cat) => [cat, undefined]))
}

export function getEmptyUnitInstanceInScoreCalc(): IUnitInstanceInScoreCalc {
  return {
    ...getEmptyUnitInstance(),

    rarity: 5,
    level: 40,
    merges: 10,
    boon: null,
    bane: null,
    blessing: null,

    skillSPs: getEmptyUnitInstanceSkillSPs(),
  }
}

// https://imgur.com/NycQzxt
export const TEAM_BASE_SCORE = 150
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
    levelFactor: 7 / 3,
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

export const SEAL_ID_DC_MELEE = 'SID_遠反・剣槍斧専用'
export const SEAL_ID_DC_DRAGON = 'SID_遠反・竜専用'
export const SEAL_MAX_SP = 300
export const SEAL_OTHER_THAN_DC_MAX_SP = 240
