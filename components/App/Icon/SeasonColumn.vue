<template>
  <div class="seasons-mythic">
    <AppIconSeason
      v-bind="props"
      :element="elementTop"
      class="season-mythic season-mythic--top"
      :width="width"
    />

    <AppIconSeason
      v-bind="props"
      :element="elementBottom"
      class="season-mythic season-mythic--bottom"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
import type { ElementMythicOrChaos } from '~/utils/types/elements'
import { numberToPx } from '~/utils/functions/numberToPx'

const WIDTH_DEFAULT = 30

const props = withDefaults(
  defineProps<{
    elementTop?: ElementMythicOrChaos
    elementBottom?: ElementMythicOrChaos
    // size?: number
    // height?: number
    width?: number
  }>(),
  {
    elementTop: undefined,
    elementBottom: undefined,
    width: WIDTH_DEFAULT,
  },
)

// const computedWidth = computed(() => props.width ?? props.size)
// const computedHeight = computed(() => props.height ?? props.size)

const totalWidth = computed(() => 1.5 * props.width)
const totalWidthPx = computed(() => numberToPx(totalWidth.value))
</script>

<style lang="scss" scoped>
.seasons-mythic {
  position: relative;
  width: v-bind('totalWidthPx');
  flex: 0 0 v-bind('totalWidth');
  height: 40px;
}
.season-mythic {
  position: absolute;
}
.season-mythic--top {
  top: 2px;
  left: 9px;
}
.season-mythic--bottom {
  top: 18px;
  left: 0;
}
</style>
