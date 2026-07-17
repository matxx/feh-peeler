<template>
  <div class="d-flex">
    <v-dialog
      v-model="isSaveDialogOpen"
      max-width="500"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-tooltip="saveTooltip"
          icon="mdi-export-variant"
          size="x-small"
          class="mr-1"
          :variant="buttonVariant"
          v-bind="activatorProps"
        />
      </template>

      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="text-primary">{{ saveTooltip }}</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="isSaveDialogOpen = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p class="mb-3">{{ saveExplanation }}</p>

          <div class="save-load-code-box pa-3 rounded-lg border">
            {{ code }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            variant="outlined"
            :text="t('scoreCalc.cta.copy')"
            @click="copyCode"
          />
          <v-btn
            color="primary"
            variant="flat"
            :text="t('scoreCalc.cta.close')"
            @click="isSaveDialogOpen = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isLoadDialogOpen"
      max-width="500"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-tooltip="loadTooltip"
          icon="mdi-import"
          size="x-small"
          :variant="buttonVariant"
          v-bind="activatorProps"
        />
      </template>

      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="text-primary">{{ loadTooltip }}</span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="isLoadDialogOpen = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text>
          <p class="mb-3">{{ loadExplanation }}</p>

          <v-textarea
            v-model="pasteValue"
            :placeholder="codePlaceholder"
            rows="6"
            variant="outlined"
            hide-details
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            variant="outlined"
            :text="t('scoreCalc.cta.paste')"
            @click="pasteFromClipboard"
          />
          <v-btn
            color="primary"
            variant="flat"
            :disabled="!pasteValue"
            :text="t('scoreCalc.cta.load')"
            @click="loadCode"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts" generic="T">
// @ts-expect-error vuetify type
import type { Variant } from 'vuetify/lib/composables/variant'

import { ScoreCalcCodeError } from '~/utils/types/score-calc'

const emit = defineEmits<{ load: [value: T] }>()
const props = defineProps<{
  code: string
  decode: (raw: string) => T
  saveTooltip: string
  loadTooltip: string
  saveExplanation: string
  loadExplanation: string
  codePlaceholder: string
  buttonVariant?: Variant
}>()

const { t } = useI18n()
const storeSnackbar = useStoreSnackbar()

const isSaveDialogOpen = ref(false)
async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  storeSnackbar.addToast({ text: t('global.copiedToClipboard') })
}

const isLoadDialogOpen = ref(false)
const pasteValue = ref('')
watch(isLoadDialogOpen, (value) => {
  if (!value) pasteValue.value = ''
})

async function pasteFromClipboard() {
  try {
    pasteValue.value = await navigator.clipboard.readText()
  } catch {
    // clipboard read denied/unavailable, user can still paste manually
  }
}

function loadCode() {
  if (!pasteValue.value) return

  try {
    const value = props.decode(pasteValue.value.trim())
    emit('load', value)
    isLoadDialogOpen.value = false
  } catch (e) {
    if (!(e instanceof ScoreCalcCodeError)) throw e

    storeSnackbar.addToast({
      text: t(`scoreCalc.errors.${e.reason}`),
      color: 'error',
    })
  }
}
</script>

<style scoped>
.save-load-code-box {
  max-height: 300px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.85rem;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
