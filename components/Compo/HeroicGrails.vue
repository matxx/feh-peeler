<template>
  <v-tooltip :location="tooltipLocation">
    <template #activator="{ props: tooltipProps }">
      <CompoAvailabilityLayoutInverse
        v-bind="tooltipProps"
        :disabled="disabled"
        :size="size"
        :rarity="rarity"
        :show-rarity="showRarity"
      >
        <template #kind>
          <v-img
            src="assets/icons/fodder/heroic_grail.png"
            :class="{
              'filter-grayscale-1': disabled,
              'opacity-50': disabled,
            }"
          />
        </template>
      </CompoAvailabilityLayoutInverse>
    </template>

    {{ t('skillsOwners.availability.heroicGrails') }}
  </v-tooltip>
</template>

<script setup lang="ts">
import type { Anchor } from 'vuetify'
const { t } = useI18n()
withDefaults(
  defineProps<{
    rarity?: number
    showRarity?: boolean
    size: number
    disabled?: boolean
    tooltipLocation?: Anchor
  }>(),
  {
    rarity: undefined,
    showRarity: false,
    disabled: false,
    tooltipLocation: 'top',
  },
)
</script>
