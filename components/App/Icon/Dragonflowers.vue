<template>
  <img
    :src="img"
    :width="size"
    :height="size"
    :alt="t(`global.assets.icons.alt.dragonflowers.${type}`)"
  />
</template>

<script setup lang="ts">
import {
  MOVE_I,
  MOVE_A,
  MOVE_C,
  MOVE_F,
  type MoveType,
} from '~/utils/types/moves'

import ImgA from '~/assets/icons/dragonflowers/a.png'
import ImgC from '~/assets/icons/dragonflowers/c.png'
import ImgF from '~/assets/icons/dragonflowers/f.png'
import ImgI from '~/assets/icons/dragonflowers/i.png'

const { t } = useI18n()

const props = defineProps<{
  type: MoveType
  size: string | number
}>()

const img = computed(() => {
  switch (props.type) {
    case MOVE_I:
      return ImgI
    case MOVE_A:
      return ImgA
    case MOVE_C:
      return ImgC
    case MOVE_F:
      return ImgF
  }

  return undefined
})
</script>
