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

    <TheInfoAboutGame8Ratings class="mb-3" />

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
          v-for="column in COLUMNS_IN_FILTERS"
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

    <div id="mobile-units-filter-name" />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="storeUnitsFilters.unitsFilteredCount"
      :loading="storeUnitsFilters.isUpdating"
      :search="
        storeUnitsFilters.filters.name === null
          ? undefined
          : storeUnitsFilters.filters.name
      "
      @update:options="updateUnits"
    >
      <template #[`header.${COLUMN_HAS_RESPLENDENT}`]>
        <img
          src="assets/icons/resplendent.png"
          :width="size"
          :height="size"
        />
      </template>

      <template #[`item.${COLUMN_THUMBNAIL}`]="{ item }">
        <NuxtLink
          class="text-no-wrap"
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
      <template #[`item.${COLUMN_NAME}`]="{ item }">
        <NuxtLink
          class="text-no-wrap"
          href="#"
          @click.prevent="storeGlobals.showUnit(item.id)"
        >
          {{ item.full_name }}
        </NuxtLink>
      </template>
      <template #[`item.${COLUMN_HAS_RESPLENDENT}`]="{ item }">
        <v-icon :color="item.has_respl ? 'green' : 'red'">
          {{ item.has_respl ? 'mdi-check-circle' : 'mdi-close-circle' }}
        </v-icon>
      </template>
      <template #[`item.${COLUMN_AVAILABILITY}`]="{ item }">
        <UnitAvailability
          :unit="item"
          :tile-size="size"
        />
      </template>
      <template #[`item.${COLUMN_WEAPON}`]="{ item }">
        <AppIconWeaponType
          :weapon-type="item.weapon_type"
          :size="size"
        />
      </template>
      <template #[`item.${COLUMN_MOVE}`]="{ item }">
        <AppIconMoveType
          :move-type="item.move_type"
          :size="size"
        />
      </template>

      <template #[`item.${COLUMN_IV_HP}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_hp || 'null'
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_hp }}
        </strong>
      </template>

      <template #[`item.${COLUMN_IV_ATK}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_atk || 'null'
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_atk }}
        </strong>
      </template>

      <template #[`item.${COLUMN_IV_SPD}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_spd || 'null'
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_spd }}
        </strong>
      </template>

      <template #[`item.${COLUMN_IV_DEF}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_def || 'null'
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_def }}
        </strong>
      </template>

      <template #[`item.${COLUMN_IV_RES}`]="{ item }">
        <strong
          :class="
            STATS_IVS_COLORS[
              storeDataUnitsStats.statsById[item.id]?.iv_res || 'null'
            ]
          "
        >
          {{ storeDataUnitsStats.statsById[item.id]?.level40_res }}
        </strong>
      </template>

      <template #[`item.${COLUMN_BST}`]="{ item }">
        <strong>
          {{ item.bst }}
        </strong>
      </template>

      <template #[`item.${COLUMN_RATING}`]="{ item }">
        {{ storeDataUnitsRatingsGame8.byId[item.id]?.game8_rating }}
      </template>
    </v-data-table-server>

    <!-- TODO: version / generation / game / element / artist / VA / dragonflowers -->
  </div>
</template>

<script setup lang="ts">
import type { DataTableSortItem } from 'vuetify'
import filter from 'lodash-es/filter'

import {
  DEFAULT_COLUMNS,
  ALL_COLUMNS,
  COLUMNS_IN_FILTERS,
  COLUMNS_START_ALIGNED,
  COLUMN_THUMBNAIL,
  COLUMN_NAME,
  COLUMN_AVAILABILITY,
  COLUMN_WEAPON,
  COLUMN_MOVE,
  COLUMN_IV_HP,
  COLUMN_IV_ATK,
  COLUMN_IV_SPD,
  COLUMN_IV_DEF,
  COLUMN_IV_RES,
  COLUMN_BST,
  COLUMN_HAS_RESPLENDENT,
  COLUMN_RATING,
} from '~/utils/types/units'
import { STATS_IVS_COLORS } from '~/utils/types/units-stats'

definePageMeta({
  layout: 'units-filters',
})

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

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

const columns = ref(new Set(DEFAULT_COLUMNS))
const columnsMobile = computed({
  get: () => Array.from(columns.value),
  set: (newColumns) => {
    columns.value = new Set(newColumns)
  },
})

const headers = computed(() =>
  filter(
    ALL_COLUMNS,
    (column) => column == COLUMN_THUMBNAIL || columns.value.has(column),
  ).map((column) => ({
    title:
      column === COLUMN_THUMBNAIL
        ? undefined
        : t(`units.index.headers.${column}`),
    key: column,
    align: COLUMNS_START_ALIGNED.has(column) ? 'start' : 'center',
    sortable: column !== COLUMN_THUMBNAIL,
  })),
)

interface Options {
  // page: Ref<number>
  // itemsPerPage: Ref<number>
  // sortBy: Ref<readonly DataTableSortItem[]>
  // groupBy: Ref<readonly DataTableSortItem[]>
  // search: Ref<string | undefined>
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

function updateUnits(options: Options) {
  // options { page: 1, itemsPerPage: 10, sortBy: [], groupBy: [], search: undefined }
  // console.log('options', options, typeof options.sortBy, typeof options.groupBy)
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  sortBy.value = options.sortBy
  groupBy.value = options.groupBy
  search.value = options.search
}

const columnsForSelect = computed(() =>
  COLUMNS_IN_FILTERS.map((column) => ({
    title: t(`units.index.headers.${column}`),
    value: column,
  })),
)
</script>
