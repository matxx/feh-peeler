<template>
  <img
    :src="image"
    :alt="t('global.game8.logo.alt')"
    :title="t('global.game8.logo.title')"
    :height="height"
  />
</template>

<script setup lang="ts">
import Dark from '~/assets/images/game8-logo-dark.svg'
import Light from '~/assets/images/game8-logo-light.png'

defineProps<{ height: number }>()

const { t } = useI18n()
const store = useStoreTheme()
const image = computed(() => (store.isDarkApplied ? Dark : Light))
</script>
