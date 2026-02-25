<template>
  <v-img :src="imageUrl" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
const imageUrl = new URL(
  `../../assets/sprite-sheets/${props.name}.png`,
  import.meta.url,
).href
</script>
