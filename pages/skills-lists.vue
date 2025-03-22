<template>
  <div class="ma-3">
    <TheInfoAboutGame8Ratings class="mb-3" />

    <v-progress-linear
      v-if="!isLoaded"
      color="primary"
      indeterminate
    />

    <v-card>
      <div class="d-flex align-center justify-space-between my-2 mx-3">
        <div class="d-none d-sm-flex flex-grow-1">
          <v-select
            v-model="filtersCount"
            :items="filtersIndexes"
            :label="t('skillsList.labels.filtersCount')"
            density="compact"
            variant="plain"
            hide-details
            class="mr-2 flex-grow-1"
          />
          <v-select
            v-model="highlightedFiltersIndexes"
            multiple
            :items="filtersIndexes"
            :label="t('skillsList.labels.highlightedFiltersIndexes')"
            density="compact"
            variant="plain"
            hide-details
            clearable
            :class="{
              'flex-grow-3': sm || md,
              'flex-grow-2': lgAndUp,
            }"
          />
          <v-spacer class="d-none d-md-flex" />
          <v-spacer class="d-none d-md-flex" />
        </div>
        <div class="d-flex">
          <v-checkbox
            v-model="showRestrictions"
            :label="t('skillsList.labels.showRestrictions')"
            density="compact"
            hide-details
            class="mr-2"
          />
          <v-checkbox
            v-model="showDescriptions"
            :label="t('skillsList.labels.showDescriptions')"
            density="compact"
            hide-details
          />
        </div>
      </div>

      <v-tabs
        v-model="tabSelected"
        bg-color="primary"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
          :min-width="60"
        >
          <SkillImgCategory
            :category="tab"
            :size="26"
            class="mr-1"
          />
          <span v-show="!mobile">
            {{ t(`skillsList.tabs.${tab}`) }}
          </span>
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tabSelected">
        <v-tabs-window-item
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
        >
          <ListSkills
            v-model="filters[tab]"
            :regexps="regexps"
            :error-messages="errorMessages"
            :category="tab"
            :filters-count="filtersCount"
            :highlighted-filters-indexes="highlightedFiltersIndexes"
            can-clear-all
            :show-restrictions="showRestrictions"
            :show-descriptions="showDescriptions"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { every } from 'lodash-es'

import { SKILL_CATEGORIES, DEFAULT_SELECTED_TAB } from '~/utils/types/skills'
import {
  type FiltersBySkillCategory,
  getEmptyFilters,
} from '~/utils/functions/skillLists'

const { t } = useI18n()
const display = useDisplay()
const { mobile, sm, md, lgAndUp } = useDisplay()
const storeSkills = useStoreSkills()
const storeSkillsDescriptions = useStoreSkillsDescriptions()
const storeSkillsRatingsGame8 = useStoreSkillsRatingsGame8()

const MAX_FILTERS_COUNT_MOBILE = 1
const MAX_FILTERS_COUNT_DESKTOP = 6

onMounted(() => {
  storeSkills.load()
  storeSkillsDescriptions.load()
  storeSkillsRatingsGame8.load()

  boot()
})

function boot() {
  updateMaxFiltersCount()

  update((data: PayloadToSave) => {
    filters.value = data.filters
    filtersCount.value =
      !data.filtersCount || data.filtersCount > maxFiltersCount.value
        ? maxFiltersCount.value
        : data.filtersCount
    highlightedFiltersIndexes.value = data.highlightedFiltersIndexes
    showRestrictions.value = data.showRestrictions
    showDescriptions.value = data.showDescriptions
  })
}

function updateMaxFiltersCount() {
  maxFiltersCount.value = display.mobile.value
    ? MAX_FILTERS_COUNT_MOBILE
    : MAX_FILTERS_COUNT_DESKTOP
}

watch(display.mobile, () => {
  boot()
})

const isLoaded = computed(() =>
  every([
    storeSkills.isLoaded,
    storeSkillsDescriptions.isLoaded,
    storeSkillsRatingsGame8.isLoaded,
  ]),
)

const maxFiltersCount = ref(MAX_FILTERS_COUNT_MOBILE)
const filtersCount = ref(MAX_FILTERS_COUNT_MOBILE)
const highlightedFiltersIndexes = ref<number[]>([])
const showRestrictions = ref(true)
const showDescriptions = ref(false)

const filtersIndexes = computed(() =>
  Array.from({ length: maxFiltersCount.value }).map((_, i) => i + 1),
)

const tabSelected = ref(DEFAULT_SELECTED_TAB)
const tabs = SKILL_CATEGORIES

const filters = ref<FiltersBySkillCategory>(getEmptyFilters(filtersCount.value))
const { regexps, errorMessages } = useSearchesBySkillCategory(filters)

watch(filtersCount, () => {
  Object.values(filters.value).forEach(
    (arr) => (arr.length = filtersCount.value),
  )
})

const LOCAL_STORAGE_KEY = 'skills-lists'
const CURRENT_PAYLOAD_VERSION = 1

const { storeOnUpdate, update } = useLocalStorage(LOCAL_STORAGE_KEY)
interface PayloadToSave {
  version: number
  filters: FiltersBySkillCategory
  filtersCount: number
  highlightedFiltersIndexes: number[]
  showRestrictions: boolean
  showDescriptions: boolean
}
const payloadToSave = computed<PayloadToSave>(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  filters: filters.value,
  filtersCount: filtersCount.value,
  highlightedFiltersIndexes: highlightedFiltersIndexes.value,
  showRestrictions: showRestrictions.value,
  showDescriptions: showDescriptions.value,
}))
storeOnUpdate(payloadToSave)
</script>
