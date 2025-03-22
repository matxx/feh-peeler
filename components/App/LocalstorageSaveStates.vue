<template>
  <v-menu
    v-model="isMenuOpen"
    :close-on-content-click="false"
    location="end"
  >
    <template #activator="{ props: menuProps }">
      <v-btn
        v-tooltip="t('global.loadSave')"
        icon="mdi-content-save"
        size="x-small"
        v-bind="menuProps"
      />
    </template>

    <v-card min-width="300">
      <v-card-text>
        <div>
          <div class="mb-3">
            <h4>
              {{ t('saves.saveAs') }}
            </h4>
            <v-text-field
              v-model="saveName"
              density="compact"
              hide-details
            >
              <template #append>
                <v-btn
                  icon
                  size="x-small"
                  :disabled="!saveName"
                  @click="createSave"
                >
                  <v-icon :color="hasBeenCreated ? 'green' : undefined">
                    {{
                      hasBeenCreated
                        ? 'mdi-content-save-check'
                        : 'mdi-content-save'
                    }}
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </div>

          <div>
            <h4>
              {{ t('saves.availableSaves') }}
            </h4>
            <v-select
              v-model="selectedSave"
              :items="saves"
              item-value="uuid"
              item-title="name"
              return-object
              density="compact"
              hide-details
              class="mb-2"
            />
            <div>
              <v-btn
                size="x-small"
                :disabled="!selectedSave"
                :loading="isLoadingSave"
                class="mr-1"
                @click="loadSave"
              >
                {{ t('saves.load') }}
              </v-btn>
              <v-btn
                size="x-small"
                :disabled="!selectedSave"
                :loading="isSaving"
                class="mr-1"
                @click="updateSave"
              >
                {{ t('saves.update') }}
              </v-btn>
              <v-btn
                size="x-small"
                :disabled="!selectedSave"
                class="mr-1"
                @click="deleteSave"
              >
                {{ t('saves.delete') }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import debounce from 'lodash-es/debounce'
import findIndex from 'lodash-es/findIndex'
import { v4 as uuidv4 } from 'uuid'

const { t } = useI18n()

const emit = defineEmits(['loaded'])
const props = defineProps<{
  localStorageKey: string
  payload: any // eslint-disable-line @typescript-eslint/no-explicit-any
}>()

const isMenuOpen = ref(false)

const DEBOUNCE_TIME = 500

interface Save {
  uuid: string
  name: string
}

const saves = ref<Array<Save>>([])
const areSavesLoaded = ref(false)
const localStorageKeySaves = computed(() => `${props.localStorageKey}:saves`)
onMounted(() => {
  const savesAsString = localStorage.getItem(localStorageKeySaves.value)
  if (savesAsString) {
    saves.value = JSON.parse(savesAsString)
  }
  areSavesLoaded.value = true
})
watch(
  saves,
  debounce(() => {
    // console.log('storing saves')
    localStorage.setItem(
      localStorageKeySaves.value,
      JSON.stringify(saves.value),
    )
  }, DEBOUNCE_TIME),
  { deep: true },
)

const getSaveLocalStorageKey = (uuid: string) =>
  `${props.localStorageKey}:save:${uuid}`

const selectedSave = ref<null | Save>(null)
const isLoadingSave = ref(false)
function loadSave() {
  if (!selectedSave.value) return

  isLoadingSave.value = true
  const saveAsString = localStorage.getItem(
    getSaveLocalStorageKey(selectedSave.value.uuid),
  )
  if (saveAsString) {
    emit('loaded', JSON.parse(saveAsString))
  }
  isLoadingSave.value = false
}

const isSaving = ref(false)
function updateSave() {
  if (!selectedSave.value) return

  isSaving.value = true
  localStorage.setItem(
    getSaveLocalStorageKey(selectedSave.value.uuid),
    JSON.stringify(props.payload),
  )
  isSaving.value = false
}

const saveName = ref('')
const isCreatingSave = ref(false)
const hasBeenCreated = ref(false)
function createSave() {
  isCreatingSave.value = true
  const uuid = uuidv4()
  const save: Save = { uuid, name: saveName.value }
  saves.value.push(save)
  localStorage.setItem(
    getSaveLocalStorageKey(uuid),
    JSON.stringify(props.payload),
  )
  selectedSave.value = save
  isCreatingSave.value = false
  hasBeenCreated.value = true
  saveName.value = ''
  setTimeout(() => {
    hasBeenCreated.value = false
  }, 1000)
}

function deleteSave() {
  if (!selectedSave.value) return

  const index = findIndex(saves.value, selectedSave.value)
  if (index === -1) return

  selectedSave.value = null
  saves.value.splice(index, 1)
  selectedSave.value = saves.value[saves.value.length - 1] || null
}
</script>
