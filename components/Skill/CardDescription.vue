<template>
  <v-card class="ma-1">
    <v-card-title class="d-flex justify-space-between align-center">
      <AppLink
        :disabled="SKILL_CATEGORIES_WITHOUT_NAME.includes(skill.category)"
        class="d-flex align-center"
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id)"
      >
        <SkillImg
          :skill="skill"
          :size="size"
          class="mr-2"
        />
        <span v-if="skill.category === SKILL_DUO">
          {{ t('global.skillDuo') }}
        </span>
        <span v-else-if="skill.category === SKILL_HARMONIZED">
          {{ t('global.skillHarmonized') }}
        </span>
        <span v-else-if="skill.category === SKILL_EMBLEM">
          {{ t('global.skillEmblem') }}
        </span>
        <span v-else>
          {{ skill.name }}
        </span>
      </AppLink>
      <div>
        <SkillImgCategory
          :category="skill.category"
          :size="size"
          class="ml-2"
        />
      </div>
    </v-card-title>
    <v-card-text>
      <SkillDescription :skill="skill" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {
  SKILL_CATEGORIES_WITHOUT_NAME,
  SKILL_DUO,
  SKILL_EMBLEM,
  SKILL_HARMONIZED,
  type ISkill,
} from '~/utils/types/skills'
defineProps<{ skill: ISkill; size: number }>()
const { t } = useI18n()
const storeGlobals = useStoreGlobals()
</script>
