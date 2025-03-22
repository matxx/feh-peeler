<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="mobile ? 12 : 3">
        <div
          class="d-flex align-center"
          :class="{ 'mb-3': !mobile }"
        >
          <div
            v-show="mobile"
            class="mr-3"
          >
            <UnitScoresSettingsMobile :active="anyFilterMobile">
              <template #drawer>
                <div class="pa-5 pt-2">
                  <UnitScoresSettings
                    v-model:filters="filters"
                    v-model:sorters="sorters"
                    :size-sorters="sizeSorters"
                    :size-filters="sizeFilters"
                    @update:sorters="updateSorters"
                  />
                </div>
              </template>
            </UnitScoresSettingsMobile>
          </div>
          <div>
            {{ t('global.inpiredBy') }}
            <!-- eslint-disable vue/html-closing-bracket-newline -->
            <a
              href="https://www.reddit.com/user/TiniestManatee/"
              target="_blank"
              class="text-decoration-none"
            >
              @TiniestManatee</a
            >
            Reddit
            <!-- eslint-enable vue/html-closing-bracket-newline -->
            <a
              href="https://www.reddit.com/r/FireEmblemHeroes/comments/1h1ct31/f2p_arena_scoring_options_up_to_november_27_2024/"
              target="_blank"
              class="text-decoration-none"
            >
              {{ t('global.post') }}
            </a>
          </div>
        </div>

        <div v-show="mobile">
          <v-text-field
            v-model="filters.name"
            :color="searchIsActive ? 'success' : 'primary'"
            :counter="counter"
            density="compact"
            clearable
            class="mt-5"
            :label="t('scores.labels.unitName')"
          />
        </div>

        <UnitScoresSettings
          v-show="!mobile"
          v-model:filters="filters"
          v-model:sorters="sorters"
          :size-sorters="sizeSorters"
          :size-filters="sizeFilters"
          @update:sorters="updateSorters"
        />
      </v-col>

      <v-col
        :cols="mobile ? 12 : 9"
        class="position-relative"
      >
        <v-overlay
          contained
          :model-value="storeUnits.isLoading"
          class="d-flex justify-space-around align-center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-overlay>

        <div>
          <div class="scores__line">
            <h4 class="scores__score">
              {{ t('scores.headers.score') }}
            </h4>
            <h4 class="scores_units">
              {{ t('scores.headers.units') }}
            </h4>
          </div>
          <div
            v-for="score in scores"
            :key="score"
          >
            <div class="scores__line">
              <div class="scores__score pt-4">
                <div>
                  {{ score }}
                </div>
              </div>
              <client-only v-if="unitsByMaxScore[score]">
                <RecycleScroller
                  v-slot="{ item }"
                  class="scroller"
                  :items="unitsByMaxScore[score]"
                  :item-size="totalSize"
                  key-field="id"
                  direction="horizontal"
                >
                  <a
                    :href="storeLinks.unit(item)"
                    target="_blank"
                  >
                    <CompoUnitThumbnail
                      :unit="item"
                      :size="size"
                      :size-corner="sizeCorner"
                    />
                  </a>
                </RecycleScroller>
              </client-only>
            </div>

            <div>
              <div>
                <v-alert
                  v-if="score === '760'"
                  border="start"
                  type="warning"
                  variant="tonal"
                  elevation="2"
                  class="mt-2 mb-2"
                  density="compact"
                >
                  > Dragons with PRF weapon +
                  <a
                    :href="l('Category:Duel Passives')"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    Duel (A Passive)
                    <!-- <v-icon size="x-small">mdi-open-in-new</v-icon> -->
                  </a>
                  +
                  <a
                    :href="l('High Dragon Wall')"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    HDW (B Passive)
                  </a>
                  +
                  <a
                    :href="l('Sacred Seals')"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    300 SP seal
                  </a>
                </v-alert>

                <v-alert
                  v-else-if="score === '758'"
                  border="start"
                  type="warning"
                  variant="tonal"
                  elevation="2"
                  class="mt-2 mb-2"
                  density="compact"
                >
                  > Units with PRF weapon +
                  <a
                    :href="l('Category:Duel Passives')"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    Duel (A Passive)
                  </a>
                  +
                  <a
                    :href="l('Sacred Seals')"
                    target="_blank"
                    class="text-decoration-none"
                  >
                    300 SP seal
                  </a>
                </v-alert>

                <v-alert
                  v-else-if="score === '756'"
                  border="start"
                  type="warning"
                  variant="tonal"
                  elevation="2"
                  class="mt-2 mb-2"
                  density="compact"
                >
                  <div>
                    > Units with PRF weapon +
                    <a
                      :href="l('Category:Duel Passives')"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      Duel (A Passive)
                    </a>
                    +
                    <a
                      :href="l('Sacred Seals')"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      240 SP seal
                    </a>
                  </div>
                  <div>
                    > Units with NO PRF weapon +
                    <a
                      :href="l('Category:Duel Passives')"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      Duel (A Passive)
                    </a>
                    +
                    <a
                      :href="l('Sacred Seals')"
                      target="_blank"
                      class="text-decoration-none"
                    >
                      300 SP seal
                    </a>
                  </div>
                </v-alert>
              </div>
            </div>

            <v-divider />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import flow from 'lodash-es/flow'
