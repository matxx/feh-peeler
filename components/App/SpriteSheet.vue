<template>
  <div
    v-if="sprite"
    class="wrapper"
    :style="style"
  >
    <div :style="contentWrapperStyle">
      <AppSpriteSheetContent
        :sprite="sprite"
        :width="contentWidth"
        :height="contentHeight"
        :img="img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SpriteFrame } from '~/utils/types/spriteSheets'
import { numberToPx } from '~/utils/functions/numberToPx'
import { SPRITE_SHEET_UNTRIMMED } from '~/utils/constants'

const props = defineProps<{
  spriteSheet: SpriteFrame[]
  img: string

  name: string
  width?: number
  height?: number
  size?: number
}>()

const sprite = computed(() => {
  return props.spriteSheet.find((f) => f.name === props.name)
})

const untrimmed = inject(SPRITE_SHEET_UNTRIMMED, false)

const frameWidth = computed(() =>
  untrimmed ? sprite.value?.sourceWidth : sprite.value?.width,
)
const frameHeight = computed(() =>
  untrimmed ? sprite.value?.sourceHeight : sprite.value?.height,
)

const resolvedWidth = computed(() => {
  if (props.size) return props.size
  if (props.width) return props.width
  if (props.height && frameWidth.value && frameHeight.value) {
    const ratio = frameWidth.value / frameHeight.value
    return props.height * ratio
  }
  return frameWidth.value
})

const resolvedHeight = computed(() => {
  if (props.size) return props.size
  if (props.height) return props.height
  if (props.width && frameWidth.value && frameHeight.value) {
    const ratio = frameHeight.value / frameWidth.value
    return props.width * ratio
  }
  return frameHeight.value
})

const scaleX = computed(() =>
  resolvedWidth.value && frameWidth.value
    ? resolvedWidth.value / frameWidth.value
    : 1,
)
const scaleY = computed(() =>
  resolvedHeight.value && frameHeight.value
    ? resolvedHeight.value / frameHeight.value
    : 1,
)

const contentWidth = computed(() =>
  sprite.value ? sprite.value.width * scaleX.value : undefined,
)
const contentHeight = computed(() =>
  sprite.value ? sprite.value.height * scaleY.value : undefined,
)

// places the trimmed frame where it was in the untrimmed one
const contentWrapperStyle = computed(() => {
  if (!untrimmed || !sprite.value) return {}

  return {
    position: 'absolute' as const,
    left: numberToPx(sprite.value.trimLeft * scaleX.value),
    top: numberToPx(sprite.value.trimTop * scaleY.value),
    width: numberToPx(contentWidth.value ?? 0),
    height: numberToPx(contentHeight.value ?? 0),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const style = computed(() =>
  resolvedWidth.value && resolvedHeight.value
    ? {
        width: numberToPx(resolvedWidth.value),
        height: numberToPx(resolvedHeight.value),
      }
    : {},
)
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
