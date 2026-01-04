<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showSeal(seal.id)"
      >
        <div class="d-flex align-center">
          <SealImg
            :seal="seal"
            :size="tileSize"
            class="mr-3"
          />
          <div>
            {{ seal.name }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISeal } from '@/utils/types/seals'
const storeGlobals = useStoreGlobals()

defineProps<{
  seal: ISeal
  tileSize: number
}>()
</script>
