<template>
  <div
    :key="`thumbnail-unit-catalog-${unit.id}`"
    v-tooltip:top="mobile ? unit.full_name : unit.nameForDisplay"
    class="img-unit d-inline-block position-relative"
  >
    <v-sheet
      v-show="showWeapon"
      :height="frameSize / 4"
      :width="frameSize / 4"
      color="transparent"
      class="img-unit__icon img-unit__icon--top img-unit__icon--left z-index-4"
    >
      <AppIconWeaponType
        :weapon-type="unit.weapon_type"
        :size="frameSize / 4"
      />
    </v-sheet>

    <v-sheet
      v-show="showMove"
      :height="frameSize / 4"
      :width="frameSize / 4"
      color="transparent"
      class="img-unit__icon img-unit__icon--bottom img-unit__icon--right z-index-4"
    >
      <AppIconMoveType
        :move-type="unit.move_type"
        :size="frameSize / 4"
        class="img-unit__move"
      />
    </v-sheet>

    <img
      v-show="checked"
      src="assets/icons/check.png"
      :height="frameSize / 4"
      class="img-unit__icon img-unit__icon--bottom-right z-index-4"
    />
    <img
      v-show="crossed"
      src="assets/icons/cross.png"
      :height="frameSize / 4"
      class="img-unit__icon img-unit__icon--bottom-right z-index-4"
    />

    <img
      src="assets/icons/catalog/frame.png"
      :width="frameSize"
      :height="frameSize"
      class="img-unit__icon img-unit__icon--full z-index-3"
    />
    <img
      :src="unit.image_url_for_portrait"
      :width="thumbnailSize"
      :height="thumbnailSize"
      class="img-unit__icon img-unit__icon--thumbnail z-index-2"
      :class="{ 'filter-brightness-0': blackened }"
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
    crossed?: boolean
    blackened?: boolean
    showWeapon?: boolean
    showMove?: boolean
  }>(),
  {
    frameSize: 90,
    thumbnailSize: 80,
    checked: false,
    crossed: false,
    blackened: false,
    showWeapon: false,
    showMove: false,
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
.img-unit__icon--bottom-right {
  top: v-bind('marginPx');
  right: v-bind('marginPx');
}

.img-unit__icon--top {
  top: v-bind('marginPx');
}
.img-unit__icon--bottom {
  bottom: v-bind('marginPx');
}
.img-unit__icon--left {
  left: v-bind('marginPx');
}
.img-unit__icon--right {
  right: v-bind('marginPx');
}

.z-index-4 {
  z-index: 4;
}
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
