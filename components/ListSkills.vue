<template>
  <v-data-table-virtual
    v-if="model"
    :headers="displayedHeadersNotSortable"
    :items="skillsDisplayed"
    :row-props="rowProps"
    class="text-no-wrap"
  >
    <template #[`item.actions`]="{ item }">
      <div class="d-flex">
        <v-btn
          v-if="canEquipSkill"
          v-tooltip:top="t('global.listSkills.equip')"
          :disabled="highlightedSkill?.id === item.id"
          flat
          icon
          :size="SKILL_ICON_SIZE"
          @click="$emit('equip', item)"
        >
          <v-icon :color="storeTheme.highlightBgColor">mdi-check-bold</v-icon>
        </v-btn>
      </div>
    </template>

    <template #[`item.image`]="{ item }">
      <div class="fill-height d-flex justify-space-around align-center">
        <SkillImg
          :skill="item"
          :size="SKILL_ICON_SIZE"
        />
      </div>
    </template>

    <template #[`item.name`]="{ item }">
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showSkill(item.id)"
      >
        {{ item.name }}
      </NuxtLink>
    </template>

    <template #[`item.game8_rating`]="{ item }">
      {{ storeDataSkillsRatingsGame8.byId[item.baseId]?.game8_rating }}
    </template>
    <template #[`item.game8_grade`]="{ item }">
      {{ storeDataSkillsRatingsGame8.byId[item.baseId]?.game8_grade }}
    </template>
    <template #[`item.description`]="{ item }">
      <div
        class="text-reset-wrap"
        :class="{ 'width-500px': mobile }"
      >
        <SkillDescription :skill="item" />
      </div>
    </template>
    <template #[`item.restrictions`]="{ item }">
      <SkillRestrictions
        :skill="item"
        :size="SKILL_ICON_SIZE"
      />
    </template>

    <template #top>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="i in filterIndexes"
            :key="i"
            :cols="columnsSize"
          >
            <v-text-field
              v-model="model[i]"
              :loading="isUpdating"
              clearable
              :counter="
                model[i] && model[i].length >= MINIMAL_TEXT_SEARCH_LENGTH
                  ? undefined
                  : 3
              "
              :color="
                model[i] && model[i].length >= MINIMAL_TEXT_SEARCH_LENGTH
                  ? 'success'
                  : 'primary'
              "
              :label="
                filtersCount > 1
                  ? t('skillsList.labels.choice', { number: i + 1 })
                  : t('global.name')
              "
              :bg-color="
                highlightedFiltersIndexes.includes(i + 1)
                  ? storeTheme.highlightBgColor
                  : undefined
              "
              :error-messages="errorMessages[category][i]"
              density="compact"
              @focus="lastFocusedInput = i"
            >
              <template #prepend-inner>
                <SkillImgCategory
                  :category="category"
                  :size="IMG_SIZE"
                />
                :
              </template>
              <template #append>
                <v-btn
                  v-if="i + 1 < filtersCount"
                  icon="mdi-swap-horizontal"
                  size="x-small"
                  @click="swapFilters(i, i + 1)"
                />
                <v-btn
                  v-else-if="canClearAll && filtersCount > 1"
                  v-tooltip="t('skillsList.tooltips.emptyFilters')"
                  icon="mdi-backspace"
                  size="x-small"
                  @click="clearAll"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table-virtual>
</template>

<script setup lang="ts">
import compact from 'lodash-es/compact'
import findIndex from 'lodash-es/findIndex'
import reject from 'lodash-es/reject'
import some from 'lodash-es/some'
import sortBy from 'lodash-es/sortBy'

// @ts-expect-error not exported by vuetify
import type { ItemKeySlot } from 'vuetify'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'
import {
  filterByName,
  type ISkill,
  type SkillCategory,
} from '~/utils/types/skills'

const IMG_SIZE = 18
const SKILL_ICON_SIZE = 30

const { t } = useI18n()
const { mobile } = useDisplay()
const storeTheme = useStoreTheme()
const storeGlobals = useStoreGlobals()

const storeDataSkills = useStoreDataSkills()
const storeDataSkillsRatingsGame8 = useStoreDataSkillsRatingsGame8()

