<template>
  <div>
    <v-chip-group column>
      <v-chip label> {{ t('skills.show.tier') }}: {{ skill.tier }} </v-chip>

      <v-chip
        v-show="skill.eff"
        label
      >
        {{
          mobile ? t('skills.show.eff') : t('skills.show.effectiveness')
        }}:&nbsp;
        <SkillEffectivenessList
          :skill="skill"
          :size="SIZE"
        />
      </v-chip>

      <v-chip
        v-show="skill.cd"
        label
      >
        {{ t('skills.show.cd') }}: {{ skill.cd }}
      </v-chip>

      <v-chip
        v-show="skill.might"
        label
      >
        {{ t('skills.show.might') }}: {{ skill.might }}
      </v-chip>

      <v-chip
        v-show="skill.range"
        label
      >
        {{ t('skills.show.range') }}: {{ skill.range }}
      </v-chip>

      <v-chip
        v-show="skill.sp"
        label
      >
        {{ t('skills.show.sp') }}: {{ skill.sp }}
      </v-chip>

      <v-chip label>
        <span v-if="skill.is_prf"> {{ t('skills.show.prf') }} </span>
        <template v-else>
          <span v-show="!mobile">{{ t('skills.show.canUse') }}:&nbsp;</span>
          <SkillRestrictions
            :skill="skill"
            :size="SIZE"
          />
        </template>
      </v-chip>
    </v-chip-group>

    <div class="mt-3">
      <SkillDescription :skill="skill" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'

const SIZE = 20

const { t } = useI18n()
const { mobile } = useDisplay()

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
