import { objectFromEntries } from '@/utils/functions/typeSafe'

export const GRADE_SS = 'SS'
export const GRADE_S = 'S'
export const GRADE_A = 'A'
export const GRADE_B = 'B'
export const GRADE_C = 'C'

export type Grade =
  | typeof GRADE_SS
  | typeof GRADE_S
  | typeof GRADE_A
  | typeof GRADE_B
  | typeof GRADE_C

export const SORTED_GRADES: Grade[] = [
  GRADE_SS,
  GRADE_S,
  GRADE_A,
  GRADE_B,
  GRADE_C,
]
export const SORTED_GRADE_INDEXES: { [key in Grade]: number } =
  objectFromEntries(SORTED_GRADES.map((grade, index) => [grade, index]))
