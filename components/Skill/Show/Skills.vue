<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <SkillFodderSorting />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="skill in skills"
        :key="skill.id"
        :cols="colsSpan"
      >
        <SkillShowSkill
          :skill="skill"
          :tile-size="tileSize"
          :always-open="skillsCount === 1"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { ISkill } from '@/utils/types/skills'

const { mobile } = useDisplay()

const props = defineProps<{
  skills: ISkill[]
  tileSize: number
}>()

const skillsCount = computed(() => props.skills.length)
const colsSpan = computed(() => {
  if (mobile.value) return GRID_COLUMNS_COUNT

  switch (skillsCount.value) {
    case 0:
    case 1:
      return GRID_COLUMNS_COUNT
    case 2:
      return GRID_COLUMNS_COUNT / 2
    case 3:
      return GRID_COLUMNS_COUNT / 3
    case 4:
      return GRID_COLUMNS_COUNT / 4
    case 5:
    case 6:
      return GRID_COLUMNS_COUNT / 6
    default:
      return GRID_COLUMNS_COUNT / GRID_COLUMNS_COUNT
  }
})
</script>
