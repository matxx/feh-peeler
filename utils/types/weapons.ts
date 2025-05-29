import { objectFromEntries } from '~/utils/functions/typeSafe'
import type { IUnitData } from '~/utils/types/units'

export const WEAPON_R_SW = 'Red Sword'
export const WEAPON_R_BO = 'Red Bow'
export const WEAPON_R_DA = 'Red Dagger'
export const WEAPON_R_TO = 'Red Tome'
export const WEAPON_R_BR = 'Red Breath'
export const WEAPON_R_BE = 'Red Beast'

export const WEAPON_B_LA = 'Blue Lance'
export const WEAPON_B_BO = 'Blue Bow'
export const WEAPON_B_DA = 'Blue Dagger'
export const WEAPON_B_TO = 'Blue Tome'
export const WEAPON_B_BR = 'Blue Breath'
export const WEAPON_B_BE = 'Blue Beast'

export const WEAPON_G_AX = 'Green Axe'
export const WEAPON_G_BO = 'Green Bow'
export const WEAPON_G_DA = 'Green Dagger'
export const WEAPON_G_TO = 'Green Tome'
export const WEAPON_G_BR = 'Green Breath'
export const WEAPON_G_BE = 'Green Beast'

export const WEAPON_C_ST = 'Colorless Staff'
export const WEAPON_C_BO = 'Colorless Bow'
export const WEAPON_C_DA = 'Colorless Dagger'
export const WEAPON_C_TO = 'Colorless Tome'
export const WEAPON_C_BR = 'Colorless Breath'
export const WEAPON_C_BE = 'Colorless Beast'

export type WeaponType =
  | typeof WEAPON_R_SW
  | typeof WEAPON_R_BO
  | typeof WEAPON_R_DA
  | typeof WEAPON_R_TO
  | typeof WEAPON_R_BR
  | typeof WEAPON_R_BE
  //
  | typeof WEAPON_B_LA
  | typeof WEAPON_B_BO
  | typeof WEAPON_B_DA
  | typeof WEAPON_B_TO
  | typeof WEAPON_B_BR
  | typeof WEAPON_B_BE
  //
  | typeof WEAPON_G_AX
  | typeof WEAPON_G_BO
  | typeof WEAPON_G_DA
  | typeof WEAPON_G_TO
  | typeof WEAPON_G_BR
  | typeof WEAPON_G_BE
  //
  | typeof WEAPON_C_ST
  | typeof WEAPON_C_BO
  | typeof WEAPON_C_DA
  | typeof WEAPON_C_TO
  | typeof WEAPON_C_BR
  | typeof WEAPON_C_BE

export const SORTED_WEAPON_TYPES: WeaponType[] = [
  WEAPON_R_SW,
  WEAPON_R_BO,
  WEAPON_R_DA,
  WEAPON_R_TO,
  WEAPON_R_BR,
  WEAPON_R_BE,

  WEAPON_B_LA,
  WEAPON_B_BO,
  WEAPON_B_DA,
  WEAPON_B_TO,
  WEAPON_B_BR,
  WEAPON_B_BE,

  WEAPON_G_AX,
  WEAPON_G_BO,
  WEAPON_G_DA,
  WEAPON_G_TO,
  WEAPON_G_BR,
  WEAPON_G_BE,

  WEAPON_C_ST,
  WEAPON_C_BO,
  WEAPON_C_DA,
  WEAPON_C_TO,
  WEAPON_C_BR,
  WEAPON_C_BE,
]

export const SORTED_WEAPON_TYPES_INDEXES: { [key in WeaponType]: number } =
  objectFromEntries(SORTED_WEAPON_TYPES.map((type, index) => [type, index]))

