import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import type { AV_Availability } from '@/utils/types/units-availabilities'
import { BST, HP, ATK, SPD, DEF, RES } from '@/utils/types/units-stats'
import type { IConstants } from '~/utils/types/constants'

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

  // TODO: use availabilities from `~/utils/types/skills-availabilities.ts` ?
  // (currently using `~/utils/types/units-availabilities.ts`)
  availabilities: Set<AV_Availability>

  isRefresher: boolean | null
  hasResplendent: boolean | null
  isBrave: boolean | null
  hasPrfWeapon: boolean | null
  hasPrfSkill: boolean | null

  stats: {
    [HP]: [number, number]
    [ATK]: [number, number]
    [SPD]: [number, number]
    [DEF]: [number, number]
    [RES]: [number, number]
    [BST]: [number, number]
  }
}

export const createFilters = (constants?: IConstants) =>
  ({
    name: null,

    weapons: new Set(),
    moves: new Set(),
    traits: new Set(),
    availabilities: new Set(),

    isRefresher: null,
    hasResplendent: null,
    isBrave: null,
    hasPrfWeapon: null,
    hasPrfSkill: null,

    stats: {
      [HP]: [0, constants ? constants.units_max_hp : 60],
      [ATK]: [0, constants ? constants.units_max_atk : 50],
      [SPD]: [0, constants ? constants.units_max_spd : 48],
      [DEF]: [0, constants ? constants.units_max_def : 50],
      [RES]: [0, constants ? constants.units_max_res : 50],
      [BST]: [0, constants ? constants.units_max_bst : 212],
    },
  }) as IFilters
