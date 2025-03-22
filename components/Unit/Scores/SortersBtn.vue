<template>
  <v-btn size="small">
    <img
      v-if="field === MOVE"
      src="assets/icons/move_types/i.png"
      :width="size"
      :height="size"
    />
    <img
      v-if="field === WEAP"
      src="assets/icons/weapon_types/all_sword.png"
      :width="size"
      :height="size"
    />
    <v-icon
      v-if="field === NAME"
      :width="size"
      :height="size"
    >
      mdi-alphabetical-variant
    </v-icon>

    <v-icon class="icon-order">
      {{ order === ASC ? 'mdi-arrow-down-thin' : 'mdi-arrow-up-thin' }}
    </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import type { SortingField, Order } from '@/utils/types/scores'
import { ASC, NAME, MOVE, WEAP } from '@/utils/types/scores'
defineProps<{
  field: SortingField
  order: Order
  size: number
}>()
</script>

<style lang="scss" scoped>
.icon-order {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
