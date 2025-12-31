<template>
  <SkillShowSkills
    :skills="downgradesSorted"
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

const downgrades = computed(() =>
  props.skill.downgrade_ids
    ? compact(
        props.skill.downgrade_ids.map(
          (downgradeId) => storeDataSkills.skillsById[downgradeId],
        ),
      )
    : [],
)
const downgradesSorted = computed(() =>
  orderBy(downgrades.value, ['is_prf', 'release_date'], ['desc', 'desc']),
)
</script>
