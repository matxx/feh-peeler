import orderBy from 'lodash-es/orderBy'

import { SORTED_MOVE_TYPES_INDEXES } from '@/utils/types/moves'
import { SORTED_WEAPON_TYPES_INDEXES } from '@/utils/types/weapons'

import type { IUnit } from '@/utils/types/units'

import type { MoveType } from '@/utils/types/moves'
import type { ExtendedWeaponType } from '@/utils/types/weapons'

export const TRAIT_AIDED = 'is_aided'
export const TRAIT_ASCENDED = 'is_ascended'
export const TRAIT_ATTUNED = 'is_attuned'
export const TRAIT_EMBLEM = 'is_emblem'
export const TRAIT_REARMED = 'is_rearmed'

export type Trait =
  | typeof TRAIT_REARMED
  | typeof TRAIT_ATTUNED
  | typeof TRAIT_ASCENDED
  | typeof TRAIT_EMBLEM
  | typeof TRAIT_AIDED

export interface IFilters {
  name: string | null

  weapons: ExtendedWeaponType[]
  moves: MoveType[]
  traits: Trait[]

  // TODO: use availabilities from `~/utils/types/skills-availabilities.ts` ?
  // (currently using `~/utils/types/units-availabilities.ts`)
  availabilities: number[]

  isDuo: boolean
  isHarmonized: boolean

  isRefresher: boolean
}

export const createFilters = () => ({
  name: null,

  weapons: [],
  moves: [],
  traits: [],
  availabilities: [],

  isDuo: false,
  isHarmonized: false,

  isRefresher: false,
})

export const ASC = 'asc'
export const DESC = 'desc'

export type Order = typeof ASC | typeof DESC

export const NAME = 'full_name'
export const MOVE = 'move_type'
export const WEAP = 'weapon_type'

export type SortingField = typeof NAME | typeof MOVE | typeof WEAP

export interface ISorter {
  field: SortingField
  order: Order
}

export interface ISorters {
  fields: SortingField[]
  orders: Order[]
}

export const createSorters = () =>
  ({
    fields: [MOVE, WEAP, NAME],
    orders: [ASC, ASC, ASC],
  }) as ISorters

export function sort(units: IUnit[], sorters: ISorters) {
  return orderBy(
    units,
    sorters.fields.map((field) => {
      switch (field) {
        case MOVE:
          return (unit: IUnit) => SORTED_MOVE_TYPES_INDEXES[unit.move_type]
        case WEAP:
          return (unit: IUnit) => SORTED_WEAPON_TYPES_INDEXES[unit.weapon_type]
      }
      return field
    }),
    sorters.orders,
  )
}
