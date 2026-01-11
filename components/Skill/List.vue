<template>
  <div>
    <div class="d-flex justify-space-between align-center mx-3 mb-3">
      <SkillOwnersSorting v-if="showOwners" />

      <v-icon
        v-show="showScrollHelper"
        disabled
        class="bounce-horizontally"
      >
        mdi-chevron-right-circle-outline
      </v-icon>
    </div>

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
          <SkillListItem
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

const { mobile, xs, sm, md, lg, xl, xxl } = useDisplay()

const props = defineProps<{
  showOwners: boolean
  skills: ISkill[]
  tileSize: number
}>()

const skillsCount = computed(() => props.skills.length)
const colsSpanRaw = computed(() => {
  switch (skillsCount.value) {
    case 0:
    case 1:
      return GRID_COLUMNS_COUNT
    case 2:
      return GRID_COLUMNS_COUNT / 2
    case 3:
      return GRID_COLUMNS_COUNT / 3
    case 4:
      return GRID_COLUMNS_COUNT / 4
    case 5:
    case 6:
      return GRID_COLUMNS_COUNT / 6
    default:
      return GRID_COLUMNS_COUNT / GRID_COLUMNS_COUNT
  }
})
const colsSpanMin = computed(() => {
  if (mobile.value) return GRID_COLUMNS_COUNT

  if (xs.value) return GRID_COLUMNS_COUNT
  if (sm.value) return GRID_COLUMNS_COUNT
  if (md.value) return GRID_COLUMNS_COUNT / 2
  if (lg.value) return GRID_COLUMNS_COUNT / 3
  if (xl.value) return GRID_COLUMNS_COUNT / 4
  if (xxl.value) return GRID_COLUMNS_COUNT / 6

  return colsSpanRaw.value * 2
})
const colsSpanEffective = computed(() => {
  return Math.max(colsSpanRaw.value, colsSpanMin.value)
})
const columnCountEffective = computed(
  () => GRID_COLUMNS_COUNT / colsSpanEffective.value,
)
const showScrollHelper = computed(
  () => !mobile.value && columnCountEffective.value < skillsCount.value,
)
</script>

<style lang="scss" scoped>
// https://codepen.io/nelledejones/pen/gOOPWrK
.bounce-horizontally {
  animation: bounce 2s ease infinite;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(-5px);
  }
}
</style>
