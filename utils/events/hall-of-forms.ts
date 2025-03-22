import type { IUnitInstance } from '~/utils/types/units'
import { getEmptyUnitInstance } from '~/utils/types/units'
import {
  getEmptyFilters,
  type FiltersBySkillCategory,
} from '~/utils/functions/skillLists'

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

export function getEmptyFiltersInHallOfForms(): FiltersBySkillCategory {
  return getEmptyFilters(2)
}
