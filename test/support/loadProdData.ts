import { setActivePinia, createPinia } from 'pinia'

import { useStoreDataUnits } from '~/stores/data/units'
import { useStoreDataUnitsStats } from '~/stores/data/units-stats'
import { useStoreDataSkills } from '~/stores/data/skills'
import { useStoreDataAccents } from '~/stores/data/accents'
import type { IUnitData } from '~/utils/types/units'
import type { IUnitStat } from '~/utils/types/units-stats'
import type { ISkillData } from '~/utils/types/skills'

interface ProdDataSnapshot {
  unitsData: IUnitData[]
  stats: IUnitStat[]
  skillsData: ISkillData[]
  accents: Record<string, string>
}

let cachedSnapshotPromise: Promise<ProdDataSnapshot> | null = null

// Fetches the exact same production data the app serves (see
// composables/useData.ts, pinned to a fixed commit hash, so the payload is
// immutable) once per test run, so useUnitScore() tests exercise real
// units/stats/skills instead of hand-made fixtures.
function fetchProdDataSnapshot(): Promise<ProdDataSnapshot> {
  if (!cachedSnapshotPromise) {
    cachedSnapshotPromise = (async () => {
      setActivePinia(createPinia())

      const storeDataUnits = useStoreDataUnits()
      const storeDataUnitsStats = useStoreDataUnitsStats()
      const storeDataSkills = useStoreDataSkills()
      const storeDataAccents = useStoreDataAccents()

      await Promise.all([
        storeDataUnits.load(),
        storeDataUnitsStats.load(),
        storeDataSkills.load(),
        storeDataAccents.load(),
      ])

      return {
        unitsData: storeDataUnits.unitsData,
        stats: storeDataUnitsStats.stats,
        skillsData: storeDataSkills.skillsData,
        accents: storeDataAccents.accents,
      }
    })()
  }

  return cachedSnapshotPromise
}

// Populates the currently active Pinia's data stores with the cached
// production snapshot, without re-fetching over the network on every test.
export async function loadProdDataStores() {
  const snapshot = await fetchProdDataSnapshot()

  const storeDataUnits = useStoreDataUnits()
  storeDataUnits.unitsData = snapshot.unitsData
  storeDataUnits.isLoaded = true

  const storeDataUnitsStats = useStoreDataUnitsStats()
  storeDataUnitsStats.stats = snapshot.stats
  storeDataUnitsStats.isLoaded = true

  const storeDataSkills = useStoreDataSkills()
  storeDataSkills.skillsData = snapshot.skillsData
  storeDataSkills.isLoaded = true

  // `units`/`skills` computeds only populate once accents are "loaded"
  const storeDataAccents = useStoreDataAccents()
  storeDataAccents.accents = snapshot.accents
  storeDataAccents.isLoaded = true
}
