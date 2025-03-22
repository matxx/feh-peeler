import { SKILL_CATEGORIES } from '~/utils/types/skills'
import { objectFromEntries } from '~/utils/functions/typeSafe'

export const getEmptyArray = (length: number) =>
  Array.from({ length }, () => '')

export const getEmptyFilters = (filtersCount: number) =>
  objectFromEntries(
    SKILL_CATEGORIES.map((category) => [category, getEmptyArray(filtersCount)]),
  )
