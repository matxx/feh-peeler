<template>
  <v-card class="ma-1">
    <v-card-title class="d-flex justify-space-between align-center">
      <NuxtLink
        class="d-flex align-center"
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id)"
      >
        <SkillImg
          :skill="skill"
          :size="size"
          class="mr-2"
        />
        {{ skill.name }}
      </NuxtLink>
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
const storeGlobals = useStoreGlobals()
</script>
