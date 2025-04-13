<template>
  <div class="ma-3">
    <div class="mb-5">
      <AppSelectUnit
        v-model="unitId"
        :loading="isLoading"
        :label="t('global.unitName')"
        clearable
        thumbnail-at-end
        hide-link
      />
    </div>

    <!-- TODO: find out why modal always open up -->
    <!-- <template v-if="selectedUnit">
      <div
        class="mb-3 d-flex justify-space-between align-center"
        :class="{ 'flex-column': mobile }"
      >
        <div class="d-flex align-center">
          <div class="mx-3">
            {{ t('global.availability') }}
          </div>
          <UnitAvailability
            :unit="selectedUnit"
            :tile-size="SIZE"
            show-all
          />
        </div>

        <div class="d-flex">
          <v-btn
            icon
            flat
            :href="lFandom(selectedUnit.full_name)"
            target="_blank"
            class="mr-3"
          >
            <img
              src="~/assets/images/fandom-logo.png"
              :height="TOOLBAR_ICON_SIZE"
            />
          </v-btn>
          <v-btn
            v-if="selectedUnit.game8_id"
            icon
            flat
            :href="lGame8(selectedUnit.game8_id)"
            target="_blank"
          >
            <img
              src="~/assets/images/game8-logo-square.png"
              :height="TOOLBAR_ICON_SIZE"
            />
          </v-btn>
        </div>
      </div>

      <div>
        <v-card>
          <v-tabs
            v-model="tabSelected"
            bg-color="primary"
          >
            <v-tab
              v-for="tab in SHOW_TABS"
              :key="tab"
              :value="tab"
            >
              {{ t(`units.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="tabSelected">
            <v-tabs-window-item :value="TAB_FODDER">
              <UnitFodder
                :unit="selectedUnit"
                :size="SIZE"
              />
            </v-tabs-window-item>
            <v-tabs-window-item :value="TAB_STATS">
              <UnitStat :unit="selectedUnit" />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
    </template> -->
  </div>
</template>

<script setup lang="ts">
import type { UnitId } from '~/utils/types/units'
// import {
//   TAB_FODDER,
//   TAB_STATS,
//   SHOW_TABS,
//   SHOW_DEFAULT_TAB,
//   type UnitId,
// } from '~/utils/types/units'

// const SIZE = 40
// const TOOLBAR_ICON_SIZE = 20

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
// const mobile = useDisplay()
// const { l: lGame8 } = useGame8()
// const { l: lFandom } = useFandom()
const localePath = useLocalePath()

// const tabSelected = ref<string>(
//   route.params.tab ? String(route.params.tab) : SHOW_DEFAULT_TAB,
// )

const storeDataUnits = useStoreDataUnits()
const { isLoading } = useDataStores([
  useStoreDataConstants(),
  storeDataUnits,
  useStoreDataUnitsStats(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkills(),
  useStoreDataSkillsAvailabilities(),
])

const unitId = ref<UnitId>()
const selectedUnit = computed(() =>
  unitId.value ? storeDataUnits.unitsById[unitId.value] : undefined,
)
watch(selectedUnit, () => {
  if (!selectedUnit.value) {
    router.replace(
      localePath({
        name: 'units',
      }),
    )
    return
  }

  if (route.params.name === selectedUnit.value.nameForLink) return

  router.replace(
    localePath({
      name: 'units-name',
      params: { name: selectedUnit.value.nameForLink },
    }),
  )
})

watch(
  [() => storeDataUnits.isLoaded, route],
  () => {
    if (!storeDataUnits.isLoaded) return
    if (!route.params.name) return
    if (route.params.name instanceof Array) return

    const unit = storeDataUnits.unitsByNameForLink[route.params.name]
    if (!unit) return

    unitId.value = unit.id
  },
  { immediate: true },
)
</script>
