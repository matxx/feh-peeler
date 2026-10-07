<template>
  <AppSpriteSheet
    v-if="index !== undefined"
    v-tooltip="game"
    sheet="Status"
    frame="Icon_MiniUnit_Head.png"
    :grid="[GAME_ICONS_COUNT, 1]"
    :cell="[index, 0]"
    :size="size"
  />
</template>

<script setup lang="ts">
import { GAME_ICON_INDEXES, GAME_ICONS_COUNT } from '~/utils/types/games'

const props = defineProps<{
  game: string
  size: number
}>()

const index = computed(() => GAME_ICON_INDEXES[props.game])
</script>