import some from 'lodash-es/some'
import filter from 'lodash-es/filter'
import sortBy from 'lodash-es/sortBy'
import groupBy from 'lodash-es/groupBy'
import compact from 'lodash-es/compact'
import debounce from 'lodash-es/debounce'
import intersection from 'lodash-es/intersection'

import { DEBOUNCE_TIME, MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

import type { IUnit } from '@/utils/types/units'
import * as a from '@/utils/types/units-availabilities'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  // LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'
import {
  WEAPON_AGGREGATIONS_FOR_FILTERS,
  WEAPON_AGGREGATED_TYPES,
} from '@/utils/types/weapons'
import type { AggregatedWeaponType } from '@/utils/types/weapons'

import type { IFilters, ISorter, ISorters } from '@/utils/types/scores'
import { createFilters, createSorters, sort } from '@/utils/types/scores'

const { l } = useFandom()
const { t } = useI18n()
const { mobile } = useDisplay()
const storeLinks = useStoreLinks()
const storeSearches = useStoreSearches()

const storeUnits = useStoreUnits()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()

onMounted(() => {
  storeUnits.load()
  storeUnitsAvailabilities.load()
})

const totalSize = 60
const totalSizePx = computed(() => `${totalSize}px`)
const size = 40
const sizeCorner = 15
const sizeSorters = 20
const sizeFilters = 20

const filters = ref<IFilters>(createFilters())
const sorters = ref<ISorters>(createSorters())

const anyFilterMobile = computed(
  () =>
    filters.value.traits.length > 0 ||
    filters.value.moves.length > 0 ||
    filters.value.weapons.length > 0 ||
    filters.value.availabilities.length > 0 ||
    filters.value.isDuo ||
    filters.value.isHarmonized ||
    filters.value.isRefresher ||
    false,
)

function updateSorters([index, sorter]: [number, ISorter]) {
  if (!sorters.value) return

  sorters.value.fields[index] = sorter.field
  sorters.value.orders[index] = sorter.order
}

const searchLength = computed(() =>
  filters.value.name ? filters.value.name.length : 0,
)
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const regexp = computed(() =>
  filters.value.name ? storeSearches.filterToRegexp(filters.value.name) : null,
)

function filterName(u: IUnit) {
  if (!regexp.value) return true
  if (!searchIsActive.value) return true

  return u.filterableName.match(regexp.value)
}

function filterMoveType(filters: IFilters, u: IUnit) {
  if (filters.moves.length === 0) return true

  return filters.moves.includes(u.move_type)
}

function filterWeaponType(filters: IFilters, u: IUnit) {
  if (filters.weapons.length === 0) return true
  if (filters.weapons.includes(u.weapon_type)) return true

  // @ts-expect-error lodash unsafe function
  const aggregators: AggregatedWeaponType[] = intersection(
    filters.weapons,
    WEAPON_AGGREGATED_TYPES,
  )
  if (aggregators.length === 0) return false

  return some(aggregators, (aggregator) =>
    WEAPON_AGGREGATIONS_FOR_FILTERS[aggregator].includes(u.weapon_type),
  )
}

function filterAvailability(filters: IFilters, u: IUnit) {
  if (filters.availabilities.length === 0) return true

  const availability = storeUnitsAvailabilities.availabilitiesById[u.id]
  if (!availability) return false

  if (
    availability.is_in[HEROIC_GRAILS] &&
    filters.availabilities.includes(a.AV_SCORE_HEROIC_GRAILS)
  ) {
    return true
  }
  // if (
  //   availability.is_in[LIMITED_DIVINE_CODES] &&
  //   filters.availabilities.includes(a.AV_SCORE_LIMITED_DIVINE_CODES)
  // ) {
  //   return true
  // }
  if (
    availability.is_in[NORMAL_DIVINE_CODES] &&
    filters.availabilities.includes(a.AV_SCORE_NORMAL_DIVINE_CODES)
  ) {
    return true
  }
  if (
    availability.is_in[FOCUS_ONLY] &&
    filters.availabilities.includes(a.AV_SCORE_LIMITED_HEROES)
  ) {
    return true
  }

  if (availability.is_in[GENERIC_SUMMON_POOL]) {
    switch (availability.lowest_rarity[GENERIC_SUMMON_POOL]) {
      case 3:
      case 4:
        if (filters.availabilities.includes(a.AV_SCORE_GENERIC_POOL_3_4))
          return true
        break
      case 4.5:
        if (filters.availabilities.includes(a.AV_SCORE_GENERIC_POOL_45))
          return true
        break
      case 5:
        if (filters.availabilities.includes(a.AV_SCORE_GENERIC_POOL_5))
          return true
    }
  }

  if (availability.is_in[SPECIAL_SUMMON_POOL]) {
    switch (availability.lowest_rarity[SPECIAL_SUMMON_POOL]) {
      case 4:
        if (filters.availabilities.includes(a.AV_SCORE_SPECIAL_POOL_4))
          return true
        break
      case 4.5:
        if (filters.availabilities.includes(a.AV_SCORE_SPECIAL_POOL_45))
          return true
        break
      case 5:
        if (filters.availabilities.includes(a.AV_SCORE_SPECIAL_POOL_5))
          return true
    }
  }

  return false
}

// https://stackoverflow.com/a/78061467/5032734
const f =
  <V, I, R>(func: (v: V, i: I) => R, i: I) =>
  (v: V) =>
    func(v, i)

const getFilteredUnits = () =>
  flow(
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) => filterName(u)),
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) => filterMoveType(filters.value, u)),
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) => filterWeaponType(filters.value, u)),
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) => filterAvailability(filters.value, u)),
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) =>
      filters.value.isRefresher ? u.is_refresher : true,
    ),
    // @ts-expect-error unsafe typings
    f(filter, (u: IUnit) => {
      if (
        !filters.value.isDuo &&
        !filters.value.isHarmonized &&
        filters.value.traits.length === 0
      ) {
        return true
      }

      if (filters.value.isDuo && u.is_duo) return true
      if (filters.value.isHarmonized && u.is_harmonized) return true

      if (
        some(filters.value.traits, (trait) => {
          if (u[trait]) return true
        })
      ) {
        return true
      }

      return false
    }),
  )(storeUnits.units)

