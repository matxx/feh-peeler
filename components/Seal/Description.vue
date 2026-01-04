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
import type { ISeal } from '~/utils/types/seals'
const props = defineProps<{ seal: ISeal }>()
const storeDataSealsDescriptions = useStoreDataSealsDescriptions()
const description = computed(
  () => storeDataSealsDescriptions.byId[props.seal.id]?.description,
)
const lines = computed(() =>
  description.value ? description.value.split('<br>') : [],
)
</script>
