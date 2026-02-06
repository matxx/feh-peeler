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

    <v-btn
      v-show="removable"
      icon="mdi-delete"
      :height="frameSize / 4"
      :width="frameSize / 4"
      position="absolute"
      size="x-small"
      class="img-unit__icon--bottom img-unit__icon--left z-index-4"
      @click.stop="$emit('remove')"
    />

    <img
      v-show="checked"
      src="assets/icons/check.png"
      :height="frameSize / 4"
      class="img-unit__icon img-unit__icon--top img-unit__icon--right z-index-4"
    />
    <img
      v-show="crossed"
      src="assets/icons/cross.png"
      :height="frameSize / 4"
      class="img-unit__icon img-unit__icon--top img-unit__icon--right z-index-4"
    />

    <img
      :src="imgFrame"
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
      :src="imgPane"
      :width="frameSize"
      :height="frameSize"
      class="d-block z-index-1"
    />
  </div>
</template>

<script setup lang="ts">
import ImgFrame from '~/assets/icons/catalog/frame.png'
import ImgFrame1 from '~/assets/icons/catalog/Frame_1.png'
import ImgFrame2 from '~/assets/icons/catalog/Frame_2.png'
import ImgFrame3 from '~/assets/icons/catalog/Frame_3.png'
import ImgFrame4 from '~/assets/icons/catalog/Frame_4.png'
import ImgFrame5 from '~/assets/icons/catalog/Frame_5.png'

import ImgPane from '~/assets/icons/catalog/pane.png'
import ImgPane1 from '~/assets/icons/catalog/Pane_1.png'
import ImgPane2 from '~/assets/icons/catalog/Pane_2.png'
import ImgPane3 from '~/assets/icons/catalog/Pane_3.png'
import ImgPane4 from '~/assets/icons/catalog/Pane_4.png'
import ImgPane5 from '~/assets/icons/catalog/Pane_5.png'

import type { IUnitThumbnail } from '@/utils/types/units.ts'

const { mobile } = useDisplay()

defineEmits(['remove'])
const props = withDefaults(
  defineProps<{
    unit: IUnitThumbnail
    rarity?: number
    frameSize?: number
    thumbnailSize?: number
    checked?: boolean
    crossed?: boolean
    blackened?: boolean
    showWeapon?: boolean
    showMove?: boolean
    removable?: boolean
  }>(),
  {
    rarity: undefined,
    frameSize: 90,
    thumbnailSize: 80,
    checked: false,
    crossed: false,
    blackened: false,
    showWeapon: false,
    showMove: false,
    removable: false,
  },
)

const imgFrame = computed(() => {
  if (!props.rarity) return ImgFrame

  switch (props.rarity) {
    case 1:
      return ImgFrame1
    case 2:
      return ImgFrame2
    case 3:
      return ImgFrame3
    case 4:
      return ImgFrame4
    case 5:
      return ImgFrame5
    default:
      return ImgFrame
  }
})

const imgPane = computed(() => {
  if (!props.rarity) return ImgPane

  switch (props.rarity) {
    case 1:
      return ImgPane1
    case 2:
      return ImgPane2
    case 3:
      return ImgPane3
    case 4:
      return ImgPane4
    case 5:
      return ImgPane5
    default:
      return ImgPane
  }
})

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
