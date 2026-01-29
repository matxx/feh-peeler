<template>
  <div v-if="description">
    <AppTextWithBrToLines :text="description.base" />
    <div
      v-if="description.base_keywords"
      v-show="storeSkillsKeywords.showKeywords"
    >
      <AppTextWithBrToLines
        v-for="(line, index) in description.base_keywords"
        :key="index"
        :text="line"
        class="mt-3"
      />
    </div>

    <div
      v-if="description.upgrade"
      class="mt-3 text-success"
    >
      <AppTextWithBrToLines :text="description.upgrade" />
      <div
        v-if="description.upgrade_keywords"
        v-show="storeSkillsKeywords.showKeywords"
      >
        <AppTextWithBrToLines
          v-for="(line, index) in description.upgrade_keywords"
          :key="index"
          :text="line"
          class="mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '~/utils/types/skills'
const props = defineProps<{ skill: ISkill }>()
const storeSkillsKeywords = useStoreSkillsKeywords()
const storeDataSkillsDescriptions = useStoreDataSkillsDescriptions()
const description = computed(
  () => storeDataSkillsDescriptions.byId[props.skill.id],
)
</script>
