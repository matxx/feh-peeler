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
  const scaleX = resolvedWidth.value / region.value.width
  const scaleY = resolvedHeight.value / region.value.height

  // box of the trimmed frame, relative to the displayed area
  const left = (trimLeft - region.value.x) * scaleX
  const top = (trimTop - region.value.y) * scaleY
  const displayedWidth = width * scaleX
  const displayedHeight = height * scaleY

  const background = (sx: number, sy: number) => ({
    backgroundImage: `url(${spriteSheet.value.img})`,
    backgroundSize: `${numberToPx(spriteSheet.value.width * sx)} ${numberToPx(spriteSheet.value.height * sy)}`,
    backgroundPosition: `${numberToPx(-x * sx)} ${numberToPx(-y * sy)}`,
  })

  if (!rotated) {
    return {
      left: numberToPx(left),
      top: numberToPx(top),
      width: numberToPx(displayedWidth),
      height: numberToPx(displayedHeight),
      ...background(scaleX, scaleY),
    }
  }

  /**
   * When 'textureRotated' is true in the .plist, the frame is rotated
   * 90 degrees clockwise in the sheet. To display it correctly, we draw it
   * with swapped width/height (and scales), centered on its box,
   * then rotate it back -90 degrees.
   */
  return {
    left: numberToPx(left + (displayedWidth - displayedHeight) / 2),
    top: numberToPx(top + (displayedHeight - displayedWidth) / 2),
    width: numberToPx(displayedHeight),
    height: numberToPx(displayedWidth),
    ...background(scaleY, scaleX),
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
