<template>
  <v-dialog v-model="storeGlobals.modalSkillIsOpen">
    <v-card :loading="isLoading">
      <template v-if="skill">
        <v-toolbar
          color="primary"
          density="compact"
          class="v-toolbar--justify-space-between"
        >
          <h3 class="d-flex align-center">
            <SkillImgCategory
              :category="skill.category"
              :size="TOOLBAR_ICON_SIZE"
              class="mx-4"
            />
            <SkillImg
              v-show="SKILL_CATEGORIES_WITH_ICON.includes(skill.category)"
              :skill="skill"
              :size="TOOLBAR_ICON_SIZE"
              class="mr-4"
            />
            {{ skill.name }}
          </h3>

          <template v-if="!mobile">
            <SkillAvailability
              v-if="skill.category !== SKILL_PASSIVE_S"
              :skill="skill"
              :tile-size="TOOLBAR_OWNER_SIZE"
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
              :href="lFandom(skill.fandom_id)"
              target="_blank"
            >
              <img
                src="~/assets/images/fandom-logo.png"
                :height="TOOLBAR_ICON_SIZE"
              />
            </v-btn>
            <v-btn
              v-if="skill.game8_id"
              v-show="!mobile"
              icon
              flat
              :href="lGame8(skill.game8_id)"
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
              @click="storeGlobals.modalSkillIsOpen = false"
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
              <SkillAvailability
                v-if="skill.category !== SKILL_PASSIVE_S"
                :skill="skill"
                :tile-size="TOOLBAR_OWNER_SIZE"
              />

              <v-spacer />

              <v-btn
                density="compact"
                variant="text"
                icon
                :href="lFandom(skill.fandom_id)"
                target="_blank"
                class="mr-4"
              >
                <img
                  src="~/assets/images/fandom-logo.png"
                  :height="TOOLBAR_ICON_SIZE"
                />
              </v-btn>
              <v-btn
                v-if="skill.game8_id"
                density="compact"
                variant="text"
                icon
                :href="lGame8(skill.game8_id)"
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
            v-model="storeGlobals.shownSkillTab"
            bg-color="primary"
          >
            <v-tab
              v-for="tab in tabsDisplayed"
              :key="tab"
              :value="tab"
              :loading="isLoading"
            >
              {{ t(`skills.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>
        </v-card-title>

        <v-card-text class="pa-3">
          <v-tabs-window v-model="storeGlobals.shownSkillTab">
            <v-tabs-window-item :value="TAB_DETAILS">
              <SkillTabDetails :skill="skill" />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_OWNERS">
              <SkillTabOwners
                :skill="skill"
                :tile-size="OWNERS_TILE_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_DOWNGRADES">
              <SkillTabDowngrades
                :skill="skill"
                :tile-size="OWNERS_TILE_SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_UPGRADES">
              <SkillTabUpgrades
                :skill="skill"
                :tile-size="OWNERS_TILE_SIZE"
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
  TAB_DETAILS,
  TAB_OWNERS,
  TAB_DOWNGRADES,
  TAB_UPGRADES,
  SKILL_CATEGORIES_WITH_ICON,
  SKILL_PASSIVE_S,
} from '~/utils/types/skills'

const TOOLBAR_ICON_SIZE = 20
const TOOLBAR_OWNER_SIZE = 30
const OWNERS_TILE_SIZE = 40

const { t } = useI18n()
const { mobile, name } = useDisplay()
const { l: lGame8 } = useGame8()
const { l: lFandom } = useFandom()
const storeGlobals = useStoreGlobals()

const storeDataSkills = useStoreDataSkills()
const { isLoading } = useDataStores([
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
  useStoreDataSkillsDescriptions(),
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkillsUnits(),
])

const skill = computed(() =>
  storeGlobals.shownSkillId
    ? storeDataSkills.skillsById[storeGlobals.shownSkillId]
    : undefined,
)

const tabsDisplayed = computed(() => {
  const res = [TAB_DETAILS]
  if (skill.value && skill.value.category !== SKILL_PASSIVE_S) {
    res.push(TAB_OWNERS)
  }
  if (skill.value?.downgrade_ids?.length) res.push(TAB_DOWNGRADES)
  if (skill.value?.upgrade_ids?.length) res.push(TAB_UPGRADES)
  return res
})
</script>

<style lang="scss" scoped>
.v-toolbar--justify-space-between :deep(.v-toolbar__content) {
  justify-content: space-between;
}
</style>
