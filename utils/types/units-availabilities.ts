import sortBy from 'lodash-es/sortBy'

import type { UnitId } from '@/utils/types/units'
import type {
  IDivineCodeNormal,
  IDivineCodeLimited,
} from '@/utils/types/divine-codes'
import type { SkillId } from '@/utils/types/skills'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  type NORMAL_DIVINE_CODES,
  type LIMITED_DIVINE_CODES,
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

  divine_codes?: {
    normal?: IDivineCodeNormal[]
    limited?: IDivineCodeLimited[]
  }

  skill_ids: SkillId[]
}

export type AV_Availability = number & { __brand: 'AV_Availability' }

// NB : do not use 0, it causes problems in units scores filters
export const U_AV_SCORE_GENERIC_POOL_3_4 = 5 as AV_Availability
// export const U_AV_SCORE_HEROIC_GRAILS = 10 as AV_Availability
export const U_AV_SCORE_HEROIC_GRAILS_4 = 11 as AV_Availability
export const U_AV_SCORE_HEROIC_GRAILS_5 = 12 as AV_Availability
export const U_AV_SCORE_LIMITED_DIVINE_CODES = 20 as AV_Availability
export const U_AV_SCORE_NORMAL_DIVINE_CODES = 30 as AV_Availability
export const U_AV_SCORE_SPECIAL_POOL_4 = 40 as AV_Availability
export const U_AV_SCORE_GENERIC_POOL_45 = 50 as AV_Availability
export const U_AV_SCORE_SPECIAL_POOL_45 = 60 as AV_Availability
export const U_AV_SCORE_GENERIC_POOL_5 = 70 as AV_Availability
export const U_AV_SCORE_LIMITED_HEROES = 80 as AV_Availability
export const U_AV_SCORE_SPECIAL_POOL_5 = 90 as AV_Availability
export const U_AV_SCORE_INFINITY = 1000 as AV_Availability

export const AV_SCORES: AV_Availability[] = [
  U_AV_SCORE_GENERIC_POOL_3_4,
  // U_AV_SCORE_HEROIC_GRAILS,
  U_AV_SCORE_HEROIC_GRAILS_4,
  U_AV_SCORE_HEROIC_GRAILS_5,
  // U_AV_SCORE_LIMITED_DIVINE_CODES,
  // U_AV_SCORE_NORMAL_DIVINE_CODES,
  U_AV_SCORE_SPECIAL_POOL_4,
  U_AV_SCORE_GENERIC_POOL_45,
  U_AV_SCORE_SPECIAL_POOL_45,
  U_AV_SCORE_GENERIC_POOL_5,
  U_AV_SCORE_LIMITED_HEROES,
  U_AV_SCORE_SPECIAL_POOL_5,
]
export const SORTED_AV_SCORES: AV_Availability[] = sortBy(AV_SCORES)

export const U_AV_GENERIC_POOL_3_4 = 'GENERIC_POOL_3_4'
export const U_AV_GENERIC_POOL_45 = 'GENERIC_POOL_45'
export const U_AV_GENERIC_POOL_5 = 'GENERIC_POOL_5'
export const U_AV_SPECIAL_POOL_4 = 'SPECIAL_POOL_4'
export const U_AV_SPECIAL_POOL_45 = 'SPECIAL_POOL_45'
export const U_AV_SPECIAL_POOL_5 = 'SPECIAL_POOL_5'
export const U_AV_LIMITED_HEROES = 'LIMITED_HEROES'
// export const U_AV_HEROIC_GRAILS = 'HEROIC_GRAILS'
export const U_AV_HEROIC_GRAILS_4 = 'HEROIC_GRAILS_4'
export const U_AV_HEROIC_GRAILS_5 = 'HEROIC_GRAILS_5'
export const U_AV_LIMITED_DIVINE_CODES = 'LIMITED_DIVINE_CODES'
export const U_AV_NORMAL_DIVINE_CODES = 'NORMAL_DIVINE_CODES'
export const U_AV_OTHER = 'OTHER'

