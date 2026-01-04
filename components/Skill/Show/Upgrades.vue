<template>
  <SkillShowSkills
    :skills="upgradesSorted"
    :tile-size="tileSize"
  />
</template>

<script setup lang="ts">
import orderBy from 'lodash-es/orderBy'
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
        props.skill.upgrade_ids.map((id) => storeDataSkills.skillsById[id]),
      )
    : [],
)
const upgradesSorted = computed(() =>
  orderBy(upgrades.value, ['is_prf', 'release_date'], ['desc', 'desc']),
)
</script>
