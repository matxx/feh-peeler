<template>
  <Teleport to="body">
    <v-dialog v-model="isOpen">
      <v-card :loading="isLoading">
        <template v-if="unit">
          <v-toolbar
            color="primary"
            density="compact"
          >
            <v-toolbar-title>
              {{ unit.full_name }}
            </v-toolbar-title>

            <template v-if="!mobile">
              <v-spacer />
              <UnitAvailability
                :unit="unit"
                :tile-size="TOOLBAR_FODDER_SIZE"
                show-all
              />
              <v-spacer />
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
              v-model="tabSelected"
              bg-color="primary"
              density="compact"
            >
              <v-tab
                v-for="tab in SHOW_TABS"
                :key="tab"
                :value="tab"
              >
                {{ t(`units.show.tabs.${tab}`) }}
              </v-tab>
            </v-tabs>
          </v-card-title>

          <v-card-text class="pa-3">
            <v-tabs-window v-model="tabSelected">
              <v-tabs-window-item :value="TAB_FODDER">
                <UnitFodder
                  :unit="unit"
                  :size="FODDERS_TILE_SIZE"
                />
              </v-tabs-window-item>
              <v-tabs-window-item :value="TAB_STATS">
                <UnitStat :unit="unit" />
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
  TAB_STATS,
  TAB_FODDER,
  SHOW_DEFAULT_TAB,
} from '~/utils/types/units'

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
//     name = 'units-name-tab'
//   } else if (parentRoute.params.name) {
//     name = 'units-name'
//   } else {
//     name = 'units'
//   }
//   const params = { ...parentRoute.params }

//   isOpen.value = false
//   console.log('route', name, params)
//   console.log('parentRoute', parentRoute.name, parentRoute.params)
//   router.push(localePath({ name, params }))
// }

const unit = computed(() => {
  if (!parentRoute.params.name) return
  if (parentRoute.params.name instanceof Array) return

  return storeDataUnits.unitsByNameForLink[parentRoute.params.name]
})

const storeDataUnits = useStoreDataUnits()
const { isLoading } = useDataStores([
  useStoreDataConstants(),
  storeDataUnits,
  useStoreDataUnitsStats(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkills(),
  useStoreDataSkillsAvailabilities(),
])

const tabSelected = ref(String(parentRoute.params.tab) || SHOW_DEFAULT_TAB)
</script>
