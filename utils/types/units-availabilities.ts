import sortBy from 'lodash-es/sortBy'

import type { UnitId } from '@/utils/types/units'
import type {
  IDivineCodeNormal,
  IDivineCodeLimited,
} from '@/utils/types/divine-codes'
import type { SkillId } from '@/utils/types/skills'
import type {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'

export interface IUnitAvailability {
  id: UnitId

  is_in: {
    [GENERIC_SUMMON_POOL]: boolean
    [SPECIAL_SUMMON_POOL]: boolean
    [HEROIC_GRAILS]: boolean
    [NORMAL_DIVINE_CODES]: boolean
    [LIMITED_DIVINE_CODES]: boolean
    [FOCUS_ONLY]: boolean
  }
  lowest_rarity: {
    [GENERIC_SUMMON_POOL]?: number
    [SPECIAL_SUMMON_POOL]?: number
    [HEROIC_GRAILS]?: number
    [NORMAL_DIVINE_CODES]?: number
    [LIMITED_DIVINE_CODES]?: number
    [FOCUS_ONLY]?: number
  }

  divine_codes: {
    normal?: IDivineCodeNormal[]
    limited?: IDivineCodeLimited[]
  }

  skill_ids: SkillId[]
}

export type IUnitAvailabilityById = {
  [index: SkillId]: IUnitAvailability
}

// MONKEY PATCH :
// do not use 0, it causes problems in units scores filters
export const AV_SCORE_GENERIC_POOL_3_4 = 5
export const AV_SCORE_HEROIC_GRAILS = 10
export const AV_SCORE_LIMITED_DIVINE_CODES = 20
export const AV_SCORE_NORMAL_DIVINE_CODES = 30
export const AV_SCORE_SPECIAL_POOL_4 = 40
export const AV_SCORE_GENERIC_POOL_45 = 50
export const AV_SCORE_SPECIAL_POOL_45 = 60
export const AV_SCORE_GENERIC_POOL_5 = 70
export const AV_SCORE_LIMITED_HEROES = 80
export const AV_SCORE_SPECIAL_POOL_5 = 90
export const AV_SCORE_INFINITY = 1000

export type AV_Availability = number

export const AV_SCORES = [
  AV_SCORE_GENERIC_POOL_3_4,
  AV_SCORE_HEROIC_GRAILS,
  // AV_SCORE_LIMITED_DIVINE_CODES,
  // AV_SCORE_NORMAL_DIVINE_CODES,
  AV_SCORE_SPECIAL_POOL_4,
  AV_SCORE_GENERIC_POOL_45,
  AV_SCORE_SPECIAL_POOL_45,
  AV_SCORE_GENERIC_POOL_5,
  AV_SCORE_LIMITED_HEROES,
  AV_SCORE_SPECIAL_POOL_5,
]
export const SORTED_AV_SCORES = sortBy(AV_SCORES)

export const SORTED_AV_SCORES_FOR_FILTERS_LINE_1 = sortBy([
  AV_SCORE_GENERIC_POOL_3_4,
  AV_SCORE_HEROIC_GRAILS,
  // AV_SCORE_LIMITED_DIVINE_CODES,
  // AV_SCORE_NORMAL_DIVINE_CODES,
  AV_SCORE_SPECIAL_POOL_4,
])

export const SORTED_AV_SCORES_FOR_FILTERS_LINE_2 = sortBy([
  AV_SCORE_GENERIC_POOL_45,
  AV_SCORE_SPECIAL_POOL_45,
  AV_SCORE_GENERIC_POOL_5,
  AV_SCORE_LIMITED_HEROES,
  AV_SCORE_SPECIAL_POOL_5,
])

export const SORTED_AV_SCORES_FOR_FILTERS = [
  SORTED_AV_SCORES_FOR_FILTERS_LINE_1,
  SORTED_AV_SCORES_FOR_FILTERS_LINE_2,
]
