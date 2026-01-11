<template>
  <div>
    <v-btn
      v-tooltip="capitalize(t('global.download'))"
      icon
      size="x-small"
      class="mr-2"
      :loading="isDownloading"
      @click="downloadJson"
    >
      <v-icon>mdi-download</v-icon>
    </v-btn>
    <v-btn
      v-tooltip="capitalize(t('global.upload'))"
      icon
      size="x-small"
      class="mr-2"
      :loading="isUploading"
      @click="startUpload"
    >
      <v-icon>mdi-upload</v-icon>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="parseJson"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import capitalize from 'lodash-es/capitalize'
import { saveAs } from 'file-saver'

const { t } = useI18n()
const emit = defineEmits(['uploaded'])
const props = defineProps<{
  payload: any // eslint-disable-line @typescript-eslint/no-explicit-any
  fileName: string
}>()

const isDownloading = ref(false)
const isUploading = ref(false)
const uploader = useTemplateRef('uploader')

function downloadJson() {
  isDownloading.value = true
  const json = JSON.stringify(props.payload, undefined, 2)
  const blob = new Blob([json], { type: 'application/json' })
  // console.log('data downloaded')
  saveAs(blob, props.fileName)
  isDownloading.value = false
}
function startUpload() {
  if (!uploader.value) return

  isUploading.value = true
  window.addEventListener(
    'focus',
    () => {
      isUploading.value = false
    },
    { once: true },
  )
  uploader.value.click()
}
async function parseJson($event: Event) {
  const [file] = ($event.target as HTMLInputElement).files!
  const raw = await file.text()
  const data = JSON.parse(raw)
  // console.log('data uploaded')
  emit('uploaded', data)
}
</script>