export const SORTED_WEAPONS_MATRIX: WeaponType[][] = [
  [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX, WEAPON_C_ST],
  [WEAPON_R_BO, WEAPON_B_BO, WEAPON_G_BO, WEAPON_C_BO],
  [WEAPON_R_DA, WEAPON_B_DA, WEAPON_G_DA, WEAPON_C_DA],
  [WEAPON_R_TO, WEAPON_B_TO, WEAPON_G_TO, WEAPON_C_TO],
  [WEAPON_R_BR, WEAPON_B_BR, WEAPON_G_BR, WEAPON_C_BR],
  [WEAPON_R_BE, WEAPON_B_BE, WEAPON_G_BE, WEAPON_C_BE],
]

export const WEAPON_A_ME = 'All Melee'

export const WEAPON_A_SW = 'All Sword'
export const WEAPON_A_LA = 'All Lance'
export const WEAPON_A_AX = 'All Axe'
export const WEAPON_A_ST = 'All Staff'
export const WEAPON_A_BO = 'All Bow'
export const WEAPON_A_DA = 'All Dagger'
export const WEAPON_A_TO = 'All Tome'
export const WEAPON_A_BR = 'All Breath'
export const WEAPON_A_BE = 'All Beast'

export type WeaponFamily =
  | typeof WEAPON_A_ME
  //
  | typeof WEAPON_A_SW
  | typeof WEAPON_A_LA
  | typeof WEAPON_A_AX
  | typeof WEAPON_A_ST
  | typeof WEAPON_A_BO
  | typeof WEAPON_A_DA
  | typeof WEAPON_A_TO
  | typeof WEAPON_A_BR
  | typeof WEAPON_A_BE

export const WEAPON_R = 'Red'
export const WEAPON_B = 'Blue'
export const WEAPON_G = 'Green'
export const WEAPON_C = 'Colorless'

export type WeaponColor =
  | typeof WEAPON_R
  | typeof WEAPON_B
  | typeof WEAPON_G
  | typeof WEAPON_C

export type AggregatedWeaponType = WeaponFamily | WeaponColor

export type ExtendedWeaponType = WeaponType | AggregatedWeaponType

export const WEAPON_AGGREGATED_TYPES: AggregatedWeaponType[] = [
  WEAPON_A_SW,
  WEAPON_A_LA,
  WEAPON_A_AX,
  WEAPON_A_ST,
  WEAPON_A_BO,
  WEAPON_A_DA,
  WEAPON_A_TO,
  WEAPON_A_BR,
  WEAPON_A_BE,

  WEAPON_R,
  WEAPON_B,
  WEAPON_G,
  WEAPON_C,
]

export const WEAPON_AGGREGATIONS: {
  [key in AggregatedWeaponType]: WeaponType[]
} = {
  [WEAPON_A_ME]: [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_A_SW]: [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_A_LA]: [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_A_AX]: [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_A_ST]: [WEAPON_C_ST],

  [WEAPON_A_BO]: [WEAPON_R_BO, WEAPON_B_BO, WEAPON_G_BO, WEAPON_C_BO],
  [WEAPON_A_DA]: [WEAPON_R_DA, WEAPON_B_DA, WEAPON_G_DA, WEAPON_C_DA],
  [WEAPON_A_TO]: [WEAPON_R_TO, WEAPON_B_TO, WEAPON_G_TO, WEAPON_C_TO],
  [WEAPON_A_BR]: [WEAPON_R_BR, WEAPON_B_BR, WEAPON_G_BR, WEAPON_C_BR],
  [WEAPON_A_BE]: [WEAPON_R_BE, WEAPON_B_BE, WEAPON_G_BE, WEAPON_C_BE],

  [WEAPON_R]: [
    WEAPON_R_SW,
    WEAPON_R_BO,
    WEAPON_R_DA,
    WEAPON_R_TO,
    WEAPON_R_BR,
    WEAPON_R_BE,
  ],
  [WEAPON_B]: [
    WEAPON_B_LA,
    WEAPON_B_BO,
    WEAPON_B_DA,
    WEAPON_B_TO,
    WEAPON_B_BR,
    WEAPON_B_BE,
  ],
  [WEAPON_G]: [
    WEAPON_G_AX,
    WEAPON_G_BO,
    WEAPON_G_DA,
    WEAPON_G_TO,
    WEAPON_G_BR,
    WEAPON_G_BE,
  ],
  [WEAPON_C]: [
    WEAPON_C_ST,
    WEAPON_C_BO,
    WEAPON_C_DA,
    WEAPON_C_TO,
    WEAPON_C_BR,
    WEAPON_C_BE,
  ],
}

