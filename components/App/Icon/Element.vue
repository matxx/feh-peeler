<template>
  <img
    :src="img"
    :width="computedWidth"
    :height="computedHeight"
    :alt="t(`global.assets.icons.alt.elements.${element}`)"
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
  type Element,
} from '~/utils/types/units-filters'

import ImgFire from '~/assets/icons/elements/fire.png'
import ImgWater from '~/assets/icons/elements/water.png'
import ImgWind from '~/assets/icons/elements/wind.png'
import ImgEarth from '~/assets/icons/elements/earth.png'
import ImgLight from '~/assets/icons/elements/light.png'
import ImgDark from '~/assets/icons/elements/dark.png'
import ImgAstra from '~/assets/icons/elements/astra.png'
import ImgAnima from '~/assets/icons/elements/anima.png'

const { t } = useI18n()

const props = defineProps<{
  element: Element
  size?: string | number
  height?: string | number
  width?: string | number
}>()

const computedWidth = computed(() => props.width ?? props.size ?? 'auto')
const computedHeight = computed(() => props.height ?? props.size ?? 'auto')

const img = computed(() => {
  switch (props.element) {
    case ELEMENT_FIRE:
      return ImgFire
    case ELEMENT_WATER:
      return ImgWater
    case ELEMENT_WIND:
      return ImgWind
    case ELEMENT_EARTH:
      return ImgEarth
    case ELEMENT_LIGHT:
      return ImgLight
    case ELEMENT_DARK:
      return ImgDark
    case ELEMENT_ASTRA:
      return ImgAstra
    case ELEMENT_ANIMA:
      return ImgAnima
  }

  return undefined
})
</script>
