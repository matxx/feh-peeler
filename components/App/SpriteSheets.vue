<template>
  <div
    v-if="sprite"
    class="wrapper"
    :style="style"
  >
    <AppSpriteIcon
      :sprite="sprite"
      :width="resolvedWidth"
      :height="resolvedHeight"
      :img="img"
    />
  </div>
</template>

<script setup lang="ts">
import type { SpriteFrame } from '~/utils/types/spriteSheets'

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

const resolvedWidth = computed(() => {
  if (props.size) return props.size
  if (props.width) return props.width
  if (props.height && sprite.value) {
    const ratio = sprite.value.width / sprite.value.height
    return props.height * ratio
  }
  return sprite.value?.width
})

const resolvedHeight = computed(() => {
  if (props.size) return props.size
  if (props.height) return props.height
  if (props.width && sprite.value) {
    const ratio = sprite.value.height / sprite.value.width
    return props.width * ratio
  }
  return sprite.value?.height
})

const style = computed(() => ({
  width: `${resolvedWidth.value}px`,
  height: `${resolvedHeight.value}px`,
}))
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
