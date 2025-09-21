<template>
  <div class="ma-3">
    <TheWarningAboutMobile class="mb-3" />
    <TheWarningAboutLocalStorage class="mb-3" />
    <TheInfoAboutGame8Ratings class="mb-3" />

    <div class="d-flex align-center mb-3">
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
        v-show="anyHiddenUnit"
        v-model="showAll"
        :label="t('bindingWorlds.showAll')"
        hide-details
        class="mr-5"
      />

      <v-spacer />

      <AppDownloadUpload
        :payload="payloadToSave"
        file-name="Binding Worlds.json"
        @uploaded="updateData"
      />

      <AppLocalstorageSaveStates
        :local-storage-key="LOCAL_STORAGE_KEY"
        :payload="payloadToSave"
        @loaded="updateData"
      />
    </div>

    <div v-if="isLoading">
      <v-progress-linear
        color="primary"
        indeterminate
      />
    </div>
    <div v-show="isLoading">
      <v-progress-linear
        color="primary"
        indeterminate
      />
    </div>
    <v-expansion-panels v-model="openedPanel">
      <v-expansion-panel
        v-if="anyUnit"
        value="prepend"
      >
        <v-expansion-panel-title>
          {{ t('bindingWorlds.addUnit') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <BindingWorldsExpansionPanelText @save="prependUnit($event)" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel
        v-for="(unit, index) in units"
        v-show="showAll || openedPanel === index || !unit.hidingReason"
        :key="index"
        :value="index"
      >
        <v-expansion-panel-title>
          <template #default>
            <BindingWorldsExpansionPanelTitle
              :unit="unit"
              with-skill-x
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <BindingWorldsExpansionPanelText
            :unit="unit"
            @save="updateUnit(index, $event)"
            @delete="deleteUnit(index)"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel value="append">
        <v-expansion-panel-title>
          {{ t('bindingWorlds.addUnit') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <BindingWorldsExpansionPanelText @save="appendUnit($event)" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import some from 'lodash-es/some'
import type { UnitInBindingWorlds } from '~/utils/events/binding-worlds'

const { t } = useI18n()

const { isLoading: isLoadingData } = useDataStores([
  useStoreDataUnits(),
  useStoreDataUnitsRatingsGame8(),
  useStoreDataSkills(),
  useStoreDataSkillsRatingsGame8(),
])

const showAll = ref(false)
const openedPanel = ref<null | number | string>(null)
const isLoadingStorage = ref(false)
const isLoading = computed(() => isLoadingData.value || isLoadingStorage.value)

const units = ref<UnitInBindingWorlds[]>([])

const anyUnit = computed(() => units.value.length > 0)
const anyHiddenUnit = computed(() =>
  some(units.value, (unit) => !!unit.hidingReason),
)

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  units.value = []
}

function updateUnit(index: number, unitNewValue: UnitInBindingWorlds) {
  openedPanel.value = null
  units.value.splice(index, 1, unitNewValue)
}

function prependUnit(unit: UnitInBindingWorlds) {
  openedPanel.value = null
  units.value.unshift(unit)
}

function appendUnit(unit: UnitInBindingWorlds) {
  openedPanel.value = null
  units.value.push(unit)
}

function deleteUnit(index: number) {
  openedPanel.value = null
  units.value.splice(index, 1)
}

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:binding-worlds'
const CURRENT_PAYLOAD_VERSION = 1
const { storeOnUpdate, updateOnMounted } = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  units: UnitInBindingWorlds[]
  showAll: boolean
}

const payloadToSave = computed<IPayloadToSaveV1>(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  units: units.value,
  showAll: showAll.value,
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  // console.log('isLoadingStorage - 1')
  isLoadingStorage.value = true
  setTimeout(() => {
    // console.log('isLoadingStorage - 2')
    // nextTick(() => {
    // console.log('isLoadingStorage - 22')
    units.value = data.units
    showAll.value = data.showAll

    // console.log('fixing units')
    // units.value.forEach((unit) => {
    //   unit.bane1 = undefined
    //   unit.bane2 = undefined

    //   if (unit.hidingReason === 'NOT_CUTE') {
    //     unit.hidingReason = 'NOT_CUTE_ENOUGH'
    //   }
    // })

    nextTick(() => {
      // console.log('isLoadingStorage - 3')
      isLoadingStorage.value = false
    })
    // })
  }, 100)
}
</script>
