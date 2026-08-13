<template>
  <CompoAvailability
    :rarity="rarity"
    :show-rarity="showRarity"
    :size="size"
    :disabled="disabled"
    :tooltip-location="tooltipLocation"
    is-heroic-grails
  />
</template>

<script setup lang="ts">
import type { Anchor } from 'vuetify'
withDefaults(
  defineProps<{
    rarity?: number
    showRarity?: boolean
    size: number
    disabled?: boolean
    tooltipLocation?: Anchor
  }>(),
  {
    rarity: undefined,
    showRarity: false,
    disabled: false,
    tooltipLocation: 'top',
  },
)
</script>
