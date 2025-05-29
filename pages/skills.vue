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
        :label="t('skills.index.columnsDisplayed')"
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
          {{ t(`skills.index.headers.${column}`) }}
        </v-btn>
      </div>
    </div>

    <div id="mobile-skills-filter-name" />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="storeSkillsFilters.skillsFilteredCount"
      :loading="storeSkillsFilters.isUpdating"
      :search="
        storeSkillsFilters.filters.name === null
          ? undefined
          : storeSkillsFilters.filters.name
      "
      multi-sort
      :sort-by="sortBy"
      @update:options="updateSkills"
    >
      <template #[`header.${COLUMN_THUMBNAIL}`]>
        <v-btn
          v-tooltip="t('skills.index.resetSorting')"
          icon
          size="x-small"
          flat
          @click="sortBy = []"
        >
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </template>

      <template #[`item.${COLUMN_THUMBNAIL}`]="{ item }">
        <NuxtLink
          class="d-flex justify-center"
          href="#"
          @click.prevent="storeGlobals.showSkill(item.id)"
        >
          <SkillImg
            v-tooltip="item.name"
            :skill="item"
            :size="size"
          />
        </NuxtLink>
      </template>
      <template #[`item.${COLUMN_NAME}`]="{ item }">
        {{ item.name }}
      </template>
      <template #[`item.${COLUMN_SLOT}`]="{ item }">
        <div class="d-flex justify-center">
          <SkillImgCategory
            :category="item.category"
            :size="size"
          />
        </div>
      </template>
      <template #[`item.${COLUMN_EFFECTIVENESS}`]="{ item }">
        <SkillShowEffectivenessList
          :skill="item"
          :size="size"
        />
      </template>

      <template #[`item.${COLUMN_PRF}`]="{ item }">
        <AppDisplayBool :bool="item.is_prf" />
      </template>
      <template #[`item.${COLUMN_MAX}`]="{ item }">
        <AppDisplayBool :bool="!item.upgrade_ids" />
      </template>

      <template #[`item.${COLUMN_AVAILABILITY}`]="{ item }">
        <SkillAvailability
          :skill="item"
          :tile-size="size"
        />
      </template>
      <template #[`item.${COLUMN_PRE_INHERITANCE}`]="{ item }">
        <SkillFodderPreInheritances
          :skill="item"
          :tile-size="size"
          :skill-icon-size="size"
        />
      </template>
      <template #[`item.${COLUMN_RESTRICTIONS}`]="{ item }">
        <SkillRestrictions
          :skill="item"
          :size="size"
        />
      </template>

      <template #[`item.${COLUMN_DESCRIPTION}`]="{ item }">
        {{ storeDataSkillsDescriptions.byId[item.id]?.description }}
      </template>

      <template #[`item.${COLUMN_RATING}`]="{ item }">
        {{ storeDataSkillsRatingsGame8.byId[item.id]?.game8_rating }}
      </template>
      <template #[`item.${COLUMN_GRADE}`]="{ item }">
        <div class="d-flex justify-center">
          <AppIconGradeOrPlaceholder
            :grade="storeDataSkillsRatingsGame8.byId[item.id]?.game8_grade"
            :size="size"
          />
        </div>
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
  COLUMN_SLOT,
  COLUMN_PRF,
  COLUMN_SP,
  COLUMN_CD,
  COLUMN_TIER,
  COLUMN_MAX,
  COLUMN_EFFECTIVENESS,
  COLUMN_RATING,
  COLUMN_GRADE,
  COLUMN_DESCRIPTION,
  COLUMN_RESTRICTIONS,
  COLUMN_AVAILABILITY,
  COLUMN_PRE_INHERITANCE,
} from '~/utils/types/skills-columns'
import {
  SORT_NAME,
  SORT_SLOT,
  SORT_PRF,
  SORT_SP,
  SORT_CD,
  SORT_TIER,
  SORT_EFFECTIVENESS,
  SORT_MAX,
  SORT_RATING,
  SORT_GRADE,
  SORT_DESCRIPTION,
  SORT_RESTRICTIONS,
  SORT_AVAILABILITY,
  SORT_PRE_INHERITANCE,
  SORT_NOTHING,
  ASC,
  DESC,
} from '~/utils/types/skills-sorters'

definePageMeta({
  layout: 'skills-filters',
})

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

const storeDataSkillsRatingsGame8 = useStoreDataSkillsRatingsGame8()
const storeDataSkillsDescriptions = useStoreDataSkillsDescriptions()
const { isLoading } = useDataStores([
  storeDataSkillsRatingsGame8,
  storeDataSkillsDescriptions,
])

const size = 40

const storeSkillsFilters = useStoreSkillsFilters()
storeSkillsFilters.$reset()

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
    title: t(`skills.index.headers.${column}`),
    key: column,
    align: COLUMNS_START_ALIGNED.has(column) ? 'start' : 'center',
    sortable: column !== COLUMN_THUMBNAIL,
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
  storeSkillsFilters.skillsFilteredSorted.slice(start.value, end.value),
)

function translate(sortBy: DataTableSortItem[]) {
  return {
    fields: sortBy.map((column) => {
      switch (column.key) {
        case COLUMN_NAME:
          return SORT_NAME
        case COLUMN_SLOT:
          return SORT_SLOT
        case COLUMN_PRF:
          return SORT_PRF
        case COLUMN_SP:
          return SORT_SP
        case COLUMN_CD:
          return SORT_CD
        case COLUMN_TIER:
          return SORT_TIER
        // proxy fields
        case COLUMN_EFFECTIVENESS:
          return SORT_EFFECTIVENESS
        case COLUMN_MAX:
          return SORT_MAX
        case COLUMN_RATING:
          return SORT_RATING
        case COLUMN_GRADE:
          return SORT_GRADE
        case COLUMN_DESCRIPTION:
          return SORT_DESCRIPTION
        case COLUMN_RESTRICTIONS:
          return SORT_RESTRICTIONS
        case COLUMN_AVAILABILITY:
          return SORT_AVAILABILITY
        case COLUMN_PRE_INHERITANCE:
          return SORT_PRE_INHERITANCE
        default:
          console.warn(`unhandled column key: ${column.key}`)
          return SORT_NOTHING
      }
    }),
    orders: sortBy.map((column) => {
      switch (column.order) {
        case 'asc':
          return ASC
        case 'desc':
          return DESC
        default:
          console.warn(`unhandled column order: ${column.order}`)
          return ASC
      }
    }),
  }
}

function updateSkills(options: Options) {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  sortBy.value = options.sortBy
  groupBy.value = options.groupBy
  search.value = options.search

  storeSkillsFilters.sorters = translate(options.sortBy)
}

const columnsForSelect = computed(() =>
  COLUMNS_IN_FILTERS.map((column) => ({
    title: t(`skills.index.headers.${column}`),
    value: column,
  })),
)
</script>
