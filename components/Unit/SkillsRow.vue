<template>
  <tr>
    <th
      v-if="index === 0"
      :rowspan="categorySkillsCount"
      class="border-b-lg"
    >
      <SkillImgCategory
        :category="category"
        :size="size / 2"
      />
    </th>
    <td :class="{ 'border-b-lg': isLastRow }">
      <NuxtLink
        class="d-flex align-center"
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id, TAB_FODDERS)"
      >
        <SkillImg
          v-show="SKILL_CATEGORIES_WITH_ICON.includes(category)"
          :skill="skill"
          :size="size / 2"
          class="mr-2"
        />
        {{ skill.name }}
      </NuxtLink>
    </td>
    <td :class="{ 'border-b-lg': isLastRow }">
      <v-sheet class="d-flex align-center">
        <UnitSkillEquippedRarity
          :unit="unit"
          :skill="skill"
          :tile-size="(size * 3) / 4"
        />
      </v-sheet>
    </td>
    <td :class="{ 'border-b-lg': isLastRow }">
      <v-sheet class="d-flex align-center">
        <UnitSkillUnlockRarity
          :unit="unit"
          :skill="skill"
          :tile-size="(size * 3) / 4"
        />
      </v-sheet>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {
  SKILL_CATEGORIES_WITH_ICON,
  TAB_FODDERS,
  type ISkill,
  type SkillCategory,
} from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

const props = defineProps<{
  unit: IUnit
  category: SkillCategory
  categorySkillsCount: number
  skill: ISkill
  index: number
  size: number
}>()

const storeGlobals = useStoreGlobals()

const isLastRow = computed(() => props.index === props.categorySkillsCount - 1)
</script>
