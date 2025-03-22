<template>
  <v-chip>
    <SkillImgCategory
      :category="category"
      :size="SIZE"
      class="mr-2"
    />
    <span>{{ skill ? skill.name : '-' }}</span>
    <v-spacer />
    <span class="mr-2">
      {{ ratings?.game8_rating }}
    </span>
    <AppIconGradeOrPlaceholder
      :grade="ratings?.game8_grade"
      :size="SIZE"
      class="mr-2"
    />
    <span
      v-if="skill"
      v-show="showSp"
      class="mr-2 width-45px"
    >
      <span v-if="skill.sp">{{ skill.sp }} {{ t('global.sp') }}</span>
    </span>
    <v-icon
      :disabled="!skillId"
      @click.stop="$emit('unequip')"
    >
      mdi-close-circle
    </v-icon>
  </v-chip>
</template>

<script setup lang="ts">
import type { SkillId, SkillCategory } from '@/utils/types/skills'

const SIZE = '18px'

defineEmits(['unequip'])
const props = withDefaults(
  defineProps<{
    category: SkillCategory
    skillId: SkillId | null
    withSkillS?: boolean
    withSkillX?: boolean
    showSp?: boolean
  }>(),
  {
    withSkillS: false,
    withSkillX: false,
    showSp: false,
  },
)

const { t } = useI18n()
const storeSkills = useStoreSkills()
const storeSkillsRatingsGame8 = useStoreSkillsRatingsGame8()

const skill = computed(() =>
  props.skillId ? storeSkills.skillsById[props.skillId] : null,
)
const ratings = computed(() =>
  props.skillId
    ? storeSkillsRatingsGame8.skillsRatingsGame8ById[props.skillId]
    : undefined,
)
</script>

<style lang="css" scoped>
.width-45px {
  width: 45px;
}
</style>
