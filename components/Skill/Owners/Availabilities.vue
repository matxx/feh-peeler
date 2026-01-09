<template>
  <div>
    <div class="d-flex align-center my-1">
      <NuxtLink
        class="d-flex mr-5"
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id, TAB_OWNERS)"
      >
        <SkillImg
          v-show="withIcon"
          v-tooltip="skill.name"
          :skill="skill"
          :size="skillIconSize"
        />
      </NuxtLink>

      <SkillAvailability
        :skill="skill"
        :tile-size="tileSize"
      />

      <!-- <v-btn
        class="ml-3"
        variant="text"
        @click="isOpen = !isOpen"
      >
        <AppChevronRight :is-open="isOpen" />
        {{ t('global.details') }}
      </v-btn> -->
    </div>

    <AppRenderOnceWhileActive :active="isOpen">
      <SkillOwners
        :skill="skill"
        :tile-size="tileSize"
      />
    </AppRenderOnceWhileActive>
  </div>
</template>

<script setup lang="ts">
import { TAB_OWNERS, type ISkill } from '@/utils/types/skills'

const storeGlobals = useStoreGlobals()

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
