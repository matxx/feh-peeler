import { SKILL_CATEGORIES, type SkillCategory } from '~/utils/types/skills'
import { objectFromEntries } from '~/utils/functions/typeSafe'

export type FiltersBySkillCategory = {
  [key in SkillCategory]: string[]
}

export const getEmptyArray = (length: number) =>
  Array.from({ length }, () => '')

export const getEmptyFilters = (filtersCount: number) =>
  objectFromEntries(
    SKILL_CATEGORIES.map((category) => [category, getEmptyArray(filtersCount)]),
  )
