<template>
  <div class="dc-details">
    <div class="dc-details__number">
      <AppIconDivineCodesNumber
        v-if="number"
        :number="number"
        :width="computedWidth / 3"
        :ephemera="ephemera"
        class="d-flex"
      />
    </div>
    <div class="dc-details__paper">
      <AppIconDivineCodesPaper
        :height="(computedHeight * 3) / 4"
        :ephemera="ephemera"
        class="d-flex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
  number: {
    type: Number,
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

  return null
})
const computedWidth = computed<number>(() => {
  if (widthAsNumber.value) {
    return widthAsNumber.value
  }
  return 0
})
const computedHeight = computed<number>(() => {
  if (heightAsNumber.value) {
    return heightAsNumber.value
  }
  return 0
})

const widthForCss = computed(() => `${computedWidth.value}px`)
const heightForCss = computed(() => `${computedHeight.value}px`)
</script>

<style scoped lang="scss">
@use 'assets/styles/mixins';

.dc-details {
  position: relative;
  width: v-bind('widthForCss');
  height: v-bind('heightForCss');
}
.dc-details__number {
  z-index: 2;
  position: absolute;
  right: 10%;
  bottom: 10%;
}
.dc-details__paper {
  z-index: 1;
  @include mixins.pos-abso-center;
}
</style>
