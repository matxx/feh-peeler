import type { SkillId } from '@/utils/types/skills'
import type { UnitId } from '@/utils/types/units'

export interface ISkillUnit {
  unit_id: UnitId
  skill_id: SkillId
  default: number
  unlock: number
}

export type ISkillUnitBySkillId = {
  [index: SkillId]: ISkillUnit
}
export type ISkillUnitByUnitId = {
  [index: UnitId]: ISkillUnit
}

export type ISkillUnitBySkillIdByUnitId = {
  [index: UnitId]: ISkillUnitBySkillId
}
export type ISkillUnitByUnitIdBySkillId = {
  [index: SkillId]: ISkillUnitByUnitId
}
