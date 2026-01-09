import type { UnitId } from '@/utils/types/units'

export interface IUnitArt {
  id: UnitId

  art_a: string
  art_b: string
  art_c: string
  art_d: string

  art_resp_a?: string
  art_resp_b?: string
  art_resp_c?: string
  art_resp_d?: string
}
