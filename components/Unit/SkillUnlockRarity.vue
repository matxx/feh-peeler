<template>
  <AppIconRarity
    v-if="rarity"
    :rarity="rarity"
    :size="`${tileSize}px`"
  />
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'
import type { IUnit } from '@/utils/types/units'

const props = defineProps<{
  skill: ISkill
  unit: IUnit
  tileSize: number
}>()

const storeDataSkillsUnits = useStoreDataSkillsUnits()

const bySkillId = computed(() => {
  if (!storeDataSkillsUnits.isLoaded) return

  return storeDataSkillsUnits.bySkillIdByUnitId[props.unit.id]
})
const skillUnit = computed(() => {
  if (!bySkillId.value) return

  return bySkillId.value[props.skill.id]
})
const rarity = computed(() => {
  if (!skillUnit.value) return

  return skillUnit.value.unlock
})
</script>
