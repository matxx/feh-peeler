<template>
  <Teleport to="body">
    <v-dialog v-model="isOpen">
      <div id="skills-modals-root" />

      <v-card :loading="isLoading">
        <template v-if="skill">
          <v-toolbar
            color="primary"
            density="compact"
          >
            <SkillImg
              :skill="skill"
              :size="TOOLBAR_ICON_SIZE"
              class="mx-4"
            />

            <v-toolbar-title class="ml-0">
              {{ skill.name }}
            </v-toolbar-title>

            <template v-if="!mobile">
              <v-spacer />
              <SkillAvailability
                :skill="skill"
                :tile-size="TOOLBAR_FODDER_SIZE"
              />
              <v-spacer />
            </template>

            <v-toolbar-items>
              <v-btn
                v-show="!mobile"
                icon
                flat
                :href="lFandom(skill.group_name)"
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
                @click="isOpen = false"
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
                  :skill="skill"
                  :tile-size="TOOLBAR_FODDER_SIZE"
                />

                <v-spacer />

                <v-btn
                  density="compact"
                  variant="text"
                  icon
                  :href="lFandom(skill.group_name)"
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
              v-model="tabSelected"
              bg-color="primary"
            >
              <v-tab
                v-for="tab in SHOW_TABS"
                :key="tab"
                :value="tab"
                :loading="isLoading"
              >
                {{ t(`skills.show.tabs.${tab}`) }}
              </v-tab>
            </v-tabs>
          </v-card-title>

          <v-card-text class="pa-3">
            <v-tabs-window v-model="tabSelected">
              <v-tabs-window-item :value="TAB_DETAILS">
                <SkillShowDetails :skill="skill" />
              </v-tabs-window-item>
              <v-tabs-window-item :value="TAB_FODDERS">
                <SkillShowFodders
                  :skill="skill"
                  :tile-size="FODDERS_TILE_SIZE"
                />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </template>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import {
  SHOW_TABS,
  TAB_DETAILS,
  TAB_FODDERS,
  SHOW_DEFAULT_TAB,
} from '~/utils/types/skills'

const TOOLBAR_ICON_SIZE = 20
const TOOLBAR_FODDER_SIZE = 30
const FODDERS_TILE_SIZE = 40

const { t } = useI18n()
const { mobile } = useDisplay()
const { l: lGame8 } = useGame8()
const { l: lFandom } = useFandom()
// const localePath = useLocalePath()

// const router = useRouter()
const parentRoute = useParentRoute()
const modalRouter = useModalRouter()

const isOpen = ref(true)
watch(isOpen, modalRouter.close)

// function closeModalAndShow() {
//   let name
//   if (parentRoute.params.tab) {
//     name = 'skills-name-tab'
//   } else if (parentRoute.params.name) {
//     name = 'skills-name'
//   } else {
//     name = 'skills'
//   }
//   const params = { ...parentRoute.params }

//   isOpen.value = false
//   console.log('route', name, params)
//   console.log('parentRoute', parentRoute.name, parentRoute.params)
//   router.push(localePath({ name, params }))
// }

const skill = computed(() => {
  if (!parentRoute.params.name) return
  if (parentRoute.params.name instanceof Array) return

  return storeDataSkills.skillsByNameForLink[parentRoute.params.name]
})

const storeDataSkills = useStoreDataSkills()
const { isLoading } = useDataStores([
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
  useStoreDataSkillsDescriptions(),
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkillsUnits(),
])

const tabSelected = ref(String(parentRoute.params.tab) || SHOW_DEFAULT_TAB)
</script>
