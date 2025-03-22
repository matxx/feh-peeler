import { objectFromEntries } from '@/utils/functions/typeSafe'

export const IV_HP = 'HP'
export const IV_ATK = 'Atk'
export const IV_SPD = 'Spd'
export const IV_DEF = 'Def'
export const IV_RES = 'Res'

export type IV =
  | typeof IV_HP
  | typeof IV_ATK
  | typeof IV_SPD
  | typeof IV_DEF
  | typeof IV_RES

export const IVS: IV[] = [IV_HP, IV_ATK, IV_SPD, IV_DEF, IV_RES]

export const IVS_HASH = objectFromEntries(IVS.map((iv) => [iv, iv]))
