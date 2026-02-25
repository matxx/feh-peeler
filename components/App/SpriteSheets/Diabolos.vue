<template>
  <AppSpriteSheet
    :sprite-sheet="spriteDataRaw"
    :img="spriteImg"
    :name="frame"
    v-bind="props"
  />
</template>

<script setup lang="ts">
import spriteDataRaw from '~/assets/sprite-sheets/Diabolos.json'
import spriteImg from '~/assets/sprite-sheets/Diabolos.png'

const props = defineProps<{
  frame: string
  width?: number
  height?: number
  size?: number
}>()
</script>
