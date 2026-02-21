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
  type Element,
} from '~/utils/types/units-filters'

import ImgFire from '~/assets/icons/elements/chosen/fire.png'
import ImgWater from '~/assets/icons/elements/chosen/water.png'
import ImgWind from '~/assets/icons/elements/chosen/wind.png'
import ImgEarth from '~/assets/icons/elements/chosen/earth.png'

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
  }

  return undefined
})
</script>
