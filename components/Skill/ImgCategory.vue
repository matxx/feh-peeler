<template>
  <img
    :src="img"
    :width="size"
    :height="size"
    :alt="t(`global.assets.icons.alt.skills.${category}`)"
  />
</template>

<script setup lang="ts">
import * as skills from '@/utils/types/skills'
import type { SkillCategory } from '@/utils/types/skills'

import ImgSkillWeapon from '~/assets/icons/skills/weapon.png'
import ImgSkillAssist from '~/assets/icons/skills/assist.png'
import ImgSkillSpecial from '~/assets/icons/skills/special.png'

import ImgSkillA from '~/assets/icons/skills/a.png'
import ImgSkillB from '~/assets/icons/skills/b.png'
import ImgSkillC from '~/assets/icons/skills/c.png'
import ImgSkillS from '~/assets/icons/skills/s.png'
import ImgSkillX from '~/assets/icons/skills/x.png'

const { t } = useI18n()

const props = defineProps<{
  category: SkillCategory
  size: string | number
}>()

const img = computed(() => {
  switch (props.category) {
    case skills.SKILL_WEAPON:
      return ImgSkillWeapon
    case skills.SKILL_ASSIST:
      return ImgSkillAssist
    case skills.SKILL_SPECIAL:
      return ImgSkillSpecial
    case skills.SKILL_PASSIVE_A:
      return ImgSkillA
    case skills.SKILL_PASSIVE_B:
      return ImgSkillB
    case skills.SKILL_PASSIVE_C:
      return ImgSkillC
    case skills.SKILL_PASSIVE_S:
      return ImgSkillS
    case skills.SKILL_PASSIVE_X:
      return ImgSkillX
  }

  return undefined
})
</script>
