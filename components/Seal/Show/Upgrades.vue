<template>
  <SealShowSeals
    :seals="upgrades"
    :tile-size="tileSize"
  />
</template>

<script setup lang="ts">
import compact from 'lodash-es/compact'

import type { ISeal } from '@/utils/types/seals'

const storeDataSeals = useStoreDataSeals()

const props = defineProps<{
  seal: ISeal
  tileSize: number
}>()

const upgrades = computed(() =>
  props.seal.upgrade_ids
    ? compact(props.seal.upgrade_ids.map((id) => storeDataSeals.sealsById[id]))
    : [],
)
</script>
