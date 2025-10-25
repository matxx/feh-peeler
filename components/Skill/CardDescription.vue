<template>
  <v-card class="ma-1">
    <v-card-title class="d-flex align-center">
      <SkillImg
        :skill="skill"
        :size="size"
        class="mr-2"
      />
      {{ skill.name }}
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