const isUpdating = ref(false)
const updateFilteredUnits = debounce(() => {
  if (isUpdating.value) return

  isUpdating.value = true
  nextTick(() => {
    filteredUnits.value = getFilteredUnits()
    isUpdating.value = false
  })
}, DEBOUNCE_TIME)

const filteredUnits = ref<IUnit[]>([])
const sortedUnits = computed(() => sort(filteredUnits.value, sorters.value))
const unitsByMaxScore = computed(() => groupBy(sortedUnits.value, 'max_score'))
const scores = computed(() =>
  sortBy(compact(Object.keys(unitsByMaxScore.value))).reverse(),
)

onMounted(updateFilteredUnits)
watch(filters, updateFilteredUnits, { deep: true })
watch(() => storeUnits.units, updateFilteredUnits)
watch(() => storeSearches.useRegExp, updateFilteredUnits)
</script>

<style lang="scss" scoped>
.scroller {
  height: v-bind('totalSizePx');
}

.scores__line {
  display: flex;
}
.scores__score {
  flex: 0 0 60px;

  display: flex;
  align-items: start;
  justify-content: center;
}
.scores_units {
  flex: 1;
  overflow-x: auto;
}
.scores__units__content {
  display: flex;
  flex-wrap: nowrap;
}
</style>
