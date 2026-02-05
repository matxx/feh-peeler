<template>
  <div>
    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('skills.show.tier') }}:</h4>
      <div>
        {{ skill.tier }}
      </div>
    </div>

    <div
      :class="skill.eff ? 'd-flex' : 'd-none'"
      class="mb-2 align-center"
    >
      <h4 class="mr-3">{{ t('skills.show.effectiveness') }}:</h4>
      <SkillEffectivenessList
        :skill="skill"
        :size="size"
      />
    </div>

    <div
      :class="skill.cd ? 'd-flex' : 'd-none'"
      class="mb-2 align-center"
    >
      <h4 class="mr-3">{{ t('skills.show.cd') }}:</h4>
      <div>
        {{ skill.cd }}
      </div>
    </div>

    <div
      :class="skill.might ? 'd-flex' : 'd-none'"
      class="mb-2 align-center"
    >
      <h4 class="mr-3">{{ t('skills.show.might') }}:</h4>
      <div>
        {{ skill.might }}
      </div>
    </div>

    <div
      :class="skill.range ? 'd-flex' : 'd-none'"
      class="mb-2 align-center"
    >
      <h4 class="mr-3">{{ t('skills.show.range') }}:</h4>
      <div>
        {{ skill.range }}
      </div>
    </div>

    <div
      :class="skill.sp ? 'd-flex' : 'd-none'"
      class="mb-2 align-center"
    >
      <h4 class="mr-3">{{ t('skills.show.sp') }}:</h4>
      <div>
        {{ skill.sp }}
      </div>
    </div>

    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('skills.show.canUse') }}:</h4>
      <SkillRestrictions
        :skill="skill"
        :size="size"
      />
    </div>

    <div>
      <h4 class="mt-5 mb-2">{{ t('skills.show.effect') }}</h4>
      <SkillDescription :skill="skill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'

const size = 30

const { t } = useI18n()

defineEmits(['close'])
withDefaults(
  defineProps<{
    skill: ISkill
    showClose?: boolean
  }>(),
  {
    showClose: false,
  },
)
</script>
