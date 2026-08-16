<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <TheWarningAboutLocalStorage class="mb-3" />

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

          <div v-show="mdAndUp">
            <div class="d-flex align-center">
              <span>{{ t('scoreCalc.labels.arenaOrAA') }}</span>
              <v-switch
                v-model="mode"
                :true-value="MODE_MJOLNIR_STRIKE"
                :false-value="MODE_ARENA"
                density="compact"
                hide-details
                class="mx-3"
              />
              <span>{{ t('scoreCalc.labels.mjolnirStrike') }}</span>
            </div>
          </div>

          <v-spacer />

          <ScoreCalcSaveLoadCode
            :code="teamCode"
            :decode="decodeTeamInScoreCalc"
            :save-tooltip="t('scoreCalc.cta.saveTeam')"
            :load-tooltip="t('scoreCalc.cta.loadTeam')"
            :save-explanation="t('scoreCalc.labels.saveTeamExplanation')"
            :load-explanation="t('scoreCalc.labels.loadTeamExplanation')"
            :code-placeholder="`${SCT_CODE_PREFIX}...`"
            class="mr-2"
            @load="units = $event"
          />

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

    <v-row v-show="smAndDown">
      <v-col class="ml-2">
        <v-switch
          v-model="mode"
          :true-value="MODE_MJOLNIR_STRIKE"
          :false-value="MODE_ARENA"
          density="compact"
          hide-details
          :label="
            mjolnirStrike.isActive
              ? t('scoreCalc.labels.mjolnirStrike')
              : t('scoreCalc.labels.arenaOrAA')
          "
        />
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

              <v-tooltip location="bottom">
                <template #activator="{ props: tooltipProps }">
                  <span
                    v-if="!noUnit"
                    v-bind="tooltipProps"
                  >
                    ({{ scoreExact }})<!--
                --><sup>
                      <v-icon size="x-small">mdi-information-outline</v-icon>
                    </sup>
                  </span>
                </template>

                <div>
                  <div>{{ t('scoreCalc.tooltips.scoreExact') }}</div>
                  <div v-show="mjolnirStrike.isActive">
                    {{
                      t('scoreCalc.tooltips.scoreAddedByTier', {
                        score: mjolnirStrikeAddedScoreForTier,
                      })
                    }}
                  </div>
                </div>
              </v-tooltip>
            </div>
            <div v-show="arena.isActive">
              <span>{{ t('scoreCalc.headers.offenseRange') }}:</span>
              {{ noUnit ? '-' : offenseScoreMin }} to
              {{ noUnit ? '-' : offenseScoreMax }}
            </div>
            <div v-show="arena.isActive">
              <span>{{ t('scoreCalc.headers.defenseScore') }}:</span>
              {{ noUnit ? '-' : defenseScore }}
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col
                  v-show="mjolnirStrike.isActive"
                  cols="6"
                  md="3"
                  :class="{
                    'd-flex align-center py-1': mjolnirStrike.isActive,
                  }"
                >
                  <div class="mr-3">{{ t('scoreCalc.labels.seasons') }}:</div>
                  <AppMjolnirSelectSeasons v-model="mjolnirStrikeMajor" />
                </v-col>

                <v-col
                  v-show="mjolnirStrike.isActive"
                  cols="6"
                  md="3"
                  :class="{ 'd-flex align-center': mjolnirStrike.isActive }"
                >
                  <VeeField
                    v-slot="{ errors }"
                    :value="mjolnirStrikeTier"
                    name="mjolnirStrikeTier"
                  >
                    <v-number-input
                      v-model="mjolnirStrikeTier"
                      required
                      :min="MIN_TIER"
                      :max="MAX_TIER"
                      control-variant="stacked"
                      density="compact"
                      hide-details
                      :label="t('scoreCalc.labels.tier')"
                      :error-messages="errors"
                    />
                  </VeeField>
                </v-col>

                <v-col
                  v-show="!mjolnirStrike.isActive"
                  cols="6"
                  md="3"
                  :class="{ 'd-flex align-center': !mjolnirStrike.isActive }"
                >
                  <div class="mr-3">{{ t('scoreCalc.labels.seasons') }}:</div>
                  <AppSelectSeasons v-model="arenaSeasons" />
                </v-col>

                <v-col
                  v-show="!mjolnirStrike.isActive"
                  cols="6"
                  md="3"
                >
                  <v-checkbox
                    v-model="arenaHasBonusUnit"
                    :label="t('scoreCalc.labels.hasBonusUnit')"
                    density="compact"
                    hide-details
                  />
                </v-col>
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
  decodeTeamInScoreCalc,
  encodeTeamInScoreCalc,
  getEmptyTeamInScoreCalc,
  getEmptyUnitInstanceSkillSPs,
  MODE_ARENA,
  MODE_MJOLNIR_STRIKE,
  OFFENSE_SCORE_DIFF_MAX,
  OFFENSE_SCORE_DIFF_MIN,
  SCT_CODE_PREFIX,
  TEAM_BASE_SCORE,
  type EditableKey,
  type IUnitInstanceInScoreCalc,
  type IUnitInstanceInScoreCalcV1,
  type IUnitInstanceInScoreCalcV2,
  type Mode,
  type ScoreContextIn,
} from '~/utils/types/score-calc'
import { getEmptyUnitInstanceSkillIds, type UnitId } from '~/utils/types/units'
import {
  ELEMENT_LIGHT,
  mythicComplement,
  type Element,
  type ElementMythic,
} from '~/utils/types/elements'
import { mean } from '~/utils/functions/math'
import {
  MAX_TIER,
  MIN_TIER,
  addedScoreForTier,
} from '~/utils/types/mjolnir-strike'

