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
        :label="t('seals.index.columnsDisplayed')"
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
          v-for="column in sealsColumns.COLUMNS_IN_FILTERS"
          :key="column"
          size="x-small"
          class="text-primary mr-1 mb-1"
          :active="columns.has(column)"
          @click="
            columns.has(column) ? columns.delete(column) : columns.add(column)
          "
        >
          {{ t(`seals.index.headers.${column}`) }}
        </v-btn>
      </div>
    </div>

    <div ref="mobile-seals-filter-name" />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="storeSealsFilters.sealsFilteredCount"
      :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
      :loading="storeSealsFilters.isUpdating"
      :search="
        storeSealsFilters.filters.name === null
          ? undefined
          : storeSealsFilters.filters.name
      "
      multi-sort
      :sort-by="sortBy"
      @update:options="updateSeals"
    >
      <template #[`header.${sealsColumns.COLUMN_THUMBNAIL}`]>
        <v-btn
          v-tooltip="t('seals.index.resetSorting')"
          size="x-small"
          flat
          icon="mdi-restart"
          @click="sortBy = []"
        />
      </template>

      <template #[`item.${sealsColumns.COLUMN_THUMBNAIL}`]="{ item }">
        <div class="d-flex justify-center align-center">
          <NuxtLink
            href="#"
            @click.prevent="storeGlobals.showSeal(item.id)"
          >
            <SealImg
              v-tooltip="item.name"
              :seal="item"
              :size="size"
              class="d-block"
            />
          </NuxtLink>
        </div>
      </template>
      <template #[`item.${sealsColumns.COLUMN_NAME}`]="{ item }">
        <NuxtLink
          href="#"
          @click.prevent="storeGlobals.showSeal(item.id)"
        >
          {{ item.name }}
        </NuxtLink>
      </template>

      <template #[`item.${sealsColumns.COLUMN_MAX}`]="{ item }">
        <AppDisplayBool :bool="!item.upgrade_ids" />
      </template>

      <template #[`item.${sealsColumns.COLUMN_RESTRICTIONS}`]="{ item }">
        <SealRestrictions
          :seal="item"
          :size="size"
        />
      </template>

      <template #[`item.${sealsColumns.COLUMN_DESCRIPTION}`]="{ item }">
        <SealDescription :seal="item" />
      </template>

      <!-- <template #[`item.${sealsColumns.COLUMN_RATING}`]="{ item }">
        {{ storeDataSealsRatingsGame8.byId[item.id]?.game8_rating }}
      </template> -->
      <template #[`item.${sealsColumns.COLUMN_GRADE}`]="{ item }">
        <div class="d-flex justify-center align-center">
          <AppIconGradeOrPlaceholder
            :grade="storeDataSealsRatingsGame8.byId[item.id]?.game8_grade"
            :size="size"
          />
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import type { DataTableSortItem } from 'vuetify'
import * as Sentry from '@sentry/nuxt'
import filter from 'lodash-es/filter'

import * as sealsColumns from '~/utils/types/seals-columns'
import * as sealsSorters from '~/utils/types/seals-sorters'

definePageMeta({
  layout: 'seals-filters',
})

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

const div = useTemplateRef('mobile-seals-filter-name')
onMounted(() => {
  storeGlobals.setMobileSealFilterElem(div.value)
})
onBeforeUnmount(() => {
  storeGlobals.setMobileSealFilterElem()
})

const storeDataSeals = useStoreDataSeals()
const storeDataSealsRatingsGame8 = useStoreDataSealsRatingsGame8()
const { isLoading } = useDataStores([
  storeDataSeals,
  storeDataSealsRatingsGame8,
  useStoreDataSealsDescriptions(),
])

const size = 40

const storeSealsFilters = useStoreSealsFilters()
storeSealsFilters.$reset()

const columns = ref(new Set(sealsColumns.DEFAULT_COLUMNS))
const columnsMobile = computed({
  get: () => Array.from(columns.value),
  set: (newColumns) => {
    columns.value = new Set(newColumns)
  },
})

interface Header {
  title: string
  key: string
  align: 'start' | 'center'
  sortable: boolean
}
const headers = computed<Header[]>(() =>
  filter(
    sealsColumns.ALL_COLUMNS,
    (column) =>
      column == sealsColumns.COLUMN_THUMBNAIL || columns.value.has(column),
  ).map((column) => ({
    title: t(`seals.index.headers.${column}`),
    key: column,
    align: sealsColumns.COLUMNS_START_ALIGNED.has(column) ? 'start' : 'center',
    sortable: !sealsColumns.COLUMNS_UNSORTABLE.has(column),
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
  storeSealsFilters.sealsFilteredSorted.slice(start.value, end.value),
)

function translate(sortBy: DataTableSortItem[]) {
  return {
    fields: sortBy.map((column) => {
      const res = sealsSorters.COLUMN_TO_SORT[column.key]
      if (res) return res

      Sentry.captureException(`unhandled column key: ${column.key}`, {
        tags: { locator: 'pages/seals.vue#translate' },
      })
      return sealsSorters.SORT_NOTHING
    }),
    orders: sortBy.map((column) => {
      switch (column.order) {
        case 'asc':
          return sealsSorters.ASC
        case 'desc':
          return sealsSorters.DESC
        default:
          Sentry.captureException(`unhandled column order: ${column.order}`, {
            tags: { locator: 'pages/seals.vue#translate' },
          })
          return sealsSorters.ASC
      }
    }),
  }
}

function updateSeals(options: Options) {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  sortBy.value = options.sortBy
  groupBy.value = options.groupBy
  search.value = options.search

  storeSealsFilters.sorters = translate(options.sortBy)
}

const columnsForSelect = computed(() =>
  sealsColumns.COLUMNS_IN_FILTERS.map((column) => ({
    title: t(`seals.index.headers.${column}`),
    value: column,
  })),
)
</script>
