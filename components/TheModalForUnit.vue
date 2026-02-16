<template>
  <v-dialog v-model="storeGlobals.modalUnitIsOpen">
    <v-card :loading="isLoading">
      <!-- primary toolbar (mobile & desktop) -->
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
            <UnitModalHeaderAvailability
              :unit="unit"
              :tile-size="TOOLBAR_FODDER_SIZE"
            />
          </template>

          <v-toolbar-items>
            <DevOnly>
              <v-btn
                disabled
                flat
              >
                {{ name }}
              </v-btn>
            </DevOnly>

            <v-btn
              v-show="!mobile"
              icon
              flat
              :href="lGuide(unit.guide_id)"
              target="_blank"
            >
              <img
                src="~/assets/images/logo-guide.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>
            <v-btn
              v-if="unit.fehpass_id"
              v-show="!mobile"
              icon
              flat
              :href="lFehPass(unit.fehpass_id)"
              target="_blank"
            >
              <img
                src="~/assets/icons/fodder/fehpass.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>
            <v-btn
              v-show="!mobile"
              icon
              flat
              :href="lFandom(unit.fandom_id)"
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
            <!-- secondary toolbar (mobile only) -->
            <div class="d-flex align-center">
              <UnitModalHeaderAvailability
                :unit="unit"
                :tile-size="TOOLBAR_FODDER_SIZE"
              />

              <v-spacer />

              <v-btn
                density="compact"
                variant="text"
                icon
                class="ml-4"
                target="_blank"
                :href="lGuide(unit.guide_id)"
              >
                <img
                  src="~/assets/images/logo-guide.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
              <v-btn
                v-if="unit.fehpass_id"
                density="compact"
                variant="text"
                icon
                class="ml-4"
                target="_blank"
                :href="lFehPass(unit.fehpass_id)"
              >
                <img
                  src="~/assets/icons/fodder/fehpass.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
              <v-btn
                density="compact"
                variant="text"
                icon
                class="ml-4"
                target="_blank"
                :href="lFandom(unit.fandom_id)"
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
                class="ml-4"
                target="_blank"
                :href="lGame8(unit.game8_id)"
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
              v-tooltip="{
                disabled: !UNIT_TABS_WITH_TOOLTIP.includes(tab),
                text: UNIT_TABS_WITH_TOOLTIP.includes(tab)
                  ? t(`units.show.tooltips.${tab}`)
                  : undefined,
              }"
              :value="tab"
            >
              {{ t(`units.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>
        </v-card-title>

        <v-card-text class="pa-3">
          <v-tabs-window v-model="storeGlobals.shownUnitTab">
            <v-tabs-window-item :value="TAB_BASE_KIT">
              <UnitTabBaseKit
                :unit="unit"
                :size="TOOLBAR_ICON_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_ARTS">
              <UnitTabArts :unit="unit" />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_STATS">
              <UnitTabStat :unit="unit" />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_SKILLS">
              <UnitTabSkills
                :unit="unit"
                :size="FODDERS_TILE_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_FODDER">
              <UnitTabFodder
                :unit="unit"
                :size="FODDERS_TILE_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_FODDER_VALUE">
              <UnitTabFodderValue
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
  TAB_BASE_KIT,
  TAB_ARTS,
  TAB_STATS,
  TAB_SKILLS,
  TAB_FODDER,
  TAB_FODDER_VALUE,
  UNIT_TABS,
  UNIT_TABS_WITH_TOOLTIP,
} from '~/utils/types/units'

const TOOLBAR_ICON_SIZE = 20
const TOOLBAR_FODDER_SIZE = 30
const FODDERS_TILE_SIZE = 40

const { t } = useI18n()
const { mobile, name } = useDisplay()
const { l: lGame8 } = useGame8()
const { l: lGuide } = useGuide()
const { l: lFandom } = useFandom()
const { l: lFehPass } = useFehPass()
const storeGlobals = useStoreGlobals()

const storeDataUnits = useStoreDataUnits()
const { isLoading } = useDataStores([
  useStoreDataConstants(),
  storeDataUnits,
  useStoreDataUnitsArts(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataUnitsStats(),
  useStoreDataUnitsStatsRanks(),
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
