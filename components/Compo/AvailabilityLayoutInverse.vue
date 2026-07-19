<template>
  <v-sheet
    :height="size"
    :width="size"
    class="availability"
    color="transparent"
  >
    <div class="availability__main">
      <slot name="kind" />
    </div>

    <div class="availability__sub">
      <AppIconRarity
        v-if="rarity"
        :rarity="rarity"
        :size="numberToPx(subSize)"
        :class="{ 'filter-grayscale-1': disabled }"
      />
      <v-img
        v-else-if="showRarity"
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
    showRarity?: boolean
  }>(),
  {
    disabled: false,
    rarity: undefined,
    showRarity: false,
  },
)

const mainRatio = 1
// const mainSize = computed(() => props.size * mainRatio)
const mainPercent = computed(() => `${100 * mainRatio}%`)

const subRatio = 1 / 2
const subSize = computed(() => props.size * subRatio)
const subSizePercent = computed(() => `${100 * subRatio}%`)
</script>

<style scoped lang="scss">
@use 'assets/styles/mixins';

.availability {
  position: relative;
}
.availability__main {
  @include mixins.pos-abso-center;

  width: v-bind('mainPercent');
  height: v-bind('mainPercent');

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
