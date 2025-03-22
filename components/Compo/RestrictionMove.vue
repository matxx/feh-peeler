<template>
  <CompoRestrictionLayout
    :size="size"
    :can-use="canUse"
  >
    <template #default="{ size: sizeInSlot }">
      <AppIconMoveType
        :move-type="moveType"
        :size="sizeInSlot"
      />
    </template>
  </CompoRestrictionLayout>
</template>

<script setup lang="ts">
import type { MoveType } from '@/utils/types/moves'
withDefaults(
  defineProps<{
    moveType: MoveType
    size: number
    canUse?: boolean
  }>(),
  {
    canUse: false,
  },
)
</script>
