import { objectFromEntries } from '@/utils/functions/typeSafe'

export const GRADE_SS = 'SS'
export const GRADE_S = 'S'
export const GRADE_A = 'A'
export const GRADE_B = 'B'
export const GRADE_C = 'C'

// only for sorting purposes (when no rating from game8)
export const GRADE_F = 'F'

export type Grade =
  | typeof GRADE_SS
  | typeof GRADE_S
  | typeof GRADE_A
  | typeof GRADE_B
  | typeof GRADE_C

export type GradeExtended = Grade | typeof GRADE_F

export const SORTED_GRADES: GradeExtended[] = [
  GRADE_SS,
  GRADE_S,
  GRADE_A,
  GRADE_B,
  GRADE_C,
  GRADE_F,
]
export const SORTED_GRADE_INDEXES: { [key in GradeExtended]: number } =
  objectFromEntries(SORTED_GRADES.map((grade, index) => [grade, -index]))
