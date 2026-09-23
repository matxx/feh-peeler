<template>
  <div class="d-flex align-center">
    <v-text-field
      v-model="min"
      density="compact"
      clearable
      class="flex-grow-1 input-min-width-0"
      :label="t('global.versionRange.min')"
      :error-messages="minErrorMessages"
    />
    <span class="mx-2">-</span>
    <v-text-field
      v-model="max"
      density="compact"
      clearable
      class="flex-grow-1 input-min-width-0"
      :label="t('global.versionRange.max')"
      :error-messages="maxErrorMessages"
    />
  </div>
</template>

<script setup lang="ts">
import { isValidVersionRangeInput } from '~/utils/functions/sortableVersion'

const { t } = useI18n()

const min = defineModel<string | null>('min')
const max = defineModel<string | null>('max')

const minErrorMessages = computed(() =>
  min.value && !isValidVersionRangeInput(min.value)
    ? [t('global.versionRange.invalid')]
    : [],
)
const maxErrorMessages = computed(() =>
  max.value && !isValidVersionRangeInput(max.value)
    ? [t('global.versionRange.invalid')]
    : [],
)
</script>

<style lang="scss" scoped>
.input-min-width-0 {
  min-width: 0;
}
</style>
