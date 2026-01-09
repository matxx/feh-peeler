<template>
  <div v-if="skill.eff && skill.eff.includes(EFF_ALL)">
    {{ t('global.all') }}
  </div>
  <div
    v-else-if="skill.eff"
    class="d-flex"
  >
    <SkillEffectivenessListItem
      v-for="item in skill.eff"
      :key="item"
      :eff="item"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
import { EFF_ALL, type ISkill } from '~/utils/types/skills'
const { t } = useI18n()
defineProps<{
  skill: ISkill
  size: number
}>()
</script>
