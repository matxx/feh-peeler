<template>
  <CompoRestrictionLayout
    :size="size"
    :can-use="canUse"
  >
    <template #default="{ size: sizeInSlot }">
      <AppIconWeaponType
        :weapon-type="weaponType"
        :size="sizeInSlot"
      />
    </template>
  </CompoRestrictionLayout>
</template>

<script setup lang="ts">
import type { ExtendedWeaponType } from '@/utils/types/weapons'
withDefaults(
  defineProps<{
    weaponType: ExtendedWeaponType
    size: number
    canUse?: boolean
  }>(),
  {
    canUse: false,
  },
)
</script>
