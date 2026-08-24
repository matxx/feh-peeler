import sortBy from 'lodash-es/sortBy'
import min from 'lodash-es/min'
import { DateTime } from 'luxon'

import type { IUnitWithReleaseDate, UnitId } from '~/utils/types/units'
import type { IUnitAvailability } from '~/utils/types/units-availabilities'
import type { IBanner } from '~/utils/types/banners'
import { SPECIAL_SUMMON_POOL } from '~/utils/types/obfuscated-keys'
import type { IndexedBy } from '~/utils/functions/typeSafe'

// "Double Special Heroes" banners re-feature special-pool units
// roughly a year after their original release, one banner per month
export const DSH_BANNER_NAME_PREFIX = 'Focus: Double Special Heroes'

export function isDshBanner(banner: Pick<IBanner, 'name'>) {
  return banner.name.startsWith(DSH_BANNER_NAME_PREFIX)
}

export interface IDshTrackerColumn {
  banner: IBanner
  units: IUnitWithReleaseDate[]
}

export function getDshTrackerColumns(
  units: IUnitWithReleaseDate[],
  availabilitiesById: IndexedBy<UnitId, IUnitAvailability>,
  banners: IBanner[],
  now: DateTime = DateTime.now(),
): IDshTrackerColumn[] {
  const oneYearAgo = now.minus({ years: 1 })

  const recentSpecialUnits = units.filter((unit) => {
    const availability = availabilitiesById[unit.id]
    if (!availability?.is_in[SPECIAL_SUMMON_POOL]) return false

    return unit.releaseDate >= oneYearAgo && unit.releaseDate <= now
  })

  const bannersByUnitId = new Map<UnitId, IBanner[]>()
  banners.forEach((banner) => {
    banner.unit_ids.forEach((unitId) => {
      const list = bannersByUnitId.get(unitId) ?? []
      list.push(banner)
      bannersByUnitId.set(unitId, list)
    })
  })

  const columnsByBannerName = new Map<string, IDshTrackerColumn>()

  recentSpecialUnits.forEach((unit) => {
    const unitBanners = bannersByUnitId.get(unit.id) ?? []

    const alreadyOnDshBanner = unitBanners.some(isDshBanner)
    if (alreadyOnDshBanner) return

    // the banner where a unit was originally released is simply
    // the earliest banner it appears in
    const releaseBanner = sortBy(unitBanners, 'start_time')[0]
    if (!releaseBanner) return

    const column = columnsByBannerName.get(releaseBanner.name) ?? {
      banner: releaseBanner,
      units: [],
    }
    column.units.push(unit)
    columnsByBannerName.set(releaseBanner.name, column)
  })

  return sortBy(Array.from(columnsByBannerName.values()), (column) =>
    min(column.units.map((unit) => unit.releaseDate.toMillis())),
  ).map((column) => ({
    ...column,
    units: sortBy(column.units, 'sortableWeaponColor'),
  }))
}
