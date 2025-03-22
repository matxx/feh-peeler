<template>
  <v-alert
    v-show="mobile"
    type="warning"
    border="start"
    variant="tonal"
  >
    {{ t('global.warningAboutMobile') }}
  </v-alert>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { mobile } = useDisplay()
</script>
