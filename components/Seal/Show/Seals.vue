<template>
  <div>
    <v-container fluid>
      <v-row
        :class="{
          'flex-nowrap': !mobile,
          'overflow-x-auto': !mobile,
        }"
      >
        <v-col
          v-for="seal in seals"
          :key="seal.id"
          :cols="colsSpanEffective"
        >
          <SealShowSeal
            :seal="seal"
            :tile-size="tileSize"
            :always-open="sealsCount === 1"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { ISeal } from '@/utils/types/seals'

const { mobile } = useDisplay()

const props = defineProps<{
  seals: ISeal[]
  tileSize: number
}>()

const sealsCount = computed(() => props.seals.length)
const { colsSpanEffective } = useGrid(sealsCount)
</script>