export const WEAPON_FAMILY_FOR_TYPE: {
  [key in WeaponType]: WeaponFamily
} = {
  [WEAPON_R_SW]: WEAPON_A_ME,
  [WEAPON_B_LA]: WEAPON_A_ME,
  [WEAPON_G_AX]: WEAPON_A_ME,
  [WEAPON_C_ST]: WEAPON_A_ST,

  [WEAPON_R_BO]: WEAPON_A_BO,
  [WEAPON_B_BO]: WEAPON_A_BO,
  [WEAPON_G_BO]: WEAPON_A_BO,
  [WEAPON_C_BO]: WEAPON_A_BO,

  [WEAPON_R_DA]: WEAPON_A_DA,
  [WEAPON_B_DA]: WEAPON_A_DA,
  [WEAPON_G_DA]: WEAPON_A_DA,
  [WEAPON_C_DA]: WEAPON_A_DA,

  [WEAPON_R_TO]: WEAPON_A_TO,
  [WEAPON_B_TO]: WEAPON_A_TO,
  [WEAPON_G_TO]: WEAPON_A_TO,
  [WEAPON_C_TO]: WEAPON_A_TO,

  [WEAPON_R_BR]: WEAPON_A_BR,
  [WEAPON_B_BR]: WEAPON_A_BR,
  [WEAPON_G_BR]: WEAPON_A_BR,
  [WEAPON_C_BR]: WEAPON_A_BR,

  [WEAPON_R_BE]: WEAPON_A_BE,
  [WEAPON_B_BE]: WEAPON_A_BE,
  [WEAPON_G_BE]: WEAPON_A_BE,
  [WEAPON_C_BE]: WEAPON_A_BE,
}

export const WEAPON_COLOR_FOR_TYPE: {
  [key in WeaponType]: WeaponColor
} = {
  [WEAPON_R_SW]: WEAPON_R,
  [WEAPON_R_BO]: WEAPON_R,
  [WEAPON_R_DA]: WEAPON_R,
  [WEAPON_R_TO]: WEAPON_R,
  [WEAPON_R_BR]: WEAPON_R,
  [WEAPON_R_BE]: WEAPON_R,

  [WEAPON_B_LA]: WEAPON_B,
  [WEAPON_B_BO]: WEAPON_B,
  [WEAPON_B_DA]: WEAPON_B,
  [WEAPON_B_TO]: WEAPON_B,
  [WEAPON_B_BR]: WEAPON_B,
  [WEAPON_B_BE]: WEAPON_B,

  [WEAPON_G_AX]: WEAPON_G,
  [WEAPON_G_BO]: WEAPON_G,
  [WEAPON_G_DA]: WEAPON_G,
  [WEAPON_G_TO]: WEAPON_G,
  [WEAPON_G_BR]: WEAPON_G,
  [WEAPON_G_BE]: WEAPON_G,

  [WEAPON_C_ST]: WEAPON_C,
  [WEAPON_C_BO]: WEAPON_C,
  [WEAPON_C_DA]: WEAPON_C,
  [WEAPON_C_TO]: WEAPON_C,
  [WEAPON_C_BR]: WEAPON_C,
  [WEAPON_C_BE]: WEAPON_C,
}

export const SORTED_WEAPONS_MATRIX_FOR_UNITS_FILTERS: WeaponType[][] = [
  [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_R_BO, WEAPON_B_BO, WEAPON_G_BO, WEAPON_C_BO],
  [WEAPON_R_DA, WEAPON_B_DA, WEAPON_G_DA, WEAPON_C_DA],
  [WEAPON_R_TO, WEAPON_B_TO, WEAPON_G_TO, WEAPON_C_TO],
  [WEAPON_R_BR, WEAPON_B_BR, WEAPON_G_BR, WEAPON_C_BR],
  [WEAPON_R_BE, WEAPON_B_BE, WEAPON_G_BE, WEAPON_C_BE],
]

