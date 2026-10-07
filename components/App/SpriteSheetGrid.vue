<template>
  <div
    class="wrapper"
    :style="wrapperStyle"
  >
    <div
      ref="sheet"
      class="sheet"
      :style="sheetStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { numberToPx } from '~/utils/functions/numberToPx'
import { SPRITE_SHEET_UNTRIMMED } from '~/utils/constants'

/**
 * Displays a single icon from a sprite sheet frame which is itself a grid of icons.
 *
 * <AppSpriteSheetGrid :sheet-width="36" :sheet-height="4" :x="2" :y="0">
 *   <AppSpriteSheetsStatus frame="Icon_Enhance.png" />
 * </AppSpriteSheetGrid>
 */
const props = defineProps<{
  sheetWidth: number
  sheetHeight: number
  x: number
  y: number

  width?: number
  height?: number
  size?: number
}>()

// frames are trimmed of their transparent margins, which would offset the grid cells
provide(SPRITE_SHEET_UNTRIMMED, true)

const sheet = useTemplateRef('sheet')
// natural (untransformed) size of the slot content
const { width: sheetNaturalWidth, height: sheetNaturalHeight } =
  useElementSize(sheet)

const cellWidth = computed(() => sheetNaturalWidth.value / props.sheetWidth)
const cellHeight = computed(() => sheetNaturalHeight.value / props.sheetHeight)

const resolvedWidth = computed(() => {
  if (props.size) return props.size
  if (props.width) return props.width
  if (props.height && cellHeight.value) {
    return (props.height * cellWidth.value) / cellHeight.value
  }
  return cellWidth.value
})

const resolvedHeight = computed(() => {
  if (props.size) return props.size
  if (props.height) return props.height
  if (props.width && cellWidth.value) {
    return (props.width * cellHeight.value) / cellWidth.value
  }
  return cellHeight.value
})

const isMeasured = computed(() => cellWidth.value > 0 && cellHeight.value > 0)

const wrapperStyle = computed(() =>
  isMeasured.value
    ? {
        width: numberToPx(resolvedWidth.value),
        height: numberToPx(resolvedHeight.value),
      }
    : {
        // fallback size while slot content is not measured yet
        width: numberToPx(props.size ?? props.width ?? props.height ?? 0),
        height: numberToPx(props.size ?? props.height ?? props.width ?? 0),
      },
)

const sheetStyle = computed(() => {
  if (!isMeasured.value) return { visibility: 'hidden' as const }

  const scaleX = resolvedWidth.value / cellWidth.value
  const scaleY = resolvedHeight.value / cellHeight.value
  const offsetX = props.x * resolvedWidth.value
  const offsetY = props.y * resolvedHeight.value

  return {
    transform: `translate(-${numberToPx(offsetX)}, -${numberToPx(offsetY)}) scale(${scaleX}, ${scaleY})`,
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.sheet {
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  transform-origin: top left;
}
</style>
