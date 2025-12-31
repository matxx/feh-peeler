<template>
  <v-icon
    left
    class="chevron-right"
    :class="{ 'chevron-right--opened': isOpen }"
  >
    mdi-chevron-right
  </v-icon>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>

<style scoped>
.chevron-right {
  color: inherit;
  transition: transform 0.2s ease-in-out;
}
.chevron-right--opened {
  transform: rotate(90deg);
}
</style>
