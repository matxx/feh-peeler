<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <TheWarningAboutLocalStorage class="mb-3" />

        <v-alert
          type="warning"
          border="start"
          variant="tonal"
          icon="mdi-account-hard-hat"
          prominent
        >
          This page is under construction. It is intended to have all the
          features of this
          <a
            href="https://arcticsilverfox.com/score_calc/"
            target="_blank"
            >Arena Score Calculator</a
          >
          (which is not updated anymore).
          <br />
          If you see a bug (example: difference in final scores), please file a
          bug report
          <a
            href="https://github.com/matxx/feh-peeler/issues/new"
            target="_blank"
            >here</a
          >. <br />
          Mjolnir Strike is probably not working correctly at the moment because
          not tested (waiting on the event to come back).
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="d-flex align-center">
          <v-btn
            v-tooltip="t('global.reset')"
            icon
            size="x-small"
            class="mr-3"
            @click="confirmReset"
          >
            <v-icon>mdi-restart</v-icon>
          </v-btn>

          <v-spacer />

          <AppDownloadUpload
            :payload="payloadToSave"
            file-name="Score.json"
            @uploaded="updateData"
          />

          <AppLocalstorageSaveStates
            :local-storage-key="LOCAL_STORAGE_KEY"
            :payload="payloadToSave"
            @loaded="updateData"
          />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title
            class="bg-primary d-flex justify-space-evenly"
            :class="{ 'flex-column': smAndDown }"
          >
            <div>
              <span>{{ t('scoreCalc.headers.score') }}:</span>
              {{ noUnit ? '-' : scoreRounded }}
              <span
                v-if="!noUnit"
                v-tooltip:bottom="t('scoreCalc.tooltips.scoreExact')"
              >
                ({{ scoreExact }})<!--
                --><sup>
                  <v-icon size="x-small">mdi-information-outline</v-icon>
                </sup>
              </span>
            </div>
            <div>
              <span>{{ t('scoreCalc.headers.offenseRange') }}:</span>
              {{ noUnit ? '-' : offenseScoreMin }} to
              {{ noUnit ? '-' : offenseScoreMax }}
            </div>
            <div>
              <span>{{ t('scoreCalc.headers.defenseScore') }}:</span>
              {{ noUnit ? '-' : defenseScore }}
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="6"
                  md="3"
                >
                  <v-checkbox
                    v-model="hasBonusUnit"
                    :label="t('scoreCalc.labels.hasBonusUnit')"
                    density="compact"
                    hide-details
                  />
                </v-col>
                <v-col
                  cols="6"
                  md="3"
                >
                  <v-switch
                    v-model="isMjolnirStrike"
                    density="compact"
                    hide-details
                    :label="
                      isMjolnirStrike
                        ? t('scoreCalc.labels.mjolnirStrike')
                        : t('scoreCalc.labels.arena')
                    "
                  />
                </v-col>

                <template v-if="isMjolnirStrike">
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <v-select
                      v-model="mjolnirStrikeMajor"
                      :items="itemsForElementsMythic"
                      clearable
                      density="compact"
                      hide-details
                      :label="t('scoreCalc.labels.majorBlessing')"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <v-select
                      v-model="mjolnirStrikeMinor"
                      :items="itemsForElementsMythic"
                      clearable
                      density="compact"
                      hide-details
                      :label="t('scoreCalc.labels.minorBlessing')"
                    />
                  </v-col>
                </template>
                <template v-else>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <v-select
                      v-model="seasonElements[0]"
                      :items="itemsForElementsLegendary"
                      clearable
                      density="compact"
                      hide-details
                      :label="
                        t('scoreCalc.labels.seasonElements', { index: 1 })
                      "
                    />
                  </v-col>
                  <v-col
                    cols="6"
                    md="3"
                  >
                    <v-select
                      v-model="seasonElements[1]"
                      :items="itemsForElementsLegendary"
                      clearable
                      density="compact"
                      hide-details
                      :label="
                        t('scoreCalc.labels.seasonElements', { index: 2 })
                      "
                    />
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        v-for="(unit, index) in units"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <ScoreCalcUnitCard
          :score-context="scoreContext"
          :unit-instance="unit"
          :index="index"
          :is-loading="isLoading"
          :is-closed="areUnitsDetailsClosed[index]"
          @select-unit="selectUnit(unit, $event)"
          @update-unit="updateUnit(unit, $event)"
          @replace-unit="replaceUnit(index, $event)"
          @select-skill="selectSkill(unit, $event)"
          @select-sp="selectSp(unit, $event)"
          @update-score="updateScore(index, $event)"
          @toggle-details="toggleDetails(index)"
        />
      </v-col>
    </v-row>

    <v-row
      dense
      class="mt-5"
    >
      <v-col>
        <h4>{{ t('scoreCalc.tips.header') }}</h4>
        <ol class="pl-5">
          <li>{{ t('scoreCalc.tips.useFourUnitsRarity5Level40') }}</li>
          <li>{{ t('scoreCalc.tips.useUnitsWithMaxMerges') }}</li>
          <li>{{ t('scoreCalc.tips.useMaxSpSkills') }}</li>
          <li>{{ t('scoreCalc.tips.useABonusLegendaryUnit') }}</li>
          <li>{{ t('scoreCalc.tips.useUpToTwoLegendaries') }}</li>
          <li>{{ t('scoreCalc.tips.blessYourUnits') }}</li>
        </ol>
        <p class="mt-3">
          {{ t('scoreCalc.tips.chooseHighestBstUnits') }}
          <i18n-t
            keypath="scoreCalc.tips.findTierlist"
            tag="span"
            scope="global"
          >
            <template #link>
              <NuxtLink :to="localePath('units-maximum-scores')">
                {{ t('global.here') }}
              </NuxtLink>
            </template>
          </i18n-t>
        </p>
        <p class="mt-3">
          <a
            href="https://imgur.com/NycQzxt"
            target="_blank"
          >
            {{ t('scoreCalc.tips.completeFormulae') }}
          </a>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import max from 'lodash-es/max'
