<template>
  <v-chip>
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
  skillId: SkillId | null
}>()

const storeSkillsRatingsGame8 = useStoreSkillsRatingsGame8()

const ratings = computed(() =>
  props.skillId
    ? storeSkillsRatingsGame8.skillsRatingsGame8ById[props.skillId]
    : undefined,
)
</script>
