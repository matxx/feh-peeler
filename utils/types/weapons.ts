import { objectFromEntries } from '~/utils/functions/typeSafe'

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

export type FamilyWeaponType =
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

export type ColorWeaponType =
  | typeof WEAPON_R
  | typeof WEAPON_B
  | typeof WEAPON_G
  | typeof WEAPON_C

export type AggregatedWeaponType = FamilyWeaponType | ColorWeaponType

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

export const WEAPON_AGGREGATIONS_FOR_FILTERS: {
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

export const SORTED_WEAPONS_MATRIX_FOR_FILTERS: WeaponType[][] = [
  [WEAPON_R_SW, WEAPON_B_LA, WEAPON_G_AX],
  [WEAPON_R_BO, WEAPON_B_BO, WEAPON_G_BO, WEAPON_C_BO],
  [WEAPON_R_DA, WEAPON_B_DA, WEAPON_G_DA, WEAPON_C_DA],
  [WEAPON_R_TO, WEAPON_B_TO, WEAPON_G_TO, WEAPON_C_TO],
  [WEAPON_R_BR, WEAPON_B_BR, WEAPON_G_BR, WEAPON_C_BR],
  [WEAPON_R_BE, WEAPON_B_BE, WEAPON_G_BE, WEAPON_C_BE],
]

export const WEAPON_FAMILY_TYPES_FOR_FILTERS: FamilyWeaponType[] = [
  WEAPON_A_SW,
  WEAPON_A_BO,
  WEAPON_A_DA,
  WEAPON_A_TO,
  WEAPON_A_BR,
  WEAPON_A_BE,
]

export const WEAPON_COLORS_FOR_FILTERS: ColorWeaponType[] = [
  WEAPON_R,
  WEAPON_B,
  WEAPON_G,
  WEAPON_C,
]