defineEmits(['equip'])
const model = defineModel<string[]>()
const props = withDefaults(
  defineProps<{
    category: SkillCategory
    regexps: RegExpsBySkillCategory
    errorMessages: ErrorMessagesBySkillCategory
    filtersCount?: number
    canClearAll?: boolean
    highlightedFiltersIndexes?: number[]
    canEquipSkill?: boolean
    highlightedSkill?: null | ISkill
    showRestrictions?: boolean
    showDescriptions?: boolean
    filtersOnNewLines?: boolean
  }>(),
  {
    filtersCount: 0,
    canClearAll: false,
    highlightedFiltersIndexes: () => [],
    canEquipSkill: false,
    highlightedSkill: null,
    showRestrictions: false,
    showDescriptions: false,
    filtersOnNewLines: false,
  },
)

const shouldDisplayActions = computed(() => props.canEquipSkill)

function clearAll() {
  model.value = Array.from({ length: props.filtersCount }, () => '')
}

const filterIndexes = computed(() =>
  Array.from({ length: props.filtersCount }, (_, i) => i),
)

const skills = computed(
  () => storeDataSkills.sortedSkillsByCategory[props.category] || [],
)

const GRID_COLUMN_COUNT = 12
const columnsSize = computed(() => {
  if (props.filtersOnNewLines) return GRID_COLUMN_COUNT

  return Math.floor(GRID_COLUMN_COUNT / props.filtersCount)
})

const headerKeys = computed(() => {
  const res = ['image', 'name', 'sp', 'game8_rating', 'game8_grade']
  if (props.showRestrictions) res.push('restrictions')
  if (props.showDescriptions) res.push('description')
  return res
})
const headers = computed(() =>
  headerKeys.value.map((key) => ({
    key,
    title: t(`skillsList.columns.${key}`),
  })),
)
const headersAndActions = computed(() =>
  [
    {
      key: 'actions',
      title: t('skillsList.columns.actions'),
    },
  ].concat(headers.value),
)
const displayedHeaders = computed(() =>
  shouldDisplayActions.value ? headersAndActions.value : headers.value,
)
const displayedHeadersNotSortable = computed(() =>
  displayedHeaders.value.map((header) => ({ ...header, sortable: false })),
)

const lastFocusedInput = ref<number | null>(null)

type SkillMatchedWithIndex = [ISkill, number]

const regexpsFromFilters = computed(() => {
  if (!model.value) return []

  return model.value.map((value, index) =>
    value && value.length >= MINIMAL_TEXT_SEARCH_LENGTH
      ? props.regexps[props.category][index]
      : null,
  )
})
const noRegexpsFromFilters = computed(
  () => regexpsFromFilters.value.length === 0,
)

const getSkillsMatchedWithIndex: () => SkillMatchedWithIndex[] = () => {
  if (!model.value) return []
  if (noRegexpsFromFilters.value) return []

  return skills.value.map((skill) => {
    if (props.highlightedSkill && skill.id === props.highlightedSkill.id) {
      return [skill, -2]
    }

    return [
      skill,
      findIndex(compact(regexpsFromFilters.value), (regexp) =>
        filterByName(skill, regexp),
      ),
    ]
  })
}

const skillsMatchedWithIndex = ref<SkillMatchedWithIndex[]>([])
const updateSkillsMatchedWithIndex = () => {
  skillsMatchedWithIndex.value = getSkillsMatchedWithIndex()
}
const { isUpdating } = useDebounce(updateSkillsMatchedWithIndex, [
  [regexpsFromFilters],
  [skills],
])

const skillsDisplayed = computed(() => {
  return sortBy(
    reject(
      skillsMatchedWithIndex.value,
      ([_skill, indexOfMatchedRegexp]) => indexOfMatchedRegexp === -1,
    ),
    ([_skill, indexOfMatchedRegexp]) => indexOfMatchedRegexp,
  ).map(([skill, _indexOfMatchedRegexp]) => skill)
})

function swapFilters(left: number, right: number) {
  if (!model.value) return

  const temp = model.value[left]
  model.value[left] = model.value[right]
  model.value[right] = temp
}

function rowProps(
  data: Pick<ItemKeySlot<ISkill>, 'item' | 'index' | 'internalItem'>,
) {
  if (props.highlightedSkill && data.item.id === props.highlightedSkill.id) {
    return storeTheme.highlightRowProps
  }

  if (!regexpsFromFilters.value) return

  return some(props.highlightedFiltersIndexes, (i) =>
    filterByName(data.item, regexpsFromFilters.value[i - 1]),
  )
    ? storeTheme.highlightRowProps
    : undefined
}
</script>