import filter from 'lodash-es/filter'
import compact from 'lodash-es/compact'

import type { SkillCategory, SkillId } from '~/utils/types/skills'
import {
  getEmptyTeamInScoreCalc,
  getEmptyUnitInstanceSkillSPs,
  OFFENSE_SCORE_DIFF_MAX,
  OFFENSE_SCORE_DIFF_MIN,
  TEAM_BASE_SCORE,
  type EditableKey,
  type IUnitInstanceInScoreCalc,
  type ScoreContext,
} from '~/utils/types/score-calc'
import { getEmptyUnitInstanceSkillIds, type UnitId } from '~/utils/types/units'
import {
  SORTED_LEGENDARY_ELEMENTS,
  type ElementLegendary,
  type ElementMythic,
} from '~/utils/types/units-filters'
import { objectFromEntries } from '~/utils/functions/typeSafe'
import { mean } from '~/utils/functions/math'

const { t } = useI18n()
const { sm, smAndDown } = useDisplay()
const localePath = useLocalePath()
const { itemsForElementsLegendary, itemsForElementsMythic } = useSelects()

const storeDataUnits = useStoreDataUnits()
const storeDataSkills = useStoreDataSkills()
const { isLoading: isLoadingData } = useDataStores([
  storeDataUnits,
  useStoreDataUnitsStats(),
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
])

const DEFAULT_VALUES = {
  hasBonusUnit: true,
  seasonElements: [],
  isMjolnirStrike: false,
  mjolnirStrikeMinor: null,
  mjolnirStrikeMajor: null,
}

const isLoading = computed(() => isLoadingData.value || isLoadingStorage.value)

const units = ref<IUnitInstanceInScoreCalc[]>(getEmptyTeamInScoreCalc())
const hasBonusUnit = ref(DEFAULT_VALUES.hasBonusUnit)
const seasonElements = ref<ElementLegendary[]>(DEFAULT_VALUES.seasonElements)
const isMjolnirStrike = ref(DEFAULT_VALUES.isMjolnirStrike)
const mjolnirStrikeMajor = ref<ElementMythic | null>(
  DEFAULT_VALUES.mjolnirStrikeMajor,
)
const mjolnirStrikeMinor = ref<ElementMythic | null>(
  DEFAULT_VALUES.mjolnirStrikeMinor,
)

const unitsScores = ref(units.value.map((_) => 0))
const areUnitsDetailsClosed = ref(units.value.map((_) => true))
onMounted(() => {
  units.value.map((_) => smAndDown.value)
})

const noUnit = computed(() => filter(units.value, 'id').length === 0)

