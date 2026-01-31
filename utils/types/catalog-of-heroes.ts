import type { UnitId } from './units'

export const LOCAL_STORAGE_KEY = 'feh-peeler:catalog-of-heroes'
export const CURRENT_PAYLOAD_VERSION = 1
export interface IPayloadToSaveV1 {
  version: 1
  ownedUnitIds: UnitId[]
}
