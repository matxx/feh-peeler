export const ELEMENT_FIRE = 'Fire'
export const ELEMENT_WATER = 'Water'
export const ELEMENT_WIND = 'Wind'
export const ELEMENT_EARTH = 'Earth'
export const ELEMENT_LIGHT = 'Light'
export const ELEMENT_DARK = 'Dark'
export const ELEMENT_ASTRA = 'Astra'
export const ELEMENT_ANIMA = 'Anima'
export const ELEMENT_CHAOS = 'Chaos'

export type ElementLegendary =
  | typeof ELEMENT_FIRE
  | typeof ELEMENT_WATER
  | typeof ELEMENT_WIND
  | typeof ELEMENT_EARTH
export type ElementMythic =
  | typeof ELEMENT_LIGHT
  | typeof ELEMENT_DARK
  | typeof ELEMENT_ASTRA
  | typeof ELEMENT_ANIMA
export type Element = ElementLegendary | ElementMythic

export type ElementChaos = typeof ELEMENT_CHAOS
export type ElementOrChaos = Element | ElementChaos
export type ElementMythicOrChaos = ElementMythic | ElementChaos

export const SORTED_LEGENDARY_ELEMENTS: ElementLegendary[] = [
  ELEMENT_FIRE,
  ELEMENT_WATER,
  ELEMENT_WIND,
  ELEMENT_EARTH,
]

export const SORTED_MYTHIC_ELEMENTS: ElementMythic[] = [
  ELEMENT_LIGHT,
  ELEMENT_DARK,
  ELEMENT_ASTRA,
  ELEMENT_ANIMA,
]

export const SORTED_OFFENSIVE_MYTHIC_ELEMENTS: ElementMythic[] = [
  ELEMENT_LIGHT,
  ELEMENT_ASTRA,
]

export const SORTED_DEFENSIVE_MYTHIC_ELEMENTS: ElementMythic[] = [
  ELEMENT_DARK,
  ELEMENT_ANIMA,
]

export const SORTED_ELEMENTS: Element[] = [
  ELEMENT_FIRE,
  ELEMENT_WATER,
  ELEMENT_WIND,
  ELEMENT_EARTH,
  ELEMENT_LIGHT,
  ELEMENT_DARK,
  ELEMENT_ASTRA,
  ELEMENT_ANIMA,
]

export const ELEMENTS_FOR_FILTERS = [
  SORTED_LEGENDARY_ELEMENTS,
  SORTED_MYTHIC_ELEMENTS,
]

export function getSortableElement(element?: Element) {
  if (!element) return -1

  switch (element) {
    case ELEMENT_FIRE:
      return 0
    case ELEMENT_WATER:
      return 1
    case ELEMENT_WIND:
      return 2
    case ELEMENT_EARTH:
      return 3
    case ELEMENT_LIGHT:
      return 4
    case ELEMENT_DARK:
      return 5
    case ELEMENT_ASTRA:
      return 6
    case ELEMENT_ANIMA:
      return 7
  }

  return -1
}

export function mythicComplement(
  element: ElementMythic | null,
): ElementMythic | null {
  if (!element) return null

  switch (element) {
    case ELEMENT_LIGHT:
      return ELEMENT_DARK
    case ELEMENT_DARK:
      return ELEMENT_LIGHT
    case ELEMENT_ASTRA:
      return ELEMENT_ANIMA
    case ELEMENT_ANIMA:
      return ELEMENT_ASTRA
  }

  return null
}
