<template>
  <div class="dc-img-container">
    <div class="dc-img-scaller">
      <AppSprite
        :spritesheet="imageUrl"
        spritesheet-width="2008px"
        spritesheet-height="976px"
        :rotation="-90"
        :width="PAPER_WIDTH"
        :height="PAPER_HEIGHT"
        :offset-left="ephemera ? EPHEMERA_OFFSET_LEFT : NORMAL_OFFSET_LEFT"
        :offset-top="ephemera ? EPHEMERA_OFFSET_TOP : NORMAL_OFFSET_TOP"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const imageUrl = new URL(
  '../../../../assets/sprite-sheets/Item_2.png',
  import.meta.url,
).href

const PAPER_HEIGHT = 300
const PAPER_WIDTH = 270

// TODO: get values from ingame plists
const NORMAL_OFFSET_LEFT = 1135
const NORMAL_OFFSET_TOP = 603
const EPHEMERA_OFFSET_LEFT = 1135
const EPHEMERA_OFFSET_TOP = 305

const props = defineProps({
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
  ephemera: {
    type: Boolean,
    default: false,
  },
})

const widthAsNumber = computed<number | null>(() => {
  if (typeof props.width === 'number') {
    return props.width
  }
  if (typeof props.width === 'string') {
    const m = props.width.match(/^(\d+)px/i)
    if (m) {
      return Number(m[1])
    }
  }
  return null
})
const heightAsNumber = computed<number | null>(() => {
  if (typeof props.height === 'number') {
    return props.height
  }
  if (typeof props.height === 'string') {
    const m = props.height.match(/^(\d+)px/i)
    if (m) {
      return Number(m[1])
    }
  }
  if (widthAsNumber.value) {
    return (widthAsNumber.value * PAPER_HEIGHT) / PAPER_WIDTH
  }

  return null
})
const computedWidth = computed<number>(() => {
  if (widthAsNumber.value) {
    return widthAsNumber.value
  }
  if (heightAsNumber.value) {
    return (heightAsNumber.value * PAPER_WIDTH) / PAPER_HEIGHT
  }
  return 0
})
const computedHeight = computed<number>(() => {
  if (heightAsNumber.value) {
    return heightAsNumber.value
  }
  if (widthAsNumber.value) {
    return (widthAsNumber.value * PAPER_HEIGHT) / PAPER_WIDTH
  }
  return 0
})

const widthForCss = computed(() => `${computedWidth.value}px`)
const heightForCss = computed(() => `${computedHeight.value}px`)

const scaleForCss = computed(
  () => `scale(${computedWidth.value / PAPER_WIDTH})`,
)
</script>

<style scoped lang="scss">
.dc-img-container {
  position: relative;
  width: v-bind('widthForCss');
  height: v-bind('heightForCss');
  overflow: hidden;
  display: inline-block;

  .dc-img-scaller {
    position: relative;
    transform-origin: top left;
    transform: v-bind('scaleForCss');
  }
}
</style>
