<template>
  <AppIconGrade
    v-if="grade"
    :grade="grade"
    :size="size"
  />
  <span
    v-else
    :style="{ width: size }"
  />
</template>

<script setup lang="ts">
import type { Grade } from '~/utils/types/grades'
defineProps<{
  grade: undefined | null | Grade
  size: string | number
}>()
</script>
