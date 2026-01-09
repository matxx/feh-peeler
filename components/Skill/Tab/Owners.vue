<template>
  <SkillOwners
    :skill="skill"
    :tile-size="tileSize"
    :hide-sorting="hideSorting"
  />
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'

withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    hideSorting?: boolean
  }>(),
  {
    hideSorting: false,
  },
)
</script>