const { t } = useI18n()
const { sm, smAndDown, mdAndUp } = useDisplay()
const localePath = useLocalePath()

const storeDataUnits = useStoreDataUnits()
const storeDataSkills = useStoreDataSkills()
const { isLoading: isLoadingData } = useDataStores([
  storeDataUnits,
  useStoreDataUnitsStats(),
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
])

const DEFAULT_VALUES: {
  mode: Mode
  arenaHasBonusUnit: boolean
  arenaSeasons: Element[]
  mjolnirStrikeMajor: ElementMythic
  mjolnirStrikeTier: number
} = {
  mode: MODE_ARENA,
  arenaHasBonusUnit: true,
  arenaSeasons: [],
  mjolnirStrikeMajor: ELEMENT_LIGHT,
  mjolnirStrikeTier: 21,
}

const isLoading = computed(() => isLoadingData.value || isLoadingStorage.value)

const units = ref<IUnitInstanceInScoreCalc[]>(getEmptyTeamInScoreCalc())
const mode = ref<Mode>(DEFAULT_VALUES.mode)
const arenaHasBonusUnit = ref(DEFAULT_VALUES.arenaHasBonusUnit)
const arenaSeasons = ref<Element[]>(DEFAULT_VALUES.arenaSeasons)
const mjolnirStrikeMajor = ref<ElementMythic>(DEFAULT_VALUES.mjolnirStrikeMajor)
const mjolnirStrikeTier = ref<number>(DEFAULT_VALUES.mjolnirStrikeTier)

watch(mjolnirStrikeMajor, () => {
  if (mjolnirStrikeMajor.value) return

  mjolnirStrikeMajor.value = DEFAULT_VALUES.mjolnirStrikeMajor
})

const unitsScores = ref(units.value.map((_) => 0))
const areUnitsDetailsClosed = ref(units.value.map((_) => true))
onMounted(() => {
  areUnitsDetailsClosed.value = units.value.map((_) => smAndDown.value)
})

const noUnit = computed(() => filter(units.value, 'id').length === 0)
const teamCode = computed(() => encodeTeamInScoreCalc(units.value))

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
  mode.value = DEFAULT_VALUES.mode
  arenaHasBonusUnit.value = DEFAULT_VALUES.arenaHasBonusUnit
  arenaSeasons.value = DEFAULT_VALUES.arenaSeasons
  mjolnirStrikeMajor.value = DEFAULT_VALUES.mjolnirStrikeMajor
  mjolnirStrikeTier.value = DEFAULT_VALUES.mjolnirStrikeTier
}

const arena = computed<ScoreContextIn['arena']>(() => ({
  isActive: mode.value === MODE_ARENA,
  hasBonusUnit: arenaHasBonusUnit.value,
  seasons: arenaSeasons.value,
}))
const mjolnirStrike = computed<ScoreContextIn['mjolnirStrike']>(() => ({
  isActive: mode.value === MODE_MJOLNIR_STRIKE,
  tier: mjolnirStrikeTier.value,
  major: mjolnirStrikeMajor.value,
  minor: mythicComplement(mjolnirStrikeMajor.value),
}))
const scoreContext = useScoreContext(units, arena, mjolnirStrike)

