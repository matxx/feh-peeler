<template>
  <tr>
    <td>
      <div class="d-flex align-center">
        <CompoUnitThumbnail
          :unit="unit"
          :size="tileSize"
          :size-corner="tileSize / 3"
        />
        <div>
          <a
            :href="storeLinks.unit(unit)"
            target="_blank"
            class="text-decoration-none"
          >
            {{ unit.full_name }}
          </a>
        </div>
      </div>
    </td>
    <td>
      <UnitAvailability
        :unit="unit"
        :tile-size="tileSize"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { IUnit } from '@/utils/types/units'

withDefaults(
  defineProps<{
    unit: IUnit
    tileSize: number
    size?: number
    sizeCorner?: number
  }>(),
  { size: 80, sizeCorner: 30 },
)
const storeLinks = useStoreLinks()
</script>
