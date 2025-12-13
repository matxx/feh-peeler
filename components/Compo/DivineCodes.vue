<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltipProps }">
      <v-sheet
        v-bind="tooltipProps"
        :height="size"
        :width="size"
        color="transparent"
      >
        <AppIconDivineCodesDetails
          :ephemera="ephemera"
          :number="number"
          :height="size"
          :width="size"
          :class="{
            'filter-grayscale-1': disabled,
            'opacity-50': disabled,
          }"
        />
      </v-sheet>
    </template>

    <div>
      <div>
        {{
          ephemera
            ? t('skillsOwners.availability.limitedDivineCode')
            : t('skillsOwners.availability.divineCode')
        }}
      </div>
      <slot name="tooltip:append" />
    </div>
  </v-tooltip>
</template>

<script setup lang="ts">
const { t } = useI18n()
withDefaults(
  defineProps<{
    size: number
    number?: number
    disabled?: boolean
    ephemera?: boolean
  }>(),
  {
    number: undefined,
    disabled: false,
    ephemera: false,
  },
)
</script>
