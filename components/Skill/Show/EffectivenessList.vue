<template>
  <div
    v-if="skill.eff"
    class="d-flex"
  >
    <SkillShowEffectivenessListItem
      v-for="item in skill.eff"
      :key="item"
      :effectiveness="item"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'

defineProps<{
  skill: ISkill
  size: number
}>()
</script>
