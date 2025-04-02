<template>
  <v-sheet
    :height="size"
    :width="size"
    class="availability"
    color="transparent"
  >
    <div class="availability__kind">
      <slot name="kind" />
    </div>

    <div class="availability__rarity">
      <AppIconRarity
        v-if="rarity"
        :rarity="rarity"
        :size="`${starSize}px`"
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
const ratio = 3 / 4
const starSize = computed(() => props.size * ratio)
const starSizePercent = computed(() => `${100 * ratio}%`)
</script>

<style scoped lang="scss">
@use 'assets/styles/mixins';

.availability {
  position: relative;
}
.availability__rarity {
  @include mixins.pos-abso-center;

  width: v-bind('starSizePercent');
  height: v-bind('starSizePercent');
}
.availability__kind {
  z-index: 1;

  position: absolute;
  width: 50%;
  height: 50%;
  bottom: -5px;
  right: -5px;
}
</style>
