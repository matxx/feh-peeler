<template>
  <div class="d-flex align-center">
    <UnitAvailability
      :unit="unit"
      :tile-size="tileSize"
    />
    <span
      v-if="unit.is_tt"
      v-tooltip="t('units.filters.tooltips.isTT')"
    >
      ({{ t('units.filters.buttons.isTT') }})
    </span>
    <span
      v-if="unit.is_ghb"
      v-tooltip="t('units.filters.tooltips.isGHB')"
    >
      ({{ t('units.filters.buttons.isGHB') }})
    </span>
  </div>
</template>

<script setup lang="ts">
import type { IUnit } from '@/utils/types/units'
defineProps<{
  unit: IUnit
  tileSize: number
}>()
const { t } = useI18n()
</script>
