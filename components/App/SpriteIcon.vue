<template>
  <div
    v-if="sprite"
    class="sprite-icon"
    :style="spriteStyle"
    :title="sprite.name"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SpriteFrame {
  name: string
  x: number
  y: number
  width: number
  height: number
  rotated: boolean
}

const props = withDefaults(
  defineProps<{
    sprite: SpriteFrame
    img: string
    scale?: number
  }>(),
  {
    scale: 1,
  },
)

const spriteStyle = computed(() => {
  const { x, y, width, height, rotated } = props.sprite

  /**
   * When 'textureRotated' is true in the .plist, the sprite is rotated
   * 90 degrees clockwise in the sheet. To display it correctly:
   * 1. We swap display width/height.
   * 2. We rotate it back -90 degrees.
   * 3. We use transform-origin to ensure it stays in its box.
   */
  return {
    display: 'inline-block',
    width: `${rotated ? height : width}px`,
    height: `${rotated ? width : height}px`,
    backgroundImage: `url(${props.img})`,
    backgroundPosition: `-${x}px -${y}px`,
    transform: `scale(${props.scale}) ${rotated ? 'rotate(-90deg)' : ''}`,
    transformOrigin: 'center',
    imageRendering: 'crisp-edges' as const,
  }
})
</script>

<style scoped>
.sprite-icon {
  overflow: hidden;
  background-repeat: no-repeat;
}
</style>
