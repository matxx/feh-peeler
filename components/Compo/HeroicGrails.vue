<template>
  <CompoAvailability
    :rarity="rarity"
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
    size: number
    disabled?: boolean
    tooltipLocation?: Anchor
  }>(),
  {
    rarity: undefined,
    disabled: false,
    tooltipLocation: 'top',
  },
)
</script>
