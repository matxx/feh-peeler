<template>
  <v-card class="ma-1">
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <SkillImg
          :skill="skill"
          :size="size"
          class="mr-2"
        />
        {{ skill.name }}
      </div>
      <div>
        <SkillImgCategory
          :category="skill.category"
          :size="size"
          class="ml-2"
        />
      </div>
    </v-card-title>
    <v-card-text>
      <SkillDescription :skill="skill" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'
defineProps<{ skill: ISkill; size: number }>()
</script>
