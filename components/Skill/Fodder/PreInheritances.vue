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
import compact from 'lodash-es/compact'

import type { ISkill } from '@/utils/types/skills'

const storeDataSkills = useStoreDataSkills()

const props = defineProps<{
  skill: ISkill
  tileSize: number
  skillIconSize: number
  sortedByAvailability: boolean
}>()

const bridges = computed(() =>
  props.skill.downgrade_ids
    ? compact(
        props.skill.downgrade_ids.map(
          (bridgeId) => storeDataSkills.skillsById[bridgeId],
        ),
      )
    : [],
)
</script>
