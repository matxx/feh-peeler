<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id, TAB_FODDERS)"
      >
        <div class="d-flex align-center">
          <SkillImg
            :skill="skill"
            :size="tileSize"
            class="mr-3"
          />
          <div>
            {{ skill.name }}
          </div>
        </div>
      </NuxtLink>

      <v-btn
        v-show="!alwaysOpen && mobile"
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
      </v-btn>
    </div>

    <div v-show="alwaysOpen || !mobile || isOpen">
      <SkillShowFodders
        :skill="skill"
        :tile-size="tileSize"
        hide-sorting
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TAB_FODDERS, type ISkill } from '@/utils/types/skills'

const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()

withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    alwaysOpen?: boolean
  }>(),
  {
    alwaysOpen: false,
  },
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
