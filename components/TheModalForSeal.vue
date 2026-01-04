<template>
  <v-dialog v-model="storeGlobals.modalSealIsOpen">
    <v-card :loading="isLoading">
      <template v-if="seal">
        <v-toolbar
          color="primary"
          density="compact"
          class="v-toolbar--justify-space-between"
        >
          <h3 class="d-flex align-center">
            <SkillImgCategory
              :category="SKILL_PASSIVE_S"
              :size="TOOLBAR_ICON_SIZE"
              class="mx-4"
            />
            <SealImg
              :seal="seal"
              :size="TOOLBAR_ICON_SIZE"
              class="mr-4"
            />
            {{ seal.name }}
          </h3>

          <v-toolbar-items>
            <v-btn
              v-show="!mobile"
              icon
              flat
              :href="lFandom(seal.group_name)"
              target="_blank"
            >
              <img
                src="~/assets/images/fandom-logo.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>
            <v-btn
              v-if="seal.game8_id"
              v-show="!mobile"
              icon
              flat
              :href="lGame8(seal.game8_id)"
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
              @click="storeGlobals.modalSealIsOpen = false"
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
              <v-spacer />

              <v-btn
                density="compact"
                variant="text"
                icon
                :href="lFandom(seal.group_name)"
                target="_blank"
                class="mr-4"
              >
                <img
                  src="~/assets/images/fandom-logo.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
              <v-btn
                v-if="seal.game8_id"
                density="compact"
                variant="text"
                icon
                :href="lGame8(seal.game8_id)"
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
            v-model="storeGlobals.shownSealTab"
            bg-color="primary"
          >
            <v-tab
              v-for="tab in tabsDisplayed"
              :key="tab"
              :value="tab"
              :loading="isLoading"
            >
              {{ t(`seals.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>
        </v-card-title>

        <v-card-text class="pa-3">
          <v-tabs-window v-model="storeGlobals.shownSealTab">
            <v-tabs-window-item :value="TAB_DETAILS">
              <SealShowDetails :seal="seal" />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_DOWNGRADES">
              <SealShowDowngrades
                :seal="seal"
                :tile-size="SEAL_ICON_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_UPGRADES">
              <SealShowUpgrades
                :seal="seal"
                :tile-size="SEAL_ICON_SIZE"
              />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { SKILL_PASSIVE_S } from '~/utils/types/skills'
import { TAB_DETAILS, TAB_DOWNGRADES, TAB_UPGRADES } from '~/utils/types/seals'

const TOOLBAR_ICON_SIZE = 20
const SEAL_ICON_SIZE = 40

const { t } = useI18n()
const { mobile } = useDisplay()
const { l: lGame8 } = useGame8()
const { l: lFandom } = useFandom()
const storeGlobals = useStoreGlobals()

const storeDataSeals = useStoreDataSeals()
const { isLoading } = useDataStores([
  storeDataSeals,
  useStoreDataSealsDescriptions(),
])

const seal = computed(() =>
  storeGlobals.shownSealId
    ? storeDataSeals.sealsById[storeGlobals.shownSealId]
    : undefined,
)

const tabsDisplayed = computed(() => {
  const res = [TAB_DETAILS]
  if (seal.value?.downgrade_ids?.length) res.push(TAB_DOWNGRADES)
  if (seal.value?.upgrade_ids?.length) res.push(TAB_UPGRADES)
  return res
})
</script>

<style lang="scss" scoped>
.v-toolbar--justify-space-between :deep(.v-toolbar__content) {
  justify-content: space-between;
}
</style>
