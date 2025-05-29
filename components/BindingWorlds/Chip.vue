<template>
  <v-chip v-tooltip:bottom="skill?.name">
    <SkillImgCategory
      :category="category"
      :size="SIZE"
    />
    :
    <span class="width-20px mx-1">
      {{ ratings?.game8_rating }}
    </span>
    <AppIconGradeOrPlaceholder
      :grade="ratings?.game8_grade"
      :size="SIZE"
    />
  </v-chip>
</template>

<script setup lang="ts">
import type { SkillId, SkillCategory } from '~/utils/types/skills'

const SIZE = '18px'

const props = defineProps<{
  category: SkillCategory
  skillId?: SkillId
}>()

const storeDataSkills = useStoreDataSkills()
const storeDataSkillsRatingsGame8 = useStoreDataSkillsRatingsGame8()

const skill = computed(() =>
  props.skillId ? storeDataSkills.skillsById[props.skillId] : undefined,
)

const ratings = computed(() =>
  skill.value
    ? storeDataSkillsRatingsGame8.byId[skill.value.baseId]
    : undefined,
)
</script>
