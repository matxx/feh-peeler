<template>
  <div>
    <div class="d-flex align-center mb-3">
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

    <div ref="mobile-units-filter-name" />

    <div class="d-flex align-center mb-3">
      <v-checkbox
        v-model="doNotUseBPremiumSkills"
        :label="t('scores.doNotUseBPremiumSkills')"
        hide-details
        density="compact"
        class="mr-1"
      />

      <v-tooltip location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-bind="tooltipProps"
            color="info"
            size="xsmall"
          >
            mdi-information-outline
          </v-icon>
        </template>

        {{ t('scores.tooltipAboutBPremiumSkills.line1') }}
        <br />
        {{ t('scores.tooltipAboutBPremiumSkills.line2') }}
      </v-tooltip>
    </div>

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
            > Units with PRF weapon +
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
              :href="l('Passives#List of B Passives')"
              target="_blank"
              class="text-decoration-none"
            >
              400SP B Passive
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
              > Units without PRF weapon +
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

          <v-alert
            v-else-if="score === '754'"
            border="start"
            type="warning"
            variant="tonal"
            elevation="2"
            class="mt-2 mb-2"
            density="compact"
          >
            <div>
              > Units without PRF weapon +
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
          </v-alert>
        </div>
      </div>

      <v-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'
import groupBy from 'lodash-es/groupBy'
import compact from 'lodash-es/compact'

import { WEAPON_C_ST } from '~/utils/types/weapons'
import { createDefaultSortersForUnitsByMaxScore } from '~/utils/types/units-sorters'

definePageMeta({
  layout: 'units-filters',
})

const { l } = useFandom()
const { t } = useI18n()
const storeGlobals = useStoreGlobals()

const doNotUseBPremiumSkills = ref(false)

const div = useTemplateRef('mobile-units-filter-name')
onMounted(() => {
  storeGlobals.setMobileUnitFilterElem(div.value)
})
onBeforeUnmount(() => {
  storeGlobals.setMobileUnitFilterElem()
})

const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

onMounted(() => {
  storeDataUnits.load()
  storeDataUnitsAvailabilities.load()
})

const totalSize = 60
const totalSizePx = computed(() => `${totalSize}px`)
const size = 40
const sizeCorner = 15

const storeUnitsFilters = useStoreUnitsFilters()
storeUnitsFilters.$reset()
storeUnitsFilters.sorters = createDefaultSortersForUnitsByMaxScore()

const unitsByMaxScore = computed(() =>
  groupBy(storeUnitsFilters.unitsFilteredSorted, (u) => {
    if (u.weapon_type === WEAPON_C_ST) return u.max_score

    return doNotUseBPremiumSkills.value ? u.max_score - 2 : u.max_score
  }),
)
const scores = computed(() =>
  sortBy(compact(Object.keys(unitsByMaxScore.value))).reverse(),
)
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
