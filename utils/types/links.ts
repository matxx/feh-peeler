export const TARGET_FEH_PEELER = 'FEH_PEELER'
export const TARGET_FANDOM = 'FANDOM'
export const TARGET_GAME8 = 'GAME8'

export type Target =
  | typeof TARGET_FEH_PEELER
  | typeof TARGET_FANDOM
  | typeof TARGET_GAME8

export const TARGETS: Target[] = [
  TARGET_FEH_PEELER,
  TARGET_FANDOM,
  TARGET_GAME8,
]
export const DEFAULT_TARGET = TARGET_FEH_PEELER
