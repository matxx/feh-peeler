<template>
  <div class="ma-3">
    <div class="mb-3">
      {{ t('global.inpiredBy') }}
      <!-- eslint-disable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/user/JabPerson/"
        target="_blank"
        class="text-decoration-none"
      >
        @JabPerson</a
      >
      Reddit
      <!-- eslint-enable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/r/FireEmblemHeroes/comments/1gumcdt/can_you_inherit_all_their_fodder_in_one_go/"
        target="_blank"
        class="text-decoration-none"
      >
        {{ t('global.post') }}
      </a>
    </div>

    <div class="mb-5">
      <AppSelectUnit
        v-model="unitId"
        :label="t('bindingWorlds.labels.unitName')"
        clearable
        thumbnail-at-end
      />
    </div>
    <div
      v-if="selectedUnit"
      class="mb-5 d-flex align-center"
    >
      <div class="mr-3">
        {{ t('unitsFodder.availability') }}
      </div>
      <UnitAvailability
        :unit="selectedUnit"
        :tile-size="SIZE"
        show-all
      />
    </div>
    <div v-if="selectedUnit">
      <v-card>
        <v-tabs
          v-model="tabSelected"
          bg-color="primary"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.key"
            :value="tab.key"
          >
            {{ tab.title }}
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
  </div>
</template>

<script setup lang="ts">
import { TAB_FODDER, TAB_STATS } from '~/i18n/lang/en.mjs'
import type { UnitId } from '~/utils/types/units'

const SIZE = 40

const DEFAULT_TAB = TAB_FODDER
const TABS = [TAB_FODDER, TAB_STATS]

const tabSelected = ref<string>(DEFAULT_TAB)

const { t } = useI18n()
const route = useRoute()
const storeDataConstants = useStoreDataConstants()
const storeUnits = useStoreUnits()
const storeDataUnitsStats = useStoreDataUnitsStats()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkills = useStoreDataSkills()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const tabs = TABS.map((tab) => ({
  key: tab,
  title: t(`pages.units.tabs.${tab}`),
}))

const unitId = ref<UnitId>()
const selectedUnit = computed(() =>
  unitId.value ? storeUnits.unitsById[unitId.value] : undefined,
)

onMounted(() => {
  storeDataConstants.load()
  storeUnits.load()
  storeDataUnitsStats.load()
  storeDataUnitsAvailabilities.load()
  storeDataSkills.load()
  storeDataSkillsAvailabilities.load()
})

watch(
  () => storeUnits.isLoaded,
  () => {
    if (!storeUnits.isLoaded) return
    if (!route.query.name) return

    const unit = storeUnits.unitsByFullName[String(route.query.name)]
    if (!unit) return

    unitId.value = unit.id
  },
  { immediate: true },
)
</script>
