<!-- https://feheroes.fandom.com/wiki/Catalog_of_Heroes -->
<template>
  <div class="pa-3 fill-height d-flex flex-column">
    <v-overlay
      :model-value="isLoadingStores || isLoadingStorage"
      class="d-flex justify-space-around align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-overlay>

    <div>
      <TheWarningAboutLocalStorage class="mb-3" />

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

        <v-spacer />

        <AppDownloadUpload
          :payload="payloadToSave"
          file-name="FEHdex.json"
          @uploaded="updateData"
        />

        <AppLocalstorageSaveStates
          :local-storage-key="LOCAL_STORAGE_KEY"
          :payload="payloadToSave"
          @loaded="updateData"
        />
      </div>
    </div>

    <v-container
      fluid
      class="flex-grow-1 pa-0"
    >
      <v-row class="fill-height">
        <v-col class="fill-height">
          <RecycleScroller
            v-slot="{ item }"
            class="scroller"
            :items="catalogLines"
            :item-size="frameSize"
          >
            <div class="d-flex">
              <CompoUnitThumbnailCatalog
                v-for="unit in item.units as IUnit[]"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                class="cursor-pointer"
                @click="
                  ownedUnitIds.has(unit.id)
                    ? ownedUnitIds.delete(unit.id)
                    : ownedUnitIds.add(unit.id)
                "
              />
            </div>
          </RecycleScroller>
        </v-col>
        <v-col> Heroes : {{ ownedCount }} / {{ sortedUnits.length }} </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'

import type { IUnit, UnitId } from '~/utils/types/units'

const { t } = useI18n()

const frameSize = 90
const thumbnailSize = 80

// inspired by https://stackoverflow.com/a/51968729/5032734
function chunkMaxLength<T>(arr: T[], chunkSize: number) {
  const maxLength = Math.ceil(arr.length / chunkSize)
  return Array.from({ length: maxLength }, (_, index) =>
    arr.slice(index * chunkSize, (index + 1) * chunkSize),
  )
}

const storeDataUnits = useStoreDataUnits()
const { isLoading: isLoadingStores } = useDataStores([storeDataUnits])

const columnsCount = ref(5)

const sortedUnits = computed(() =>
  sortBy(storeDataUnits.units, ['origin', 'id_int']),
)
const catalogLines = computed(() =>
  chunkMaxLength(sortedUnits.value, columnsCount.value).map((line, index) => ({
    id: index,
    units: line,
  })),
)

const ownedUnitIds = ref(new Set())
const ownedCount = computed(() => ownedUnitIds.value.size)

function confirmReset() {
  if (!confirm(t('global.confirmReset'))) return

  ownedUnitIds.value = new Set()
}

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:catalog-of-heroes'
const CURRENT_PAYLOAD_VERSION = 1
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  ownedUnitIds: UnitId[]
}

const payloadToSave = computed(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  ownedUnitIds: Array.from(ownedUnitIds.value),
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  ownedUnitIds.value = new Set(data.ownedUnitIds)
}
</script>

<style lang="scss" scoped>
.scroller {
  height: 400px;
}
</style>
