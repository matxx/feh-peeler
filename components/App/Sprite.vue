<template>
  <div class="sprite" />
</template>

<script setup lang="ts">
const props = defineProps({
  spritesheet: {
    type: String,
    required: true,
  },
  spritesheetWidth: {
    type: String,
    required: true,
  },
  spritesheetHeight: {
    type: String,
    required: true,
  },

  offsetTop: {
    type: Number,
    required: true,
  },
  offsetLeft: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  rotation: {
    type: Number,
    default: 0,
  },
})

const cssWidth = computed(() => `${props.width}px`)
const cssHeight = computed(() => `${props.height}px`)
const cssRotation = computed(() => `rotate(${props.rotation}deg)`)
const cssBackground = computed(() => `url(${props.spritesheet}) 0 0`)

const left = computed(() => -props.offsetLeft)
const top = computed(() => -props.offsetTop)
const leftPx = computed(() => `${left.value}px`)
const topPx = computed(() => `${top.value}px`)
</script>

<style scoped lang="scss">
.sprite {
  position: relative;
  width: v-bind('cssWidth');
  height: v-bind('cssHeight');
  overflow: hidden;
  display: inline-block;

  &:before {
    content: '';
    width: v-bind('props.spritesheetWidth');
    height: v-bind('props.spritesheetHeight');
    position: absolute;
    top: v-bind('topPx');
    left: v-bind('leftPx');
    // z-index: -1;
    transform: v-bind('cssRotation');
    background: v-bind('cssBackground');
  }
}
</style>
