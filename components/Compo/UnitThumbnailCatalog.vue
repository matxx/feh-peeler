<template>
  <div
    :key="`thumbnail-unit-catalog-${unit.id}`"
    class="img-unit d-inline-block position-relative"
  >
    <!-- <img
      v-show="checked"
      src="assets/icons/check.png"
      :height="frameSize / 4"
      class="img-unit__icon img-unit__icon--bottom-right z-index-4"
    /> -->

    <img
      src="assets/icons/catalog/frame.png"
      :width="frameSize"
      :height="frameSize"
      class="img-unit__icon img-unit__icon--full z-index-3"
    />
    <img
      v-tooltip:top="mobile ? unit.full_name : unit.nameForDisplay"
      :src="unit.image_url_for_portrait"
      :width="thumbnailSize"
      :height="thumbnailSize"
      class="img-unit__icon img-unit__icon--thumbnail z-index-2"
      :class="{ 'filter-brightness-0': !checked }"
    />
    <img
      src="assets/icons/catalog/pane.png"
      :width="frameSize"
      :height="frameSize"
      class="d-block z-index-1"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUnitThumbnail } from '@/utils/types/units.ts'

const { mobile } = useDisplay()

const props = withDefaults(
  defineProps<{
    unit: IUnitThumbnail
    frameSize?: number
    thumbnailSize?: number
    checked?: boolean
  }>(),
  {
    frameSize: 90,
    thumbnailSize: 80,
    checked: false,
  },
)

const marginPx = computed(
  () => `${Math.floor((props.frameSize - props.thumbnailSize) / 2)}px`,
)
</script>

<style lang="scss" scoped>
.img-unit__icon {
  position: absolute;
  display: flex;
}
.img-unit__icon--thumbnail {
  top: v-bind('marginPx');
  left: v-bind('marginPx');
}
.img-unit__icon--full {
  top: 0;
  left: 0;
}
// .img-unit__icon--bottom-right {
//   bottom: v-bind('marginPx');
//   right: v-bind('marginPx');
// }

// .z-index-4 {
//   z-index: 4;
// }
.z-index-3 {
  z-index: 3;
}
.z-index-2 {
  z-index: 2;
}
.z-index-1 {
  z-index: 1;
}
</style>
