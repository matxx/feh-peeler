<template>
  <div>
    <div
      v-for="(line, index) in lines"
      :key="index"
    >
      {{ line ? line : '&nbsp;' }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>()
const lines = computed(() => props.text.split('<br>'))
</script>
