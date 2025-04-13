<template>
  <img
    v-if="skill.image_url"
    :src="skill.image_url"
    :height="size"
    :width="size"
  />
  <AppIconWeaponType
    v-else-if="skill.weapon_type"
    :weapon-type="skill.weapon_type"
    :size="size"
  />
  <SkillImgCategory
    v-else
    :category="skill.category"
    :size="size"
  />
</template>

<script setup lang="ts">
import type { ISkill } from '@/utils/types/skills'
defineProps<{
  skill: ISkill
  size: number
}>()
</script>
