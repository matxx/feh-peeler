<template>
  <div
    :key="`thumbnail-unit-${unit.id}`"
    v-tooltip:top="mobile ? unit.full_name : unit.nameForDisplay"
    class="img-unit d-inline-block position-relative"
  >
    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--top img-unit__icon--left"
    >
      <AppIconWeaponType
        :weapon-type="unit.weapon_type"
        :size="sizeCorner"
      />
    </v-sheet>

    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--top img-unit__icon--right"
    >
      <img
        v-if="unit.is_refresher"
        src="assets/icons/unit_types/dancer.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
    </v-sheet>

    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--bottom img-unit__icon--left"
    >
      <img
        v-if="unit.is_duo"
        src="assets/icons/unit_types/duo.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_harmonized"
        src="assets/icons/unit_types/harmonized.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
    </v-sheet>

    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--bottom img-unit__icon--right"
    >
      <AppIconMoveType
        :move-type="unit.move_type"
        :size="sizeCorner"
        class="img-unit__move"
      />
    </v-sheet>

    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--legend"
    >
      <img
        v-if="unit.image_url_for_icon_legendary"
        :src="unit.image_url_for_icon_legendary"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.image_url_for_icon_chosen"
        :src="unit.image_url_for_icon_chosen"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.image_url_for_icon_mythic"
        :src="unit.image_url_for_icon_mythic"
        :width="sizeCorner"
        :height="sizeCorner"
      />
    </v-sheet>

    <v-sheet
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--asset"
    >
      <img
        v-if="unit.is_aided"
        src="assets/icons/unit_types/aided.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_ascended"
        src="assets/icons/unit_types/ascended.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_attuned"
        src="assets/icons/unit_types/attuned.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_emblem"
        src="assets/icons/unit_types/emblem.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_entwined"
        src="assets/icons/unit_types/entwined.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
      <img
        v-if="unit.is_rearmed"
        src="assets/icons/unit_types/rearmed.png"
        :width="sizeCorner"
        :height="sizeCorner"
      />
    </v-sheet>

    <img
      :src="unit.image_url_for_portrait"
      :width="size"
      :height="size"
      class="d-block"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUnitThumbnail } from '@/utils/types/units.ts'

const { mobile } = useDisplay()

const props = withDefaults(
  defineProps<{
    unit: IUnitThumbnail
    size?: number
    sizeCorner?: number
    margin?: number
    marginIcon?: number
  }>(),
  {
    size: 80,
    sizeCorner: 30,
    margin: 10,
    marginIcon: -5,
  },
)

const marginPx = computed(() => `${props.margin}px`)
const marginIconPx = computed(() => `${props.marginIcon}px`)
const bottomIconAsset = computed(() => props.marginIcon + props.sizeCorner)
const bottomIconAssetPx = computed(() => `${bottomIconAsset.value}px`)
</script>

<style lang="scss" scoped>
.img-unit {
  margin: v-bind('marginPx');
}

.img-unit__icon {
  position: absolute;
  display: flex;
}

.img-unit__icon--top {
  top: v-bind('marginIconPx');
}
.img-unit__icon--bottom {
  bottom: v-bind('marginIconPx');
}
.img-unit__icon--left {
  left: v-bind('marginIconPx');
}
.img-unit__icon--right {
  right: v-bind('marginIconPx');
}

.img-unit__icon--legend {
  top: v-bind('bottomIconAssetPx');
  left: v-bind('marginIconPx');
}
.img-unit__icon--asset {
  bottom: v-bind('bottomIconAssetPx');
  right: v-bind('marginIconPx');
}
</style>
