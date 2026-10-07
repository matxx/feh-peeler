<template>
  <AppSpriteSheet
    v-if="iconIndex !== undefined"
    v-tooltip="GAME_ICON_TITLES[iconIndex]"
    sheet="Status"
    frame="Icon_MiniUnit_Head.png"
    :grid="[GAME_ICONS_COUNT, 1]"
    :cell="[iconIndex, 0]"
    :size="size"
  />
</template>

<script setup lang="ts">
import {
  GAME_ICON_INDEXES,
  GAME_ICONS_COUNT,
  GAME_ICON_TITLES,
} from '~/utils/types/games'

// either the name of a game, or directly the index of its icon
const props = defineProps<{
  game?: string
  index?: number
  size: number
}>()

const iconIndex = computed(() =>
  props.index !== undefined
    ? props.index
    : props.game
      ? GAME_ICON_INDEXES[props.game]
      : undefined,
)
</script>
