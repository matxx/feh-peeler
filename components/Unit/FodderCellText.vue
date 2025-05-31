<template>
  <span v-if="!hasRefSpecial && !hasRefMultipleSkills">
    {{ number }}
  </span>
  <span v-else> ({{ number }}) {{ suffix }} </span>
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

const props = defineProps<{
  number: number
  hasRefSpecial: boolean
  hasRefMultipleSkills: boolean
  refSpecialStars?: string
  refMultipleSkillsStars?: string
}>()

const suffix = computed(() => {
  const suffixes = []
  if (props.hasRefSpecial) {
    suffixes.push(props.refSpecialStars)
  }
  if (props.hasRefMultipleSkills) {
    suffixes.push(props.refMultipleSkillsStars)
  }
  return sortBy(compact(suffixes), (s) => s.length).join(' ')
})
</script>
