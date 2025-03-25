import type { IUnitInstance } from '~/utils/types/units'
import type { IV } from '~/utils/types/IVs'
import { getEmptyUnitInstance } from '~/utils/types/units'

export const HIDING_REASON_GENERIC_SUMMON = 'REGULAR_SUMMON'
export const HIDING_REASON_GRAND_HERO_BATTLE = 'GRAND_HERO_BATTLE'
export const HIDING_REASON_TEMPEST_TRIALS = 'TEMPEST_TRIALS'
export const HIDING_REASON_BAD_UNIT = 'BAD_UNIT'
export const HIDING_REASON_GOT_IT = 'GOT_IT'
export const HIDING_REASON_NO_SKILL_X = 'NO_SKILL_X'
export const HIDING_REASON_BAD_SKILL = 'BAD_SKILL'
export const HIDING_REASON_MALE = 'MALE'
export const HIDING_REASON_FEMALE = 'FEMALE'
export const HIDING_REASON_NOT_CUTE_ENOUGH = 'NOT_CUTE_ENOUGH'
export const HIDING_REASON_NOT_GOOD_ENOUGH = 'NOT_GOOD_ENOUGH'
export const HIDING_REASON_NOT_REDEEMABLE = 'NOT_AVAILABLE'

export const HIDING_REASONS = [
  HIDING_REASON_GENERIC_SUMMON,
  HIDING_REASON_GRAND_HERO_BATTLE,
  HIDING_REASON_TEMPEST_TRIALS,
  HIDING_REASON_BAD_UNIT,
  HIDING_REASON_GOT_IT,
  HIDING_REASON_NO_SKILL_X,
  HIDING_REASON_BAD_SKILL,
  HIDING_REASON_MALE,
  HIDING_REASON_FEMALE,
  HIDING_REASON_NOT_CUTE_ENOUGH,
  HIDING_REASON_NOT_GOOD_ENOUGH,
  HIDING_REASON_NOT_REDEEMABLE,
]
export const HidingReasons = {
  HIDING_REASON_GENERIC_SUMMON,
  HIDING_REASON_GRAND_HERO_BATTLE,
  HIDING_REASON_TEMPEST_TRIALS,
  HIDING_REASON_BAD_UNIT,
  HIDING_REASON_GOT_IT,
  HIDING_REASON_NO_SKILL_X,
  HIDING_REASON_BAD_SKILL,
  HIDING_REASON_MALE,
  HIDING_REASON_FEMALE,
  HIDING_REASON_NOT_CUTE_ENOUGH,
  HIDING_REASON_NOT_GOOD_ENOUGH,
  HIDING_REASON_NOT_REDEEMABLE,
}

type ValueOf<T> = T[keyof T]
export type HidingReason = ValueOf<typeof HidingReasons>

export interface UnitInBindingWorlds extends IUnitInstance {
  enclosure: null | number
  rating: null | string
  hidingReason: null | HidingReason
  notes: null | string

  boon: null | IV
  boonAscended: null | IV
  bane: null | IV
  dragonflowers: null | number
}

export function getEmptyUnitInstanceInBindingWorlds(): UnitInBindingWorlds {
  return {
    ...getEmptyUnitInstance(),

    enclosure: null,
    rating: null,
    hidingReason: null,
    notes: null,

    boon: null,
    boonAscended: null,
    bane: null,
    dragonflowers: null,
  }
}
