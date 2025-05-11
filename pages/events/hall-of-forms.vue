<template>
  <v-container
    fluid
    class="margin-bottom-400px"
  >
    <v-row>
      <v-col>
        <TheWarningAboutMobile class="mb-3" />
        <TheWarningAboutLocalStorage class="mb-3" />
        <TheInfoAboutGame8Ratings class="mb-3" />
        <HallOfFormsResources class="mb-3" />
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
          <v-checkbox
            v-model="showSp"
            :label="t(mobile ? 'global.sp' : 'hallOfForms.showSP')"
            hide-details
            class="mr-5"
          />

          <v-spacer />

          <AppDownloadUpload
            :payload="payloadToSave"
            file-name="Hall Of Forms.json"
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
      <v-col
        v-for="(unit, index) in units"
        :key="index"
        :cols="mobile ? 12 : 3"
      >
        <HallOfFormsUnitCard
          :unit-instance="unit"
          :is-selected="selectedUnitInstanceIndex === index"
          :is-loading="isLoading"
          :show-sp="showSp"
          @input="updateUnitId(unit, $event)"
          @select="selectedUnitInstanceIndex = index"
          @select-skill-category="selectUnitAndSkill(index, $event)"
          @unequip="unequipSkill(unit, $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div>
          <v-checkbox
            v-model="showDescriptions"
            :label="t('hallOfForms.showDescriptions')"
            hide-details
          />
        </div>
        <HallOfFormsSkillsLists
          ref="list"
          v-model:tab-selected="tabSelected"
          v-model:filters="filters"
          :regexps="regexps"
          :error-messages="errorMessages"
          :selected-unit-instance="selectedUnitInstance"
          :show-descriptions="showDescriptions"
          @equip="equipSkill"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGoTo } from 'vuetify'

import { HallOfFormsSkillsLists } from '#components'

import type { IUnitInstance, UnitId } from '~/utils/types/units'
import {
  getEmptyFiltersInHallOfForms,
  getEmptyTeamInHallOfForms,
} from '~/utils/events/hall-of-forms'
import {
  DEFAULT_SELECTED_TAB,
  type SkillCategory,
  type ISkill,
} from '~/utils/types/skills'
import type { FiltersBySkillCategory } from '~/utils/functions/skillLists'

const goTo = useGoTo()
const { t } = useI18n()
const { mobile } = useDisplay()
const storeDataUnits = useStoreDataUnits()

const { isLoading: isLoadingData } = useDataStores([
  storeDataUnits,
  useStoreDataUnitsRatingsGame8(),
  useStoreDataSkills(),
  useStoreDataSkillsDescriptions(),
  useStoreDataSkillsRatingsGame8(),
])

const list = ref<InstanceType<typeof HallOfFormsSkillsLists>>()

const showSp = ref(false)
const showDescriptions = ref(false)
const tabSelected = ref<SkillCategory>(DEFAULT_SELECTED_TAB)
const filters = ref<FiltersBySkillCategory>(getEmptyFiltersInHallOfForms())
const units = ref<IUnitInstance[]>(getEmptyTeamInHallOfForms())
const { regexps, errorMessages } = useSearchesBySkillCategory(filters)

const selectedUnitInstanceIndex = ref<null | number>(null)
const selectedUnitInstance = computed<null | IUnitInstance>(() =>
  selectedUnitInstanceIndex.value === null
    ? null
    : units.value[selectedUnitInstanceIndex.value],
)

function updateUnitId(unit: IUnitInstance, id: UnitId) {
  unit.id = id
}

function unequipSkill(unit: IUnitInstance, category: SkillCategory) {
  unit.skillIds[category] = undefined
}

function equipSkill({
  skill,
  skillCategory,
}: {
  skill: ISkill
  skillCategory: SkillCategory
}) {
  if (selectedUnitInstanceIndex.value === null) return

  units.value[selectedUnitInstanceIndex.value].skillIds[skillCategory] =
    skill.id
}

function selectUnitAndSkill(index: number, skillCategory: SkillCategory) {
  selectedUnitInstanceIndex.value = index
  tabSelected.value = skillCategory
  filters.value[skillCategory] = ['', '']

  nextTick(() => {
    if (list.value) goTo(list.value.$el)
  })
}

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  tabSelected.value = DEFAULT_SELECTED_TAB
  filters.value = getEmptyFiltersInHallOfForms()
  units.value = getEmptyTeamInHallOfForms()
}

const isLoading = computed(() => isLoadingStorage.value || isLoadingData.value)

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:hall-of-forms'
const CURRENT_PAYLOAD_VERSION = 1
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  units: IUnitInstance[]
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

<style lang="scss" scoped>
.margin-bottom-400px {
  margin-bottom: 400px;
}
</style>
