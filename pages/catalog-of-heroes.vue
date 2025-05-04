<!-- https://feheroes.fandom.com/wiki/Catalog_of_Heroes -->
<template>
  <div class="pa-3 fill-height d-flex flex-column">
    <v-overlay
      :model-value="isLoadingStores || isLoadingStorage"
      class="d-flex justify-space-around align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-overlay>

    <div>
      <TheWarningAboutLocalStorage class="mb-3" />

      <div class="d-flex align-center mb-3">
        <v-btn
          v-tooltip="t('global.reset')"
          icon
          size="x-small"
          class="mr-3"
          @click="confirmReset"
        >
          <v-icon>mdi-restart</v-icon>
        </v-btn>

        <v-spacer />

        <AppDownloadUpload
          :payload="payloadToSave"
          file-name="FEHdex.json"
          @uploaded="updateData"
        />

        <AppLocalstorageSaveStates
          :local-storage-key="LOCAL_STORAGE_KEY"
          :payload="payloadToSave"
          @loaded="updateData"
        />
      </div>
    </div>

    <v-container
      fluid
      class="flex-grow-1 pa-0"
    >
      <v-row class="fill-height">
        <v-col class="fill-height">
          <RecycleScroller
            v-slot="{ item }"
            class="scroller"
            :items="catalogLines"
            :item-size="frameSize"
          >
            <div class="d-flex">
              <CompoUnitThumbnailCatalog
                v-for="unit in item.units as IUnit[]"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                class="cursor-pointer"
                @click="
                  ownedUnitIds.has(unit.id)
                    ? ownedUnitIds.delete(unit.id)
                    : ownedUnitIds.add(unit.id)
                "
              />
            </div>
          </RecycleScroller>
        </v-col>
        <v-col>
          <h4>Heroes : {{ ownedCount }} / {{ sortedUnits.length }}</h4>
          <v-table class="table-counts">
            <thead>
              <tr>
                <th />
                <th
                  v-for="color in SORTED_WEAPON_COLORS"
                  class="text-end"
                >
                  <AppIconWeaponType
                    :weapon-type="color"
                    :size="tileSize"
                  />
                </th>
                <th class="text-end">
                  {{ t('global.total') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="availability in SORTED_AVAILABILITIES_AND_UNDEFINED">
                <th>
                  <div v-if="availability === UNDEFINED">
                    Other
                    <v-icon
                      v-tooltip="t('catalogOfHeroes.other')"
                      color="info"
                    >
                      mdi-information-outline
                    </v-icon>
                  </div>
                  <UnitSource
                    v-else
                    :tile-size="tileSize"
                    :availability="availability"
                  />
                </th>
                <td
                  v-for="color in SORTED_WEAPON_COLORS"
                  class="text-end"
                >
                  {{
                    (ownedUnitsCountByWeaponColorByAvailability[availability] &&
                      ownedUnitsCountByWeaponColorByAvailability[availability][
                        color
                      ]) ??
                    t('global.NA')
                  }}
                  /
                  {{
                    (allUnitsCountByWeaponColorByAvailability[availability] &&
                      allUnitsCountByWeaponColorByAvailability[availability][
                        color
                      ]) ??
                    t('global.NA')
                  }}
                </td>
                <th class="text-end">
                  {{
                    ownedUnitsCountByAvailability
                      ? ownedUnitsCountByAvailability[availability]
                      : t('global.NA')
                  }}
                  /
                  {{
                    allUnitsCountByAvailability
                      ? allUnitsCountByAvailability[availability]
                      : t('global.NA')
                  }}
                </th>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th>
                  {{ t('global.total') }}
                </th>
                <th
                  v-for="color in SORTED_WEAPON_COLORS"
                  class="text-end"
                >
                  {{ ownedUnitsCountByWeaponColor[color] ?? t('global.NA') }}
                  /
                  {{ allUnitsCountByWeaponColor[color] ?? t('global.NA') }}
                </th>
                <th class="text-end">
                  {{ ownedCount }}
                  /
                  {{ sortedUnits.length }}
                </th>
              </tr>
            </tfoot>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import sum from 'lodash-es/sum'
import sortBy from 'lodash-es/sortBy'
import mapValues from 'lodash-es/mapValues'

import type {
  IUnit,
  UnitId,
  UnitsCountByWeaponColor,
  TrueUnitsCountByWeaponColorByAvailability,
  TrueUnitsCountByAvailability,
} from '~/utils/types/units'
import {
  SORTED_AVAILABILITIES_AND_UNDEFINED,
  UNDEFINED,
} from '~/utils/types/units-availabilities'
import { SORTED_WEAPON_COLORS } from '@/utils/types/weapons'

const { t } = useI18n()

const frameSize = 90
const thumbnailSize = 80
const tileSize = 30

// inspired by https://stackoverflow.com/a/51968729/5032734
function chunkMaxLength<T>(arr: T[], chunkSize: number) {
  const maxLength = Math.ceil(arr.length / chunkSize)
  return Array.from({ length: maxLength }, (_, index) =>
    arr.slice(index * chunkSize, (index + 1) * chunkSize),
  )
}

const storeDataUnits = useStoreDataUnits()
const { isLoading: isLoadingStores } = useDataStores([
  storeDataUnits,
  useStoreDataUnitsAvailabilities(),
])

const columnsCount = ref(5)

const sortedUnits = computed(() =>
  sortBy(storeDataUnits.units, ['origin', 'id_int']),
)
const catalogLines = computed(() =>
  chunkMaxLength(sortedUnits.value, columnsCount.value).map((line, index) => ({
    id: index,
    units: line,
  })),
)

const ownedUnitIds = ref(new Set())
const ownedCount = computed(() => ownedUnitIds.value.size)

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  ownedUnitIds.value = new Set()
}

const allUnitsCountByWeaponColorByAvailability =
  computed<TrueUnitsCountByWeaponColorByAvailability>(() =>
    mapValues(
      storeDataUnits.unitsByWeaponColorByAvailability,
      (allUnitsByWeaponColor) =>
        mapValues(allUnitsByWeaponColor, (units) => units.length),
    ),
  )
const allUnitsCountByAvailability = computed<TrueUnitsCountByAvailability>(() =>
  mapValues(
    allUnitsCountByWeaponColorByAvailability.value,
    (allUnitsCountByWeaponColor) =>
      sum(Object.values(allUnitsCountByWeaponColor)),
  ),
)
const ownedUnitsCountByWeaponColorByAvailability =
  computed<TrueUnitsCountByWeaponColorByAvailability>(() => {
    const res: any = {}
    storeDataUnits.units.forEach((unit) => {
      if (!ownedUnitIds.value.has(unit.id)) return

      const { weaponColor, availability } = unit
      const av = availability === undefined ? UNDEFINED : availability
      if (!res[av]) res[av] = {}
      if (!res[av][weaponColor]) res[av][weaponColor] = 0
      res[av][weaponColor] += 1
    })
    return res
  })
const ownedUnitsCountByAvailability = computed<TrueUnitsCountByAvailability>(
  () =>
    mapValues(
      ownedUnitsCountByWeaponColorByAvailability.value,
      (ownedUnitsCountByWeaponColor) =>
        sum(Object.values(ownedUnitsCountByWeaponColor)),
    ),
)

const allUnitsCountByWeaponColor = computed<UnitsCountByWeaponColor>(() =>
  mapValues(storeDataUnits.unitsByWeaponColor, (units) => units.length),
)
const ownedUnitsCountByWeaponColor = computed<UnitsCountByWeaponColor>(() => {
  const res: any = {}
  storeDataUnits.units.forEach((unit) => {
    if (!ownedUnitIds.value.has(unit.id)) return

    const { weaponColor } = unit
    if (!res[weaponColor]) res[weaponColor] = 0
    res[weaponColor] += 1
  })
  return res
})

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:catalog-of-heroes'
const CURRENT_PAYLOAD_VERSION = 1
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  ownedUnitIds: UnitId[]
}

const payloadToSave = computed(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  ownedUnitIds: Array.from(ownedUnitIds.value),
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  ownedUnitIds.value = new Set(data.ownedUnitIds)
}
</script>

<style lang="scss" scoped>
.scroller {
  height: 400px;
}
</style>
