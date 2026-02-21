<template>
  <v-row no-gutters>
    <v-col :cols="displaySelect ? 8 : 12">
      <AppSelectSkill
        :model-value="unitInstance.skillIds[category]"
        :skill-category="category"
        :unit="unit"
        prepend-category
        without-thumbnail
        clearable
        class="mb-2"
        :class="{ 'mr-2': displaySelect }"
        menu-icon=""
        @focus="isFocused = true"
        @blur="isFocused = false"
        @update:model-value="$emit('select-skill', { category, id: $event })"
      />
    </v-col>
    <v-col
      :cols="4"
      :class="{ 'd-none': !displaySelect }"
    >
      <v-select
        v-if="availableSp"
        :model-value="unitInstance.skillSPs[category]"
        :items="availableSp"
        :item-title="(item) => t('scoreCalc.labels.sp', { value: item })"
        :item-value="(item) => item"
        class="mb-2"
        density="compact"
        hide-details
        menu-icon=""
        @update:model-value="$emit('select-sp', { category, sp: $event })"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { IUnitInstanceInScoreCalc } from '~/utils/types/score-calc'
import type { SkillCategory } from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

defineEmits(['select-skill', 'select-sp'])
const props = defineProps<{
  unit?: IUnit
  unitInstance: IUnitInstanceInScoreCalc
  category: SkillCategory
  availableSp?: number[]
}>()

const { t } = useI18n()

const isFocused = ref(false)
const displaySelect = computed(() => !!props.availableSp && !isFocused.value)
</script>
