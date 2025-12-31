<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showSkill(skill.id, TAB_OWNERS)"
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

      <div
        v-if="skill.is_prf"
        v-show="!mobile"
      >
        <v-icon
          v-tooltip="t('global.exclusiveSkill')"
          :size="tileSize"
          class="text-error"
        >
          mdi-cancel
        </v-icon>
      </div>

      <v-btn
        v-show="!alwaysOpen && mobile"
        class="ml-3"
        variant="text"
        @click="isOpen = !isOpen"
      >
        <AppChevronRight :is-open="isOpen" />
      </v-btn>
    </div>

    <div v-show="alwaysOpen || !mobile || isOpen">
      <SkillShowOwners
        :skill="skill"
        :tile-size="tileSize"
        hide-sorting
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TAB_OWNERS, type ISkill } from '@/utils/types/skills'

const { t } = useI18n()
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
