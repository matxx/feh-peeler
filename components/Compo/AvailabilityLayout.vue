<template>
  <v-sheet
    :height="size"
    :width="size"
    class="availability"
    color="transparent"
  >
    <div class="availability__sub">
      <slot name="kind" />
    </div>

    <div class="availability__main">
      <AppIconRarity
        v-if="rarity"
        :rarity="rarity"
        :size="numberToPx(mainSize)"
        :class="{ 'filter-grayscale-1': disabled }"
      />
      <v-img
        v-else
        src="assets/icons/fodder/5stars-off.png"
        class="opacity-50"
      />
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { numberToPx } from '~/utils/functions/numberToPx'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    rarity?: number
    size: number
  }>(),
  {
    disabled: false,
    rarity: undefined,
  },
)

const mainRatio = 3 / 4
const mainSize = computed(() => props.size * mainRatio)
const mainSizePercent = computed(() => `${100 * mainRatio}%`)

const subRatio = 1 / 2
// const subSize = computed(() => props.size * subRatio)
const subSizePercent = computed(() => `${100 * subRatio}%`)
</script>

<style scoped lang="scss">
@use 'assets/styles/mixins';

.availability {
  position: relative;
}
.availability__main {
  @include mixins.pos-abso-center;

  width: v-bind('mainSizePercent');
  height: v-bind('mainSizePercent');

  display: flex;
  justify-content: center;
  align-items: center;
}
.availability__sub {
  z-index: 1;

  position: absolute;
  width: v-bind('subSizePercent');
  height: v-bind('subSizePercent');
  bottom: -5px;
  right: -5px;
}
</style>
