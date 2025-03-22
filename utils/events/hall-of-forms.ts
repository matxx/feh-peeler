import type * as skillTypes from '~/utils/types/skills'
import type { IUnitInstance } from '~/utils/types/units'
import { getEmptyUnitInstance } from '~/utils/types/units'
import { getEmptyFilters } from '~/utils/functions/skillLists'

export type TeamInHallOfForms = [
  IUnitInstance,
  IUnitInstance,
  IUnitInstance,
  IUnitInstance,
]

export function getEmptyTeamInHallOfForms(): TeamInHallOfForms {
  return [
    getEmptyUnitInstance(),
    getEmptyUnitInstance(),
    getEmptyUnitInstance(),
    getEmptyUnitInstance(),
  ]
}

export type Filters = {
  [key in skillTypes.SkillCategory]: string[]
}

export function getEmptyFiltersInHallOfForms(): Filters {
  return getEmptyFilters(2)
}
