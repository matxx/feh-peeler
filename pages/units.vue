<template>
  <div>
    <v-overlay
      :model-value="isLoading"
      contained
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
      />
    </v-overlay>

    <div class="mb-3">
      <v-select
        v-show="mobile"
        v-model="columnsMobile"
        :items="columnsForSelect"
        :label="t('units.index.columnsDisplayed')"
        variant="solo"
        multiple
        hide-details
      >
        <template #selection="{ item, index }">
          <v-chip
            v-if="index < 2"
            :text="item.title"
          />

          <span
            v-if="index === 2"
            class="text-grey text-caption align-self-center"
          >
            (+{{ columnsMobile.length - 2 }} others)
          </span>
        </template>
      </v-select>

      <div v-show="!mobile">
        <v-btn
          v-for="column in unitsColumns.COLUMNS_IN_FILTERS"
          :key="column"
          size="x-small"
          class="text-primary mr-1 mb-1"
          :active="columns.has(column)"
          @click="
            columns.has(column) ? columns.delete(column) : columns.add(column)
          "
        >
          {{ t(`units.index.headers.${column}`) }}
        </v-btn>
      </div>
    </div>

    <div ref="mobile-units-filter-name" />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="storeUnitsFilters.unitsFilteredCount"
      :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
      :loading="storeUnitsFilters.isUpdating"
      :search="
        storeUnitsFilters.filters.name === null
          ? undefined
          : storeUnitsFilters.filters.name
      "
      multi-sort
      :sort-by="sortBy"
      @update:options="updateUnits"
    >
      <!-- CUSTOM HEADERS -->

      <template #[`header.${unitsColumns.COLUMN_THUMBNAIL}`]>
        <v-btn
          v-tooltip="t('units.index.resetSorting')"
          icon
          size="x-small"
          flat
          @click="sortBy = []"
        >
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </template>
      <template #[`header.${unitsColumns.COLUMN_HAS_RESPLENDENT}`]>
        <img
          src="assets/icons/resplendent.png"
          :width="size"
          :height="size"
        />
      </template>
      <template
        v-for="stat in unitsColumns.COLUMNS_OF_STAT"
        :key="stat"
        #[`header.${stat}`]="{ column }"
      >
        {{ column.title }}<UnitTooltipStat />
      </template>

      <!-- CUSTOM CELLS -->

      <template #[`item.${unitsColumns.COLUMN_THUMBNAIL}`]="{ item }">
        <NuxtLink
          href="#"
          @click.prevent="storeGlobals.showUnit(item.id)"
        >
          <CompoUnitThumbnail
            :unit="item"
            :size="size"
            :size-corner="sizeCorner"
          />
        </NuxtLink>
      </template>
      <template #[`item.${unitsColumns.COLUMN_NAME}`]="{ item }">
        <NuxtLink
          href="#"
          @click.prevent="storeGlobals.showUnit(item.id)"
        >
          {{ item.full_name }}
        </NuxtLink>
      </template>
      <template #[`item.${unitsColumns.COLUMN_HAS_RESPLENDENT}`]="{ item }">
        <v-icon :color="item.has_respl ? 'green' : 'red'">
          {{ item.has_respl ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
      <template #[`item.${unitsColumns.COLUMN_AVAILABILITY}`]="{ item }">
        <UnitAvailability
          :unit="item"
          :tile-size="size"
        />
      </template>
      <template #[`item.${unitsColumns.COLUMN_WEAPON}`]="{ item }">
        <AppIconWeaponType
          :weapon-type="item.weapon_type"
          :size="size"
        />
      </template>
      <template #[`item.${unitsColumns.COLUMN_MOVE}`]="{ item }">
        <AppIconMoveType
          :move-type="item.move_type"
          :size="size"
        />
      </template>

      <template #[`item.${unitsColumns.COLUMN_STAT_HP}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_hp || NULL
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_hp }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_STAT_ATK}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_atk || NULL
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_atk }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_STAT_SPD}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_spd || NULL
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_spd }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_STAT_DEF}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_def || NULL
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_def }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_STAT_RES}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_res || NULL
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_res }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_BST}`]="{ item }">
        <strong>
          {{ item.bst }}
        </strong>
      </template>

      <template #[`item.${unitsColumns.COLUMN_ELEMENT}`]="{ item }">
        <AppIconElement
          v-if="item.element"
          :element="item.element"
          :size="size"
        />
      </template>

      <template #[`item.${unitsColumns.COLUMN_RATING}`]="{ item }">
        {{ storeDataUnitsRatingsGame8.byId[item.id]?.game8_rating }}
      </template>

      <template #[`item.${unitsColumns.COLUMN_THEME}`]="{ item }">
        {{ item.theme && t(`units.themes.${item.theme}`) }}
      </template>
    </v-data-table-server>

    <!-- TODO: generation / game -->
  </div>
</template>

<script setup lang="ts">
import type { DataTableSortItem } from 'vuetify'
import * as Sentry from '@sentry/nuxt'
import filter from 'lodash-es/filter'

import { STATS_IVS_COLORS, NULL } from '~/utils/types/units-stats'

import * as unitsColumns from '~/utils/types/units-columns'
import * as unitsSorters from '~/utils/types/units-sorters'

definePageMeta({
  layout: 'units-filters',
})

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

const div = useTemplateRef('mobile-units-filter-name')
onMounted(() => {
  storeGlobals.setMobileUnitFilterElem(div.value)
})
onBeforeUnmount(() => {
  storeGlobals.setMobileUnitFilterElem()
})

const storeDataUnitsStats = useStoreDataUnitsStats()
const storeDataUnitsRatingsGame8 = useStoreDataUnitsRatingsGame8()
const { isLoading } = useDataStores([
  storeDataUnitsStats,
  storeDataUnitsRatingsGame8,
])

const size = 40
const sizeCorner = 15

const storeUnitsFilters = useStoreUnitsFilters()
storeUnitsFilters.$reset()

const columns = ref(new Set(unitsColumns.DEFAULT_COLUMNS))
const columnsMobile = computed({
  get: () => Array.from(columns.value),
  set: (newColumns) => {
    columns.value = new Set(newColumns)
  },
})
// statsDisplayedAre5starLevel40plus0
interface Header {
  title: string
  key: string
  align: 'start' | 'center'
  sortable: boolean
}
const headers = computed<Header[]>(() =>
  filter(
    unitsColumns.ALL_COLUMNS,
    (column) =>
      column == unitsColumns.COLUMN_THUMBNAIL || columns.value.has(column),
  ).map((column) => ({
    title: t(`units.index.headers.${column}`),
    key: column,
    align: unitsColumns.COLUMNS_START_ALIGNED.has(column) ? 'start' : 'center',
    sortable: column !== unitsColumns.COLUMN_THUMBNAIL,
  })),
)

interface Options {
  page: number
  itemsPerPage: number
  sortBy: DataTableSortItem[]
  groupBy: DataTableSortItem[]
  search: string | undefined
}
const page = ref<number>()
const itemsPerPage = ref<number>()
const sortBy = ref<DataTableSortItem[]>()
const groupBy = ref<DataTableSortItem[]>()
const search = ref<string | undefined>()

const start = computed(() => {
  if (page.value === undefined || itemsPerPage.value === undefined) {
    return 0
  }
  return (page.value - 1) * itemsPerPage.value
})
const end = computed(() => {
  if (page.value === undefined || itemsPerPage.value === undefined) {
    return 0
  }
  return page.value * itemsPerPage.value
})
const items = computed(() =>
  storeUnitsFilters.unitsFilteredSorted.slice(start.value, end.value),
)

function translate(sortBy: DataTableSortItem[]) {
  return {
    fields: sortBy.map((column) => {
      const res = unitsSorters.COLUMN_TO_SORT[column.key]
      if (res) return res

      Sentry.captureException(`unhandled column key: ${column.key}`, {
        tags: { locator: 'pages/units.vue#translate' },
      })
      return unitsSorters.SORT_NOTHING
    }),
    orders: sortBy.map((column) => {
      switch (column.order) {
        case 'asc':
          return unitsSorters.ASC
        case 'desc':
          return unitsSorters.DESC
        default:
          Sentry.captureException(`unhandled column order: ${column.order}`, {
            tags: { locator: 'pages/units.vue#translate' },
          })
          return unitsSorters.ASC
      }
    }),
  }
}

function updateUnits(options: Options) {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  sortBy.value = options.sortBy
  groupBy.value = options.groupBy
  search.value = options.search

  storeUnitsFilters.sorters = translate(options.sortBy)
}

const columnsForSelect = computed(() =>
  unitsColumns.COLUMNS_IN_FILTERS.map((column) => ({
    title: t(`units.index.headers.${column}`),
    value: column,
  })),
)
</script>
