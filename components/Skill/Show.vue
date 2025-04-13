<template>
  <v-card>
    <v-tabs
      v-model="tabSelected"
      bg-color="primary"
    >
      <v-tab
        v-for="tab in SHOW_TABS"
        :key="tab"
        :value="tab"
      >
        {{ t(`skills.show.tabs.${tab}`) }}
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tabSelected">
      <v-tabs-window-item :value="TAB_DETAILS">
        <SkillShowDetails :skill="skill" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="TAB_FODDERS">
        <SkillShowFodders
          :skill="skill"
          :tile-size="40"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import {
  SHOW_TABS,
  TAB_DETAILS,
  TAB_FODDERS,
  SHOW_DEFAULT_TAB,
  type ISkill,
} from '~/utils/types/skills'

const { t } = useI18n()

defineProps<{
  skill: ISkill
}>()

const tabSelected = ref(SHOW_DEFAULT_TAB)
</script>
