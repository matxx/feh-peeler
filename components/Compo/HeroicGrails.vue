<template>
  <v-tooltip :location="tooltipLocation">
    <template #activator="{ props: tooltipProps }">
      <v-sheet
        v-bind="tooltipProps"
        :height="size"
        :width="size"
        color="transparent"
      >
        <v-img
          src="assets/icons/fodder/heroic_grail.png"
          :class="{
            'filter-grayscale-1': disabled,
            'opacity-50': disabled,
          }"
        />
      </v-sheet>
    </template>

    {{ t('skillsFodders.availability.heroicGrails') }}
  </v-tooltip>
</template>

<script setup lang="ts">
import type { Anchor } from 'vuetify'
const { t } = useI18n()
withDefaults(
  defineProps<{
    size: number
    disabled?: boolean
    tooltipLocation?: Anchor
  }>(),
  {
    disabled: false,
    tooltipLocation: 'top',
  },
)
</script>
