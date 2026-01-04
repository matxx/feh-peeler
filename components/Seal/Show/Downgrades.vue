<template>
  <SealShowSeals
    :seals="downgrades"
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

const downgrades = computed(() =>
  props.seal.downgrade_ids
    ? compact(
        props.seal.downgrade_ids.map((id) => storeDataSeals.sealsById[id]),
      )
    : [],
)
</script>
