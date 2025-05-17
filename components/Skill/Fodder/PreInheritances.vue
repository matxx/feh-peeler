<template>
  <div>
    <div
      v-for="downgrade in downgrades"
      :key="downgrade.id"
      class="d-flex align-center"
    >
      <SkillFodderAvailabilities
        :skill="downgrade"
        :tile-size="tileSize"
        :skill-icon-size="skillIconSize"
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
}>()

const baseSkill = computed(() => storeDataSkills.skillsById[props.skill.baseId])
const downgrades = computed(() =>
  baseSkill.value?.downgrade_ids
    ? compact(
        baseSkill.value.downgrade_ids.map(
          (downgradeId) => storeDataSkills.skillsById[downgradeId],
        ),
      )
    : [],
)
</script>
