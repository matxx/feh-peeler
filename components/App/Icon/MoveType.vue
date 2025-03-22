<template>
  <img
    :src="image"
    :width="size"
    :height="size"
  />
</template>

<script setup lang="ts">
import type { MoveType } from '@/utils/types/moves'
import { MOVE_I, MOVE_A, MOVE_C, MOVE_F } from '@/utils/types/moves'

import IconA from '@/assets/icons/move_types/a.png'
import IconC from '@/assets/icons/move_types/c.png'
import IconF from '@/assets/icons/move_types/f.png'
import IconI from '@/assets/icons/move_types/i.png'

const props = defineProps<{
  moveType: MoveType
  size: number
}>()

const image = computed(() => {
  switch (props.moveType) {
    case MOVE_I:
      return IconI
    case MOVE_A:
      return IconA
    case MOVE_C:
      return IconC
    case MOVE_F:
      return IconF
  }

  return undefined
})
</script>
