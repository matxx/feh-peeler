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
          >.
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

    <v-row dense>
      <v-col
        v-for="(unit, index) in units"
        :key="index"
        :cols="mobile ? 12 : 3"
      >
        <ScoreCalcUnitCard
          :unit-instance="unit"
          :index="index"
          :is-loading="isLoading"
          @select-unit="selectUnit(unit, $event)"
          @update-unit="updateUnit(unit, $event)"
          @replace-unit="replaceUnit(index, $event)"
          @select-skill="selectSkill(unit, $event)"
          @select-sp="selectSp(unit, $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  SKILL_PASSIVE_S,
  type SkillCategory,
  type SkillId,
} from '~/utils/types/skills'
import {
  getEmptyTeamInScoreCalc,
  getEmptyUnitInstanceSkillSPs,
  type EditableKey,
  type IUnitInstanceInScoreCalc,
} from '~/utils/types/score-calc'
import { getEmptyUnitInstanceSkillIds, type UnitId } from '~/utils/types/units'

const { t } = useI18n()
const { mobile } = useDisplay()

const storeDataUnits = useStoreDataUnits()
const storeDataSkills = useStoreDataSkills()
const storeDataSeals = useStoreDataSeals()
const { isLoading: isLoadingData } = useDataStores([
  storeDataUnits,
  useStoreDataUnitsStats(),
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
  storeDataSeals,
])

const units = ref<IUnitInstanceInScoreCalc[]>(getEmptyTeamInScoreCalc())

const isLoading = computed(() => isLoadingData.value || isLoadingStorage.value)

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
  if (id) {
    unit.skillIds[category] = id
    unit.skillSPs[category] =
      category === SKILL_PASSIVE_S
        ? storeDataSeals.sealsById[id].sp
        : storeDataSkills.skillsById[id].sp
  } else {
    unit.skillIds[category] = undefined
    unit.skillSPs[category] = undefined
  }
}
function selectSp(
  unit: IUnitInstanceInScoreCalc,
  { category, sp }: { category: SkillCategory; sp: number },
) {
  unit.skillIds[category] = undefined
  unit.skillSPs[category] = sp
}

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  units.value = getEmptyTeamInScoreCalc()
}

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
}

const payloadToSave = computed(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  units: units.value,
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  units.value = data.units
}
</script>
