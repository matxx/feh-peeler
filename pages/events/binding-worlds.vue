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
          />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel value="add">
        <v-expansion-panel-title>
          {{ t('bindingWorlds.addUnit') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <BindingWorldsExpansionPanelText @save="addUnit($event)" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import some from 'lodash-es/some'
import type { UnitInBindingWorlds } from '~/utils/events/binding-worlds'

const { t } = useI18n()

onMounted(() => {
  useStoreUnits().load()
  useStoreUnitsRatingsGame8().load()
  useStoreSkills().load()
  useStoreSkillsRatingsGame8().load()
})

const showAll = ref(false)
const openedPanel = ref<null | number | string>(null)
const isLoading = ref(false)

const units = ref<UnitInBindingWorlds[]>([])

const anyHiddenUnit = computed(() =>
  some(units.value, (unit) => !!unit.hidingReason),
)

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  units.value = []
}

function updateUnit(index: number, unitNewValue: UnitInBindingWorlds) {
  units.value.splice(index, 1, unitNewValue)
  openedPanel.value = null
}

function addUnit(unit: UnitInBindingWorlds) {
  units.value.push(unit)
  openedPanel.value = null
}

const LOCAL_STORAGE_KEY = 'feh-peeler:binding-worlds'
const CURRENT_PAYLOAD_VERSION = 1
const { storeOnUpdate, updateOnMounted } = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  units: UnitInBindingWorlds[]
}

const payloadToSave = computed<IPayloadToSaveV1>(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  units: units.value,
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  // console.log('isLoading - 1')
  isLoading.value = true
  setTimeout(() => {
    // console.log('isLoading - 2')
    // nextTick(() => {
    // console.log('isLoading - 22')
    units.value = data.units

    // console.log('fixing units')
    // units.value.forEach((unit) => {
    //   unit.bane1 = undefined
    //   unit.bane2 = undefined

    //   if (unit.hidingReason === 'NOT_CUTE') {
    //     unit.hidingReason = 'NOT_CUTE_ENOUGH'
    //   }
    // })

    nextTick(() => {
      // console.log('isLoading - 3')
      isLoading.value = false
    })
    // })
  }, 100)
}
</script>
