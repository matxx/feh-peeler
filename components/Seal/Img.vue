<template>
  <img
    v-if="seal.image_url"
    :src="seal.image_url"
    :height="size"
    :width="size"
  />
</template>

<script setup lang="ts">
import type { ISeal } from '@/utils/types/seals'
defineProps<{
  seal: ISeal
  size: number
}>()
</script>
