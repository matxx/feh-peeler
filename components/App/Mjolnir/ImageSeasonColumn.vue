<template>
  <AppSpriteSheetsMjolnir_Common
    v-if="frame"
    :frame="frame"
    :width="computedWidth"
    :height="computedHeight"
  />
</template>

<script setup lang="ts">
import {
  ELEMENT_LIGHT,
  ELEMENT_DARK,
  ELEMENT_ASTRA,
  ELEMENT_ANIMA,
  type ElementMythic,
} from '~/utils/types/elements'

const props = defineProps<{
  element?: ElementMythic
  size?: number
  height?: number
  width?: number
}>()

const computedWidth = computed(() => props.width ?? props.size)
const computedHeight = computed(() => props.height ?? props.size)

const frame = computed(() => {
  switch (props.element) {
    case ELEMENT_LIGHT:
      return 'Icon_MjolnirSeason_LightDark.png'
    case ELEMENT_DARK:
      return 'Icon_MjolnirSeason_DarkLight.png'
    case ELEMENT_ASTRA:
      return 'Icon_MjolnirSeason_HeavenLogic.png'
    case ELEMENT_ANIMA:
      return 'Icon_MjolnirSeason_LogicHeaven.png'
  }

  return undefined
})
</script>
