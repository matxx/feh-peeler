<template>
  <v-dialog v-model="storeGlobals.modalUnitIsOpen">
    <v-card :loading="isLoading">
      <template v-if="unit">
        <v-toolbar
          color="primary"
          density="compact"
          class="v-toolbar--justify-space-between"
        >
          <h3 class="d-flex align-center">
            <CompoUnitThumbnail
              :unit="unit"
              :size="25"
              :size-corner="10"
              :margin="5"
              :margin-icon="-5"
              class="mx-4"
            />

            {{ mobile ? unit.abbreviated_name : unit.nameForDisplay }}
          </h3>

          <template v-if="!mobile">
            <UnitAvailability
              :unit="unit"
              :tile-size="TOOLBAR_FODDER_SIZE"
              show-all
            />
          </template>

          <v-toolbar-items>
            <v-btn
              v-show="!mobile"
              icon
              flat
              :href="lFandom(unit.full_name)"
              target="_blank"
            >
              <img
                src="~/assets/images/fandom-logo.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>
            <v-btn
              v-if="unit.game8_id"
              v-show="!mobile"
              icon
              flat
              :href="lGame8(unit.game8_id)"
              target="_blank"
            >
              <img
                src="~/assets/images/game8-logo-square.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>

            <!-- TODO: find out why modal always open up -->
            <!-- <v-btn
              icon
              flat
              @click="closeModalAndShow"
            >
              <v-icon>mdi-arrow-expand-all</v-icon>
            </v-btn> -->
            <v-btn
              icon
              flat
              @click="storeGlobals.modalUnitIsOpen = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-title class="pa-0">
          <div
            v-show="mobile"
            class="bg-primary px-3 py-3"
          >
            <div class="d-flex align-center">
              <UnitAvailability
                :unit="unit"
                :tile-size="TOOLBAR_FODDER_SIZE"
                show-all
              />

              <v-spacer />

              <v-btn
                density="compact"
                variant="text"
                icon
                :href="lFandom(unit.full_name)"
                target="_blank"
                class="mr-4"
              >
                <img
                  src="~/assets/images/fandom-logo.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
              <v-btn
                v-if="unit.game8_id"
                density="compact"
                variant="text"
                icon
                :href="lGame8(unit.game8_id)"
                target="_blank"
              >
                <img
                  src="~/assets/images/game8-logo-square.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
            </div>
          </div>

          <v-tabs
            v-model="storeGlobals.shownUnitTab"
            bg-color="primary"
            density="compact"
          >
            <v-tab
              v-for="tab in UNIT_TABS"
              :key="tab"
              :value="tab"
            >
              {{ t(`units.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>
        </v-card-title>

        <v-card-text class="pa-3">
          <v-tabs-window v-model="storeGlobals.shownUnitTab">
            <v-tabs-window-item :value="TAB_STATS">
              <UnitStat :unit="unit" />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_SKILLS">
              <UnitSkills
                :unit="unit"
                :size="FODDERS_TILE_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_FODDER">
              <UnitFodder
                :unit="unit"
                :size="FODDERS_TILE_SIZE"
              />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  TAB_STATS,
  TAB_SKILLS,
  TAB_FODDER,
  UNIT_TABS,
} from '~/utils/types/units'

const TOOLBAR_ICON_SIZE = 20
const TOOLBAR_FODDER_SIZE = 30
const FODDERS_TILE_SIZE = 40

const { t } = useI18n()
const { mobile } = useDisplay()
const { l: lGame8 } = useGame8()
const { l: lFandom } = useFandom()
const storeGlobals = useStoreGlobals()

const storeDataUnits = useStoreDataUnits()
const { isLoading } = useDataStores([
  useStoreDataConstants(),
  storeDataUnits,
  useStoreDataUnitsStats(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkills(),
  useStoreDataSkillsAvailabilities(),
  useStoreDataSkillsUnits(),
])

const unit = computed(() =>
  storeGlobals.shownUnitId
    ? storeDataUnits.unitsById[storeGlobals.shownUnitId]
    : undefined,
)
</script>

<style lang="scss" scoped>
.v-toolbar--justify-space-between :deep(.v-toolbar__content) {
  justify-content: space-between;
}
</style>
