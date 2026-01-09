import type { SkillId } from '@/utils/types/skills'
import type { UnitId } from '@/utils/types/units'

export interface ISkillUnit {
  unit_id: UnitId
  skill_id: SkillId
  default: number
  unlock: number
}
