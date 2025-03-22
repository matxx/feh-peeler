<template>
  <v-alert
    type="info"
    border="start"
    variant="tonal"
  >
    {{ t('global.game8.allRatingsAreFrom') }}

    <nuxt-link
      :href="BASE_URL"
      target="_blank"
    >
      <TheGame8Logo
        :height="18"
        class="vertical-align-middle"
      />
    </nuxt-link>
  </v-alert>
</template>

<script setup lang="ts">
import { BASE_URL } from '~/utils/types/game8'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.vertical-align-middle {
  vertical-align: middle;
}
</style>
