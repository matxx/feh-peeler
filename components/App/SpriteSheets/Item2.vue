<template>
  <AppSpriteIcon
    v-if="sprite"
    :sprite="sprite"
    :img="spriteImg"
    :scale="scale"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import spriteDataRaw from '~/assets/icons/ui_sprite_sheets/Item_2.json'
import spriteImg from '~/assets/icons/ui_sprite_sheets/Item_2.png'

interface SpriteFrame {
  name: string
  x: number
  y: number
  width: number
  height: number
  rotated: boolean
}

const spriteData = spriteDataRaw as SpriteFrame[]

const props = withDefaults(
  defineProps<{
    name: string
    scale?: number
  }>(),
  {
    scale: 1,
  },
)

const sprite = computed(() => {
  return spriteData.find((f) => f.name === props.name)
})
</script>