export const SORTED_WEAPON_FAMILY_TYPES: WeaponFamily[] = [
  WEAPON_A_SW,
  WEAPON_A_BO,
  WEAPON_A_DA,
  WEAPON_A_TO,
  WEAPON_A_BR,
  WEAPON_A_BE,
]

export const SORTED_WEAPON_COLORS: WeaponColor[] = [
  WEAPON_R,
  WEAPON_B,
  WEAPON_G,
  WEAPON_C,
]

export function getSortableWeaponColor(color: WeaponColor) {
  switch (color) {
    case WEAPON_R:
      return 0
    case WEAPON_B:
      return 1
    case WEAPON_G:
      return 2
    case WEAPON_C:
      return 3
  }
}

export function getSortableType(unit: IUnitData) {
  switch (unit.weapon_type) {
    case WEAPON_R_SW:
      return 0
    case WEAPON_R_BE:
      return 1
    case WEAPON_R_BR:
      return 2
    case WEAPON_R_BO:
      return 3
    case WEAPON_R_DA:
      return 4
    case WEAPON_R_TO:
      return 5

    case WEAPON_B_LA:
      return 10
    case WEAPON_B_BE:
      return 11
    case WEAPON_B_BR:
      return 12
    case WEAPON_B_BO:
      return 13
    case WEAPON_B_DA:
      return 14
    case WEAPON_B_TO:
      return 15

    case WEAPON_G_AX:
      return 20
    case WEAPON_G_BE:
      return 21
    case WEAPON_G_BR:
      return 22
    case WEAPON_G_BO:
      return 23
    case WEAPON_G_DA:
      return 24
    case WEAPON_G_TO:
      return 25

    case WEAPON_C_BE:
      return 30
    case WEAPON_C_BR:
      return 31
    case WEAPON_C_BO:
      return 32
    case WEAPON_C_DA:
      return 33
    case WEAPON_C_TO:
      return 34
    case WEAPON_C_ST:
      return 35
  }
}

export function getSortableWeaponType(unit: IUnitData) {
  switch (unit.weapon_type) {
    case WEAPON_R_SW:
      return 0
    case WEAPON_B_LA:
      return 1
    case WEAPON_G_AX:
      return 2

    case WEAPON_R_BO:
      return 10
    case WEAPON_B_BO:
      return 11
    case WEAPON_G_BO:
      return 12
    case WEAPON_C_BO:
      return 13

    case WEAPON_R_DA:
      return 20
    case WEAPON_B_DA:
      return 21
    case WEAPON_G_DA:
      return 22
    case WEAPON_C_DA:
      return 23

    case WEAPON_R_TO:
      return 30
    case WEAPON_B_TO:
      return 31
    case WEAPON_G_TO:
      return 32
    case WEAPON_C_TO:
      return 33

    case WEAPON_C_ST:
      return 40

    case WEAPON_R_BR:
      return 50
    case WEAPON_B_BR:
      return 51
    case WEAPON_G_BR:
      return 52
    case WEAPON_C_BR:
      return 53

    case WEAPON_R_BE:
      return 54
    case WEAPON_B_BE:
      return 55
    case WEAPON_G_BE:
      return 56
    case WEAPON_C_BE:
      return 57
  }
}

export const WEAPONS_FOR_SKILLS_FILTERS: ExtendedWeaponType[][] = [
  [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX, WEAPON_C_ST],
  [WEAPON_R_TO, WEAPON_B_TO, WEAPON_G_TO, WEAPON_C_TO],
  [WEAPON_A_BO, WEAPON_A_DA, WEAPON_A_BR, WEAPON_A_BE],
]
