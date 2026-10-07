<template>
  <div
    v-if="sprite"
    class="wrapper"
    :style="wrapperStyle"
  >
    <div :style="spriteStyle" />
  </div>
</template>

<script setup lang="ts">
import { SPRITE_SHEETS } from '~/assets/sprite-sheets'
import type { SpriteFrame, SpriteSheetName } from '~/utils/types/spriteSheets'
import { numberToPx } from '~/utils/functions/numberToPx'

/**
 * Displays a frame of a sprite sheet, or a single cell of a frame which is itself a grid of icons.
 *
 * <AppSpriteSheet sheet="Status" frame="Icon_Enhance.png" />
 * <AppSpriteSheet sheet="Status" frame="Icon_Enhance.png" :grid="[36, 4]" :cell="[2, 1]" />
 */
const props = defineProps<{
  sheet: SpriteSheetName
  frame: string
  // number of columns and rows when the frame is a grid of icons
  grid?: [number, number]
  // column and row (from top left) of the displayed cell of the grid
  cell?: [number, number]
  // displays only the visible part of the frame, without its transparent margins
  trimmed?: boolean

  width?: number
  height?: number
  size?: number
}>()

const spriteSheet = computed(() => SPRITE_SHEETS[props.sheet])
const sprite = computed<SpriteFrame | undefined>(() =>
  spriteSheet.value.frames.find((f) => f.name === props.frame),
)

// displayed area, in the untrimmed frame coordinates
const region = computed(() => {
  if (!sprite.value) return { x: 0, y: 0, width: 0, height: 0 }

  const { sourceWidth, sourceHeight } = sprite.value
  if (props.trimmed) {
    const { trimLeft, trimTop, width, height } = sprite.value
    return { x: trimLeft, y: trimTop, width, height }
  }
  if (!props.grid) {
    return { x: 0, y: 0, width: sourceWidth, height: sourceHeight }
  }

  const [columns, rows] = props.grid
  const [column, row] = props.cell ?? [0, 0]
  const width = sourceWidth / columns
  const height = sourceHeight / rows
  return { x: column * width, y: row * height, width, height }
})

const resolvedWidth = computed(() => {
  const { width, height } = region.value
  if (props.size) return props.size
  if (props.width) return props.width
  if (props.height) return (props.height * width) / height
  return width
})

const resolvedHeight = computed(() => {
  const { width, height } = region.value
  if (props.size) return props.size
  if (props.height) return props.height
  if (props.width) return (props.width * height) / width
  return height
})

const wrapperStyle = computed(() => ({
  width: numberToPx(resolvedWidth.value),
  height: numberToPx(resolvedHeight.value),
}))

const spriteStyle = computed(() => {
  if (!sprite.value) return {}

  const { x, y, width, height, rotated, trimLeft, trimTop } = sprite.value
  // the displayed area keeps its ratio and is centered in the wrapper
  const scale = Math.min(
    resolvedWidth.value / region.value.width,
    resolvedHeight.value / region.value.height,
  )
  const offsetX = (resolvedWidth.value - region.value.width * scale) / 2
  const offsetY = (resolvedHeight.value - region.value.height * scale) / 2

  // box of the trimmed frame, relative to the wrapper
  const left = offsetX + (trimLeft - region.value.x) * scale
  const top = offsetY + (trimTop - region.value.y) * scale
  const displayedWidth = width * scale
  const displayedHeight = height * scale

  const background = {
    backgroundImage: `url(${spriteSheet.value.img})`,
    backgroundSize: `${numberToPx(spriteSheet.value.width * scale)} ${numberToPx(spriteSheet.value.height * scale)}`,
    backgroundPosition: `${numberToPx(-x * scale)} ${numberToPx(-y * scale)}`,
  }

  if (!rotated) {
    return {
      left: numberToPx(left),
      top: numberToPx(top),
      width: numberToPx(displayedWidth),
      height: numberToPx(displayedHeight),
      ...background,
    }
  }

  /**
   * When 'textureRotated' is true in the .plist, the frame is rotated
   * 90 degrees clockwise in the sheet. To display it correctly, we draw it
   * with swapped width/height, centered on its box,
   * then rotate it back -90 degrees.
   */
  return {
    left: numberToPx(left + (displayedWidth - displayedHeight) / 2),
    top: numberToPx(top + (displayedHeight - displayedWidth) / 2),
    width: numberToPx(displayedHeight),
    height: numberToPx(displayedWidth),
    ...background,
    transform: 'rotate(-90deg)',
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  > div {
    position: absolute;
    background-repeat: no-repeat;
    image-rendering: crisp-edges;
  }
}
</style>
