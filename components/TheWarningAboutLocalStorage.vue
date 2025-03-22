<template>
  <v-alert
    v-if="checkDone && !available"
    type="warning"
    border="start"
    variant="tonal"
  >
    <code>localStorage</code>
    {{ t('global.warningLocalStorage.isNotAvailable') }}
    {{ t('global.warningLocalStorage.changesWillNotBeSaved') }}
    {{
      t(
        'global.warningLocalStorage.youShouldTryToMakeItAvailableForABetterExperience',
      )
    }}
  </v-alert>
</template>

<script setup lang="ts">
const { t } = useI18n()
const checkDone = ref(false)
const available = ref(false)
const KEY = 'feh-peeler:test'
const TEST = 'test'
onMounted(() => {
  try {
    localStorage.setItem(KEY, TEST)
    if (TEST === localStorage.getItem(KEY)) {
      available.value = true
    }
    localStorage.removeItem(KEY)
  } catch (_error) {
    available.value = false
  } finally {
    checkDone.value = true
  }
})
</script>