function selectUnit(unit: IUnitInstanceInScoreCalc, id: UnitId) {
  unit.id = id
  unit.skillIds = getEmptyUnitInstanceSkillIds()
  unit.skillSPs = getEmptyUnitInstanceSkillSPs()
  if (!id) return

  const u = storeDataUnits.unitsById[id]
  if (u.element) unit.blessing = u.element
}
function updateUnit(
  unit: IUnitInstanceInScoreCalc,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { key, value }: { key: EditableKey; value: any },
) {
  // @ts-expect-error TODO handle error
  unit[key] = value
}
function replaceUnit(index: number, unit: IUnitInstanceInScoreCalc) {
  units.value[index] = unit
}
function selectSkill(
  unit: IUnitInstanceInScoreCalc,
  { category, id }: { category: SkillCategory; id: SkillId },
) {
  if (!id) {
    unit.skillIds[category] = undefined
    unit.skillSPs[category] = undefined
    return
  }

  unit.skillIds[category] = id

  const skill = storeDataSkills.skillsById[id]
  unit.skillSPs[category] = max(compact([skill.sp, skill.refines_max_sp]))
}
function selectSp(
  unit: IUnitInstanceInScoreCalc,
  { category, sp }: { category: SkillCategory; sp: number },
) {
  unit.skillIds[category] = undefined
  unit.skillSPs[category] = sp
}
function updateScore(index: number, score: number) {
  unitsScores.value[index] = score
}
function toggleDetails(index: number) {
  areUnitsDetailsClosed.value[index] = !areUnitsDetailsClosed.value[index]
  if (!sm.value) return

  // on MD breakpoint, there are 2 units side by side
  // make sure to open/close details for both units
  if (index % 2 === 0) {
    areUnitsDetailsClosed.value[index + 1] = areUnitsDetailsClosed.value[index]
  } else {
    areUnitsDetailsClosed.value[index - 1] = areUnitsDetailsClosed.value[index]
  }
}

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  units.value = getEmptyTeamInScoreCalc()
  hasBonusUnit.value = DEFAULT_VALUES.hasBonusUnit
  seasonElements.value = DEFAULT_VALUES.seasonElements
  isMjolnirStrike.value = DEFAULT_VALUES.isMjolnirStrike
  mjolnirStrikeMajor.value = DEFAULT_VALUES.mjolnirStrikeMajor
  mjolnirStrikeMinor.value = DEFAULT_VALUES.mjolnirStrikeMinor
}

const scoreContext = computed<ScoreContext>(() => ({
  bonusFactor: hasBonusUnit.value ? 2 : 1,
  seasonElements: seasonElements.value,
  legendaryCounts: objectFromEntries(
    SORTED_LEGENDARY_ELEMENTS.map((element) => [
      element,
      filter(
        units.value,
        (u) => u.id && storeDataUnits.unitsById[u.id]?.element === element,
      ).length,
    ]),
  ),
  mjolnirStrike: {
    isActive: isMjolnirStrike.value,
    minor: mjolnirStrikeMinor.value,
    major: mjolnirStrikeMajor.value,
  },
}))

const averageScore = computed(() => TEAM_BASE_SCORE + mean(unitsScores.value))
const scoreRounded = computed(
  () => scoreContext.value.bonusFactor * Math.floor(averageScore.value),
)
const scoreExact = computed(
  () => scoreContext.value.bonusFactor * averageScore.value,
)
const defenseScore = computed(() => Math.floor(averageScore.value) * 2)
const offenseScoreMin = computed(
  () =>
    Math.floor(averageScore.value + OFFENSE_SCORE_DIFF_MIN) *
    scoreContext.value.bonusFactor,
)
const offenseScoreMax = computed(
  () =>
    Math.floor(averageScore.value + OFFENSE_SCORE_DIFF_MAX) *
    scoreContext.value.bonusFactor,
)

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:score-calc'
const CURRENT_PAYLOAD_VERSION = 1
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  units: IUnitInstanceInScoreCalc[]
  hasBonusUnit: boolean
  seasonElements: ElementLegendary[]
  isMjolnirStrike: boolean
  mjolnirStrikeMajor: ElementMythic | null
  mjolnirStrikeMinor: ElementMythic | null
}

const payloadToSave = computed(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  units: units.value,
  hasBonusUnit: hasBonusUnit.value,
  seasonElements: seasonElements.value,
  isMjolnirStrike: isMjolnirStrike.value,
  mjolnirStrikeMajor: mjolnirStrikeMajor.value,
  mjolnirStrikeMinor: mjolnirStrikeMinor.value,
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION) {
    throw new Error('unknown version')
  }

  units.value = data.units || []
  hasBonusUnit.value = data.hasBonusUnit
  seasonElements.value = data.seasonElements || []
  isMjolnirStrike.value = data.isMjolnirStrike
  mjolnirStrikeMajor.value = data.mjolnirStrikeMajor
  mjolnirStrikeMinor.value = data.mjolnirStrikeMinor
}
</script>
