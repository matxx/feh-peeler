import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import type { Availability } from '@/utils/types/units-availabilities'
import type { IUnitStatMinMax } from '@/utils/types/units-stats'

export const TRAIT_AIDED = 'is_aided'
export const TRAIT_ASCENDED = 'is_ascended'
export const TRAIT_ATTUNED = 'is_attuned'
export const TRAIT_EMBLEM = 'is_emblem'
export const TRAIT_REARMED = 'is_rearmed'
export const TRAIT_LEGENDARY = 'is_legendary'
export const TRAIT_MYTHIC = 'is_mythic'
export const TRAIT_DUO = 'is_duo'
export const TRAIT_HARMONIZED = 'is_harmonized'

export type Trait =
  | typeof TRAIT_AIDED
  | typeof TRAIT_ASCENDED
  | typeof TRAIT_ATTUNED
  | typeof TRAIT_EMBLEM
  | typeof TRAIT_REARMED
  | typeof TRAIT_LEGENDARY
  | typeof TRAIT_MYTHIC
  | typeof TRAIT_DUO
  | typeof TRAIT_HARMONIZED

export interface IFilters {
  name: string | null

  weapons: Set<ExtendedWeaponType>
  moves: Set<MoveType>
  traits: Set<Trait>

  availabilities: Set<Availability>

  isRefresher: boolean | null
  hasResplendent: boolean | null

  isBrave: boolean | null
  isFallen: boolean | null
  isStory: boolean | null
  isTT: boolean | null
  isGHB: boolean | null

  hasPrfWeapon: boolean | null
  hasPrfSkill: boolean | null

  stats: IUnitStatMinMax
}

export const createFilters = (stats: IUnitStatMinMax): IFilters => ({
  name: null,

  weapons: new Set(),
  moves: new Set(),
  traits: new Set(),
  availabilities: new Set(),

  isRefresher: null,
  hasResplendent: null,

  isBrave: null,
  isFallen: null,
  isStory: null,
  isTT: null,
  isGHB: null,

  hasPrfWeapon: null,
  hasPrfSkill: null,

  stats,
})
