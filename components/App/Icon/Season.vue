<template>
  <AppSpriteSheetsBlessing
    :frame="frame"
    :width="computedWidth"
    :height="computedHeight"
  />
</template>

<script setup lang="ts">
import {
  ELEMENT_FIRE,
  ELEMENT_WATER,
  ELEMENT_WIND,
  ELEMENT_EARTH,
  ELEMENT_LIGHT,
  ELEMENT_DARK,
  ELEMENT_ASTRA,
  ELEMENT_ANIMA,
  ELEMENT_CHAOS,
  type ElementOrChaos,
} from '~/utils/types/units-filters'

const props = defineProps<{
  element?: ElementOrChaos
  size?: number
  height?: number
  width?: number
}>()

const computedWidth = computed(() => props.width ?? props.size)
const computedHeight = computed(() => props.height ?? props.size)

const frame = computed(() => {
  switch (props.element) {
    case ELEMENT_FIRE:
      return 'Icon_SeasonFire.png'
    case ELEMENT_WATER:
      return 'Icon_SeasonWater.png'
    case ELEMENT_WIND:
      return 'Icon_SeasonWind.png'
    case ELEMENT_EARTH:
      return 'Icon_SeasonEarth.png'
    case ELEMENT_LIGHT:
      return 'Icon_SeasonLight.png'
    case ELEMENT_DARK:
      return 'Icon_SeasonDark.png'
    case ELEMENT_ASTRA:
      return 'Icon_SeasonHeaven.png'
    case ELEMENT_ANIMA:
      return 'Icon_SeasonLogic.png'
    case ELEMENT_CHAOS:
      return 'Icon_SeasonChaos.png'
    default:
      return 'Icon_SeasonNone.png'
  }
})
</script>
