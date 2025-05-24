<template>
  <v-btn size="small">
    <img
      v-if="field === SORT_MOVE"
      src="assets/icons/move_types/i.png"
      :width="size"
      :height="size"
    />
    <img
      v-if="field === SORT_WEAP"
      src="assets/icons/weapon_types/all_sword.png"
      :width="size"
      :height="size"
    />
    <v-icon
      v-if="field === SORT_NAME"
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
import {
  ASC,
  SORT_NAME,
  SORT_MOVE,
  SORT_WEAP,
  type SortingField,
  type Order,
} from '@/utils/types/units-sorters'
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
