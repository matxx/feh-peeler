<template>
  <span
    v-for="(line, index) in lines"
    :key="index"
    :class="{
      'v-autocomplete__unmask': index % 2 === 0,
      'v-autocomplete__mask': index % 2 === 1,
    }"
  >
    {{ line }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  regexp: RegExp
}>()
const SPLIT = '[SPLIT]'
const lines = computed(() =>
  props.text
    .replace(props.regexp, (match) => `${SPLIT}${match}${SPLIT}`)
    .split(SPLIT),
)
</script>