const mjolnirStrikeAddedScoreForTier = computed(() =>
  mode.value === MODE_MJOLNIR_STRIKE
    ? addedScoreForTier(mjolnirStrikeTier.value)
    : 0,
)
const averageScore = computed(() => TEAM_BASE_SCORE + mean(unitsScores.value))
const scoreRounded = computed(
  () =>
    scoreContext.value.bonusFactor * Math.floor(averageScore.value) +
    mjolnirStrikeAddedScoreForTier.value,
)
const scoreExact = computed(
  () =>
    scoreContext.value.bonusFactor * averageScore.value +
    mjolnirStrikeAddedScoreForTier.value,
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
const CURRENT_PAYLOAD_VERSION = 4
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveCommon {
  hasBonusUnit: boolean
  seasonElements: Element[]
  isMjolnirStrike: boolean
  mjolnirStrikeMajor: ElementMythic | null
}
interface IPayloadToSaveV1 extends IPayloadToSaveCommon {
  version: 1
  units: IUnitInstanceInScoreCalcV1[]
  mjolnirStrikeMinor: ElementMythic | null
}
interface IPayloadToSaveV2 extends IPayloadToSaveCommon {
  version: 2
  units: IUnitInstanceInScoreCalcV2[]
  mjolnirStrikeMinor: ElementMythic | null
}
interface IPayloadToSaveV3 extends IPayloadToSaveCommon {
  version: 3
  units: IUnitInstanceInScoreCalcV2[]
  mjolnirStrikeTier: number
}
interface IPayloadToSaveV4 {
  version: 4
  units: IUnitInstanceInScoreCalcV2[]
  mode: Mode
  arenaHasBonusUnit: boolean
  arenaSeasons: Element[]
  mjolnirStrikeMajor: ElementMythic
  mjolnirStrikeTier: number
}
type IPayloadToSave =
  IPayloadToSaveV1 | IPayloadToSaveV2 | IPayloadToSaveV3 | IPayloadToSaveV4

const payloadToSave = computed<IPayloadToSaveV4>(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  units: units.value,
  mode: mode.value,
  arenaHasBonusUnit: arenaHasBonusUnit.value,
  arenaSeasons: arenaSeasons.value,
  mjolnirStrikeMajor: mjolnirStrikeMajor.value,
  mjolnirStrikeTier: mjolnirStrikeTier.value,
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSave) {
  if (data.version === 4) {
    mode.value = data.mode || DEFAULT_VALUES.mode
    arenaHasBonusUnit.value = data.arenaHasBonusUnit
    arenaSeasons.value = data.arenaSeasons || []
    mjolnirStrikeMajor.value =
      data.mjolnirStrikeMajor || DEFAULT_VALUES.mjolnirStrikeMajor
    units.value = data.units || []
    mjolnirStrikeTier.value =
      data.mjolnirStrikeTier || DEFAULT_VALUES.mjolnirStrikeTier
    return
  }

  arenaHasBonusUnit.value = data.hasBonusUnit
  arenaSeasons.value = data.seasonElements || []
  mode.value = data.isMjolnirStrike ? MODE_MJOLNIR_STRIKE : MODE_ARENA
  mjolnirStrikeMajor.value =
    data.mjolnirStrikeMajor || DEFAULT_VALUES.mjolnirStrikeMajor

  switch (data.version) {
    case 1:
      units.value = (data.units || []).map((u) => ({
        ...u,
        chosenHeroId: null,
        chosenHeroMerges: 0,
      }))
      mjolnirStrikeTier.value = DEFAULT_VALUES.mjolnirStrikeTier
      break
    case 2:
      units.value = data.units || []
      mjolnirStrikeTier.value = DEFAULT_VALUES.mjolnirStrikeTier
      break
    case 3:
      units.value = data.units || []
      mjolnirStrikeTier.value =
        data.mjolnirStrikeTier || DEFAULT_VALUES.mjolnirStrikeTier
      break
    default:
      throw new Error('unknown version')
  }
}
</script>
