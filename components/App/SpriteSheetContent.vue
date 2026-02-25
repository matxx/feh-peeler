<template>
  <div
    :style="style"
    :title="sprite.name"
  />
</template>

<script setup lang="ts">
import type { SpriteFrame } from '~/utils/types/spriteSheets'

const props = defineProps<{
  sprite: SpriteFrame
  img: string
  width?: number
  height?: number
}>()

const style = computed(() => {
  const { x, y, width, height, rotated } = props.sprite

  let scale = 1
  if (props.width) {
    scale = props.width / width
  } else if (props.height) {
    scale = props.height / height
  }

  const realWidth = rotated ? height : width
  const realHeight = rotated ? width : height

  /**
   * When 'textureRotated' is true in the .plist, the sprite is rotated
   * 90 degrees clockwise in the sheet. To display it correctly:
   * 1. We swap display width/height.
   * 2. We rotate it back -90 degrees.
   * 3. We use transform-origin to ensure it stays in its box.
   */
  return {
    width: `${realWidth}px`,
    height: `${realHeight}px`,
    backgroundImage: `url(${props.img})`,
    backgroundPosition: `-${x}px -${y}px`,
    backgroundRepeat: 'no-repeat',
    transform: `scale(${scale}) ${rotated ? 'rotate(-90deg)' : ''}`,
    transformOrigin: 'center',
    imageRendering: 'crisp-edges' as const,
  }
})
</script>
