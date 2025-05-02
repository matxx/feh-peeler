<template>
  <v-btn-group
    variant="outlined"
    divided
  >
    <v-menu
      v-for="i in sorters.fields.length"
      :key="i"
      location="bottom"
    >
      <template #activator="{ props }">
        <UnitScoresSortersBtn
          v-bind="props"
          :field="sorters.fields[i - 1]"
          :order="sorters.orders[i - 1]"
          :size="size"
        />
      </template>
      <UnitScoresSortersListBtn
        :size="size"
        @update="$emit('update', [i - 1, $event])"
      />
    </v-menu>
  </v-btn-group>
</template>

<script setup lang="ts">
import type { ISorters } from '@/utils/types/units-filters'
defineProps<{
  sorters: ISorters
  size: number
}>()
defineEmits(['update'])
</script>
