<template>
  <div>
    <div
      v-for="bridge in bridges"
      :key="bridge.id"
      class="d-flex align-center"
    >
      <SkillFodderAvailabilities
        :skill="bridge"
        :tile-size="tileSize"
        :skill-icon-size="skillIconSize"
        :sorted-by-availability="sortedByAvailability"
        with-icon
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '@/utils/types/skills'

const storeSkills = useStoreSkills()

const props = defineProps<{
  skill: ISkill
  tileSize: number
  skillIconSize: number
  sortedByAvailability: boolean
}>()

const bridges = computed(() =>
  props.skill.bridge_ids.map((bridgeId) => storeSkills.skillsById[bridgeId]),
)
</script>
