export const DEVICE = 'device'
export const DARK = 'dark'
export const LIGHT = 'light'

export type Theme = typeof LIGHT | typeof DARK | typeof DEVICE
export type ThemeApplied = typeof LIGHT | typeof DARK

export const THEMES: Theme[] = [DEVICE, DARK, LIGHT]
export const THEMES_APPLIED = [DARK, LIGHT]

export const DEFAULT_THEME = DARK
