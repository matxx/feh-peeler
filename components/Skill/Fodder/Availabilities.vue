<template>
  <div>
    <div class="d-flex align-center my-1">
      <PlusModalLink
        :to="
          localePath({
            name: 'skills-name-tab',
            params: {
              name: skill.nameForLink,
              tab: TAB_FODDERS,
            },
          })
        "
        class="d-flex mr-5"
      >
        <SkillImg
          v-show="withIcon"
          v-tooltip="skill.name"
          :skill="skill"
          :size="skillIconSize"
        />
      </PlusModalLink>

      <SkillAvailability
        :skill="skill"
        :tile-size="tileSize"
      />

      <!-- <v-btn
        class="ml-3"
        variant="text"
        @click="isOpen = !isOpen"
      >
        <v-icon
          left
          class="chevron"
          :class="{ 'chevron--opened': isOpen }"
        >
          mdi-chevron-right
        </v-icon>
        {{ t('global.details') }}
      </v-btn> -->
    </div>

    <AppRenderOnceWhileActive :active="isOpen">
      <SkillShowFodders
        :skill="skill"
        :tile-size="tileSize"
      />
    </AppRenderOnceWhileActive>
  </div>
</template>

<script setup lang="ts">
import { TAB_FODDERS, type ISkill } from '@/utils/types/skills'

const localePath = useLocalePath()

withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    skillIconSize: number
    withIcon?: boolean
  }>(),
  { withIcon: false },
)

const isOpen = ref(false)
</script>

<style scoped>
.chevron {
  color: inherit;
  transition: transform 0.2s ease-in-out;
}
.chevron--opened {
  transform: rotate(90deg);
}
</style>
