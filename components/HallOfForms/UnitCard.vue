<template>
  <v-card
    class="fill-height"
    :color="isSelected ? storeTheme.highlightBgColor : undefined"
  >
    <v-card-text class="fill-height d-flex flex-column">
      <v-overlay
        :model-value="isLoading"
        contained
        class="align-center justify-center"
      >
        <v-progress-circular
          color="primary"
          indeterminate
        />
      </v-overlay>

      <VeeField
        v-slot="{ handleChange, errors }"
        :value="unitInstance.id"
        name="id"
      >
        <AppSelectUnit
          :model-value="unitInstance.id"
          required
          class="mb-2"
          :error-messages="errors"
          :label="t('hallOfForms.unitName')"
          @update:model-value="
            ($event) => {
              $emit('input', $event)
              handleChange($event)
            }
          "
        >
          <template #prepend>
            <v-btn
              v-tooltip="t('hallOfForms.selectUnit')"
              icon="mdi-select"
              size="x-small"
              @click="$emit('select')"
            />
          </template>
        </AppSelectUnit>
      </VeeField>

      <HallOfFormsUnitCardBody
        :unit-instance="unitInstance"
        with-skill-s
        :show-sp="showSp"
        @select-skill-category="$emit('select-skill-category', $event)"
        @unequip="$emit('unequip-skill', $event)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { IUnitInstance } from '~/utils/types/units'

defineEmits(['input', 'select', 'select-skill-category', 'unequip-skill'])
withDefaults(
  defineProps<{
    unitInstance: IUnitInstance
    isSelected?: boolean
    isLoading?: boolean
    showSp?: boolean
  }>(),
  {
    isLoading: false,
    isSelected: false,
    showSp: false,
  },
)

const { t } = useI18n()
const storeTheme = useStoreTheme()
</script>
