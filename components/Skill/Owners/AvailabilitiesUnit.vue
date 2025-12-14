<template>
  <tr>
    <td>
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showUnit(unit.id, TAB_FODDER)"
      >
        <div class="d-flex align-center">
          <CompoUnitThumbnail
            :unit="unit"
            :size="tileSize"
            :size-corner="tileSize / 3"
          />
          <div v-show="!mobile">
            {{ unit.abbreviated_name }}
          </div>
        </div>
      </NuxtLink>
    </td>
    <td>
      <UnitAvailability
        :unit="unit"
        :tile-size="tileSize"
      />
    </td>
    <td>
      <UnitSkillUnlockRarity
        :unit="unit"
        :skill="skill"
        :tile-size="(tileSize * 3) / 4"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'
import { TAB_FODDER, type IUnit } from '@/utils/types/units'

withDefaults(
  defineProps<{
    skill: ISkill
    unit: IUnit
    tileSize: number
    size?: number
    sizeCorner?: number
  }>(),
  { size: 80, sizeCorner: 30 },
)

const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()
</script>
