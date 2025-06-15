<template>
  <SkillShowSkills
    :skills="upgradesSorted"
    :tile-size="tileSize"
  />
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

import type { ISkill } from '@/utils/types/skills'

const storeDataSkills = useStoreDataSkills()

const props = defineProps<{
  skill: ISkill
  tileSize: number
}>()

const upgrades = computed(() =>
  props.skill.upgrade_ids
    ? compact(
        props.skill.upgrade_ids.map(
          (upgradeId) => storeDataSkills.skillsById[upgradeId],
        ),
      )
    : [],
)
const upgradesSorted = computed(() => sortBy(upgrades.value, 'is_prf'))
</script>
