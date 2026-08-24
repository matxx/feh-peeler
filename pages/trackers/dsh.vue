<template>
  <v-container fluid>
    <v-overlay
      :model-value="isLoading"
      class="d-flex justify-space-around align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-overlay>

    <v-row>
      <v-col>
        <p>
          {{ t('trackers.dsh.explanation') }}
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="overflow-x-auto">
          <div
            class="dsh-grid"
            :style="{
              gridTemplateColumns: `repeat(${columns.length}, min-content)`,
            }"
          >
            <template
              v-for="(column, columnIndex) in columns"
              :key="column.banner.name"
            >
              <div
                v-for="unit in column.units"
                :key="unit.id"
                class="dsh-grid__cell"
                :style="{
                  gridColumn: columnIndex + 1,
                  gridRow: rowIndexForColor(unit.weaponColor) + 1,
                }"
              >
                <CompoUnitThumbnailCatalog
                  :unit="unit"
                  :rarity="
                    storeDataUnitsAvailabilities.getUnitMinimumObtainableIntegerRarity(
                      unit.id,
                    )
                  "
                  :frame-size="frameSize"
                  :thumbnail-size="thumbnailSize"
                  show-weapon
                  class="cursor-pointer"
                  @click="storeGlobals.showUnit(unit.id)"
                />
              </div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { SORTED_WEAPON_COLORS, type WeaponColor } from '~/utils/types/weapons'
import { getDshTrackerColumns } from '~/utils/trackers/dsh'

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

const frameSize = computed(() => (mobile.value ? 60 : 90))
const thumbnailSize = computed(() => (mobile.value ? 50 : 80))

const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataBanners = useStoreDataBanners()

const { isLoading } = useDataStores([
  storeDataUnits,
  storeDataUnitsAvailabilities,
  storeDataBanners,
])

const columns = computed(() =>
  isLoading.value
    ? []
    : getDshTrackerColumns(
        storeDataUnits.unitsWithReleaseDate,
        storeDataUnitsAvailabilities.availabilitiesById,
        storeDataBanners.banners,
      ),
)

function rowIndexForColor(color: WeaponColor) {
  return SORTED_WEAPON_COLORS.indexOf(color)
}
</script>

<style lang="scss" scoped>
.dsh-grid {
  display: grid;
  grid-auto-rows: min-content;
  column-gap: 12px;
  row-gap: 12px;
}

.dsh-grid__cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
