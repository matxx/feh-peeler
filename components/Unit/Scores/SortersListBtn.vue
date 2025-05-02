<template>
  <v-card>
    <v-btn-group
      variant="outlined"
      divided
    >
      <UnitScoresSortersBtn
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
import type { ISorter } from '@/utils/types/units-filters'
import { ASC, DESC, NAME, MOVE, WEAP } from '@/utils/types/units-filters'
defineProps<{
  size: number
}>()
defineEmits(['update'])

const descs: ISorter[] = [
  { field: MOVE, order: ASC },
  { field: MOVE, order: DESC },
  { field: WEAP, order: ASC },
  { field: WEAP, order: DESC },
  { field: NAME, order: ASC },
  { field: NAME, order: DESC },
]
</script>

<style lang="scss" scoped>
.icon-order {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
