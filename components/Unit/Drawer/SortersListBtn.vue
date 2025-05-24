<template>
  <v-card>
    <v-btn-group
      variant="outlined"
      divided
    >
      <UnitDrawerSortersBtn
        v-for="(desc, index) in descs"
        :key="index"
        :field="desc.field"
        :order="desc.order"
        :size="size"
        @click="$emit('update', desc)"
      />
    </v-btn-group>
  </v-card>
</template>

<script setup lang="ts">
import {
  ASC,
  DESC,
  SORT_NAME,
  SORT_MOVE,
  SORT_WEAP,
  type ISorter,
} from '@/utils/types/units-sorters'
defineProps<{
  size: number
}>()
defineEmits(['update'])

const descs: ISorter[] = [
  { field: SORT_MOVE, order: ASC },
  { field: SORT_MOVE, order: DESC },
  { field: SORT_WEAP, order: ASC },
  { field: SORT_WEAP, order: DESC },
  { field: SORT_NAME, order: ASC },
  { field: SORT_NAME, order: DESC },
]
</script>

<style lang="scss" scoped>
.icon-order {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
