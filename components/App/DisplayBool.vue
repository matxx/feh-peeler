<template>
  <v-icon :color="bool ? 'green' : 'red'">
    {{ bool ? 'mdi-check-circle' : 'mdi-close-circle' }}
  </v-icon>
</template>

<script setup lang="ts">
defineProps<{
  bool: boolean
}>()
</script>
