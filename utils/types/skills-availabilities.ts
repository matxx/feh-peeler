import type {
  IDivineCodeNormal,
  IDivineCodeLimited,
} from '~/utils/types/divine-codes'
import type { SkillId } from '~/utils/types/skills'
import type { UnitId } from '~/utils/types/units'

import {
  type FODDER_LOWEST_RARITY_WHEN_OBTAINED,
  type FODDER_LOWEST_RARITY_FOR_INHERITANCE,
  type GENERIC_SUMMON_POOL,
  type SPECIAL_SUMMON_POOL,
  type HEROIC_GRAILS,
  type NORMAL_DIVINE_CODES,
  type LIMITED_DIVINE_CODES,
  type FOCUS_ONLY,
  AV_GENERIC_POOL_34,
  AV_HEROIC_GRAILS,
  AV_DIVINE_CODES,
  AV_SPECIAL_POOL_4,
  AV_GENERIC_POOL_45,
  AV_SPECIAL_POOL_45,
} from '~/utils/types/obfuscated-keys'

export type Availability =
  | typeof AV_GENERIC_POOL_34
  | typeof AV_HEROIC_GRAILS
  | typeof AV_DIVINE_CODES
  | typeof AV_SPECIAL_POOL_4
  | typeof AV_GENERIC_POOL_45
  | typeof AV_SPECIAL_POOL_45

export const AVAILABILITIES: Availability[] = [
  AV_GENERIC_POOL_34,
  AV_HEROIC_GRAILS,
  AV_DIVINE_CODES,
  AV_SPECIAL_POOL_4,
  AV_GENERIC_POOL_45,
  AV_SPECIAL_POOL_45,
]

export interface ISkillAvailability {
  id: SkillId

  fodder: { [key in Availability]: number }
  fodder_ids: UnitId[]

  is_in: {
    [GENERIC_SUMMON_POOL]: boolean
    [SPECIAL_SUMMON_POOL]: boolean
    [HEROIC_GRAILS]: boolean
    [NORMAL_DIVINE_CODES]: boolean
    [LIMITED_DIVINE_CODES]: boolean
    [FOCUS_ONLY]: boolean
  }
  [FODDER_LOWEST_RARITY_WHEN_OBTAINED]: {
    [GENERIC_SUMMON_POOL]?: number
    [SPECIAL_SUMMON_POOL]?: number
    [HEROIC_GRAILS]?: number
    [NORMAL_DIVINE_CODES]?: number
    [LIMITED_DIVINE_CODES]?: number
    [FOCUS_ONLY]?: number
  }
  [FODDER_LOWEST_RARITY_FOR_INHERITANCE]: {
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
}

export type ISkillAvailabilityById = {
  [index: SkillId]: ISkillAvailability
}
