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
          v-for="column in skillsColumns.COLUMNS_IN_FILTERS"
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

    <div ref="mobile-skills-filter-name" />

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="storeSkillsFilters.skillsFilteredCount"
      :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
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
      <template #[`header.${skillsColumns.COLUMN_THUMBNAIL}`]>
        <v-btn
          v-tooltip="t('skills.index.resetSorting')"
          size="x-small"
          flat
          icon="mdi-restart"
          @click="sortBy = []"
        />
      </template>

      <template #[`item.${skillsColumns.COLUMN_THUMBNAIL}`]="{ item }">
        <div class="d-flex justify-center align-center">
          <NuxtLink
            href="#"
            @click.prevent="storeGlobals.showSkill(item.id)"
          >
            <SkillImg
              v-tooltip="item.name"
              :skill="item"
              :size="size"
              class="d-block"
            />
          </NuxtLink>
        </div>
      </template>
      <template #[`item.${skillsColumns.COLUMN_NAME}`]="{ item }">
        <NuxtLink
          href="#"
          @click.prevent="storeGlobals.showSkill(item.id)"
        >
          {{ item.name }}
        </NuxtLink>
      </template>
      <template #[`item.${skillsColumns.COLUMN_RELEASE_DATE}`]="{ item }">
        {{ storeDataSkills.skillsById[item.baseId].release_date }}
      </template>
      <template #[`item.${skillsColumns.COLUMN_VERSION}`]="{ item }">
        {{ storeDataSkills.skillsById[item.baseId].version }}
      </template>
      <template #[`item.${skillsColumns.COLUMN_SLOT}`]="{ item }">
        <div class="d-flex justify-center align-center">
          <SkillImgCategory
            :category="item.category"
            :size="size"
          />
        </div>
      </template>
      <template #[`item.${skillsColumns.COLUMN_EFFECTIVENESS}`]="{ item }">
        <SkillShowEffectivenessList
          :skill="item"
          :size="size"
        />
      </template>

      <template #[`item.${skillsColumns.COLUMN_PRF}`]="{ item }">
        <AppDisplayBool :bool="item.is_prf" />
      </template>
      <template #[`item.${skillsColumns.COLUMN_MAX}`]="{ item }">
        <AppDisplayBool :bool="!item.upgrade_ids" />
      </template>

      <template #[`item.${skillsColumns.COLUMN_OWNERS}`]="{ item }">
        <SkillShowOwnersThumbnails
          :skill="item"
          :tile-size="size"
        />
      </template>
      <template #[`item.${skillsColumns.COLUMN_AVAILABILITY}`]="{ item }">
        <SkillAvailability
          :skill="item"
          :tile-size="size"
        />
      </template>
      <template #[`item.${skillsColumns.COLUMN_PRE_INHERITANCE}`]="{ item }">
        <SkillOwnersPreInheritances
          :skill="item"
          :tile-size="size"
          :skill-icon-size="size"
        />
      </template>
      <template #[`item.${skillsColumns.COLUMN_RESTRICTIONS}`]="{ item }">
        <SkillRestrictions
          :skill="item"
          :size="size"
        />
      </template>

      <template #[`item.${skillsColumns.COLUMN_DESCRIPTION}`]="{ item }">
        <SkillDescription :skill="item" />
      </template>

      <template #[`item.${skillsColumns.COLUMN_RATING}`]="{ item }">
        {{ storeDataSkillsRatingsGame8.byId[item.id]?.game8_rating }}
      </template>
      <template #[`item.${skillsColumns.COLUMN_GRADE}`]="{ item }">
        <div class="d-flex justify-center align-center">
          <AppIconGradeOrPlaceholder
            :grade="storeDataSkillsRatingsGame8.byId[item.id]?.game8_grade"
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

import * as skillsColumns from '~/utils/types/skills-columns'
import * as skillsSorters from '~/utils/types/skills-sorters'

definePageMeta({
  layout: 'skills-filters',
})

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

const div = useTemplateRef('mobile-skills-filter-name')
onMounted(() => {
  storeGlobals.setMobileSkillFilterElem(div.value)
})
onBeforeUnmount(() => {
  storeGlobals.setMobileSkillFilterElem()
})

const storeDataSkills = useStoreDataSkills()
const storeDataSkillsRatingsGame8 = useStoreDataSkillsRatingsGame8()
const { isLoading } = useDataStores([
  storeDataSkills,
  storeDataSkillsRatingsGame8,
  useStoreDataSkillsDescriptions(),
])

const size = 40

const storeSkillsFilters = useStoreSkillsFilters()
storeSkillsFilters.$reset()

const columns = ref(new Set(skillsColumns.DEFAULT_COLUMNS))
const columnsMobile = computed({
  get: () => Array.from(columns.value),
  set: (newColumns) => {
    columns.value = new Set(newColumns)
  },
})

const headers = computed(() =>
  filter(
    skillsColumns.ALL_COLUMNS,
    (column) =>
      column == skillsColumns.COLUMN_THUMBNAIL || columns.value.has(column),
  ).map((column) => ({
    title: t(`skills.index.headers.${column}`),
    key: column,
    align: skillsColumns.COLUMNS_START_ALIGNED.has(column) ? 'start' : 'center',
    sortable: !skillsColumns.COLUMNS_UNSORTABLE.has(column),
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
      const res = skillsSorters.COLUMN_TO_SORT[column.key]
      if (res) return res

      Sentry.captureException(`unhandled column key: ${column.key}`, {
        tags: { locator: 'pages/skills.vue#translate' },
      })
      return skillsSorters.SORT_NOTHING
    }),
    orders: sortBy.map((column) => {
      switch (column.order) {
        case 'asc':
          return skillsSorters.ASC
        case 'desc':
          return skillsSorters.DESC
        default:
          Sentry.captureException(`unhandled column order: ${column.order}`, {
            tags: { locator: 'pages/skills.vue#translate' },
          })
          return skillsSorters.ASC
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
  skillsColumns.COLUMNS_IN_FILTERS.map((column) => ({
    title: t(`skills.index.headers.${column}`),
    value: column,
  })),
)
</script>