export type Availability =
  | typeof U_AV_GENERIC_POOL_3_4
  | typeof U_AV_GENERIC_POOL_45
  | typeof U_AV_GENERIC_POOL_5
  | typeof U_AV_SPECIAL_POOL_4
  | typeof U_AV_SPECIAL_POOL_45
  | typeof U_AV_SPECIAL_POOL_5
  | typeof U_AV_LIMITED_HEROES
  // | typeof U_AV_HEROIC_GRAILS
  | typeof U_AV_HEROIC_GRAILS_4
  | typeof U_AV_HEROIC_GRAILS_5
  | typeof U_AV_OTHER

export type AvailabilityExtended =
  | Availability
  | typeof U_AV_LIMITED_DIVINE_CODES
  | typeof U_AV_NORMAL_DIVINE_CODES

export const SORTED_AVAILABILITIES: Availability[] = [
  U_AV_GENERIC_POOL_3_4,
  U_AV_GENERIC_POOL_45,
  U_AV_GENERIC_POOL_5,
  U_AV_SPECIAL_POOL_4,
  U_AV_SPECIAL_POOL_45,
  U_AV_SPECIAL_POOL_5,
  U_AV_LIMITED_HEROES,
  // U_AV_HEROIC_GRAILS,
  U_AV_HEROIC_GRAILS_4,
  // U_AV_HEROIC_GRAILS_5,
  U_AV_OTHER,
]

export const AVAILABILITIES_FOR_FILTERS_LINE_1: Availability[] = [
  U_AV_GENERIC_POOL_3_4,
  // U_AV_HEROIC_GRAILS,
  U_AV_HEROIC_GRAILS_4,
  // U_AV_LIMITED_DIVINE_CODES,
  // U_AV_NORMAL_DIVINE_CODES,
  U_AV_SPECIAL_POOL_4,
  U_AV_HEROIC_GRAILS_5,
]

export const AVAILABILITIES_FOR_FILTERS_LINE_2: Availability[] = [
  U_AV_GENERIC_POOL_45,
  U_AV_SPECIAL_POOL_45,
  U_AV_GENERIC_POOL_5,
  U_AV_SPECIAL_POOL_5,
  U_AV_LIMITED_HEROES,
]

export const AVAILABILITIES_FOR_FILTERS = [
  AVAILABILITIES_FOR_FILTERS_LINE_1,
  AVAILABILITIES_FOR_FILTERS_LINE_2,
]

export function getAvailability(availability: IUnitAvailability): Availability {
  if (availability.is_in[GENERIC_SUMMON_POOL]) {
    switch (availability.lowest_rarity[GENERIC_SUMMON_POOL]) {
      case 3:
      case 4:
        return U_AV_GENERIC_POOL_3_4
      case 4.5:
        return U_AV_GENERIC_POOL_45
      case 5:
        return U_AV_GENERIC_POOL_5
    }
  }
  // "special pool" must appear before "HG"
  // (because of new TT units behing special pool heroes)
  if (availability.is_in[SPECIAL_SUMMON_POOL]) {
    switch (availability.lowest_rarity[SPECIAL_SUMMON_POOL]) {
      case 4:
        return U_AV_SPECIAL_POOL_4
      case 4.5:
        return U_AV_SPECIAL_POOL_45
      case 5:
        return U_AV_SPECIAL_POOL_5
    }
  }
  if (availability.is_in[HEROIC_GRAILS]) {
    switch (availability.lowest_rarity[HEROIC_GRAILS]) {
      case 4:
        return U_AV_HEROIC_GRAILS_4
      case 5:
        return U_AV_HEROIC_GRAILS_5
    }
    // return U_AV_HEROIC_GRAILS
  }
  if (availability.is_in[FOCUS_ONLY]) {
    return U_AV_LIMITED_HEROES
  }

  // if (availability.is_in[LIMITED_DIVINE_CODES]) {
  //   availabilities.push(U_AV_SCORE_LIMITED_DIVINE_CODES)
  // }
  // if (availability.is_in[NORMAL_DIVINE_CODES]) {
  //   availabilities.push(U_AV_SCORE_NORMAL_DIVINE_CODES)
  // }

  // if (ASKR_TRIO_IDS.includes(availability.id)) return
  // + new heroes not yet in the generic pool
  // throw new Error(`unknown availability for unit ID: ${availability.id}`)

  return U_AV_OTHER
}
