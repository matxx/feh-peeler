<template>
  <div>
    <div
      v-for="(line, index) in lines"
      :key="index"
    >
      {{ line ? line : '&nbsp;' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'
const props = defineProps<{ skill: ISkill }>()
const storeSkillsDescriptions = useStoreSkillsDescriptions()
const description = computed(
  () =>
    storeSkillsDescriptions.skillsDescriptionsById[props.skill.id]?.description,
)
const lines = computed(() =>
  description.value ? description.value.split('<br>') : [],
)
</script>
