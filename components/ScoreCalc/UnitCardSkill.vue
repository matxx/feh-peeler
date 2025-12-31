<template>
  <v-row no-gutters>
    <v-col :cols="displaySelect ? 8 : 12">
      <component
        :is="category === SKILL_PASSIVE_S ? AppSelectSeal : AppSelectSkill"
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
        v-if="items"
        :model-value="unitInstance.skillSPs[category]"
        :items="items"
        :item-title="(item) => `${item} SP`"
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
import { AppSelectSeal, AppSelectSkill } from '#components'

import type { IUnitInstanceInScoreCalc } from '~/utils/types/score-calc'
import { SKILL_PASSIVE_S, type SkillCategory } from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

defineEmits(['select-skill', 'select-sp'])
const props = defineProps<{
  unit?: IUnit
  unitInstance: IUnitInstanceInScoreCalc
  category: SkillCategory
  availableSp?: number[]
  availableSpForSeals: number[]
}>()

const isFocused = ref(false)
const displaySelect = computed(() => !!items.value && !isFocused.value)

const items = computed(() =>
  props.category === SKILL_PASSIVE_S
    ? props.availableSpForSeals
    : props.availableSp,
)
</script>
