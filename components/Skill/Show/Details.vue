<template>
  <div>
    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('skills.show.sp') }}:</h4>
      <div>
        {{ skill.sp }}
      </div>
    </div>

    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('skills.show.canUse') }}:</h4>
      <SkillRestrictions
        :skill="skill"
        :size="30"
      />
    </div>

    <div>
      <h4 class="mt-5 mb-2">{{ t('skills.show.effect') }}</h4>
      <div
        v-for="(line, index) in lines"
        :key="index"
      >
        {{ line ? line : '&nbsp;' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'

const { t } = useI18n()

defineEmits(['close'])
const props = withDefaults(
  defineProps<{
    skill: ISkill
    showClose?: boolean
  }>(),
  {
    showClose: false,
  },
)

const storeDataSkillsDescriptions = useStoreDataSkillsDescriptions()
const description = computed(
  () =>
    storeDataSkillsDescriptions.skillsDescriptionsById[props.skill.id]
      ?.description,
)
const lines = computed(() =>
  description.value ? description.value.split('<br>') : [],
)
</script>
