<template>
  <div>
    <SkillOwnersSorting
      v-if="showOwners"
      class="ml-3 mb-3"
    />

    <v-container fluid>
      <v-row
        :class="{
          'flex-nowrap': !mobile,
          'overflow-x-auto': !mobile,
        }"
      >
        <v-col
          v-for="skill in skills"
          :key="skill.id"
          :cols="colsSpanEffective"
        >
          <SkillShowSkill
            :show-owners="showOwners"
            :skill="skill"
            :tile-size="tileSize"
            :always-open="skillsCount === 1"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '@/utils/types/skills'

const { mobile } = useDisplay()

const props = defineProps<{
  showOwners: boolean
  skills: ISkill[]
  tileSize: number
}>()

const skillsCount = computed(() => props.skills.length)
const { colsSpanEffective } = useGrid(skillsCount)
</script>
