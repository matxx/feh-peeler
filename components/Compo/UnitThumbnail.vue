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
      class="img-unit__icon img-unit__icon--legend d-flex justify-center align-center"
    >
      <img
        v-if="unit.image_url_for_icon_legendary"
        :src="unit.image_url_for_icon_legendary"
        width="auto"
        :height="sizeCorner"
      />
      <img
        v-else-if="unit.image_url_for_icon_chosen"
        :src="unit.image_url_for_icon_chosen"
        width="auto"
        :height="sizeCorner"
      />
      <img
        v-else-if="unit.image_url_for_icon_mythic"
        :src="unit.image_url_for_icon_mythic"
        width="auto"
        :height="sizeCorner"
      />
      <AppIconElement
        v-else-if="blessing"
        :element="blessing"
        :height="sizeCorner"
      />
    </v-sheet>

    <v-sheet
      v-if="chosenHeroElement"
      :height="sizeCorner"
      :width="sizeCorner"
      color="transparent"
      class="img-unit__icon img-unit__icon--legend-bis d-flex justify-center align-center"
    >
      <AppIconElementChosen
        v-if="chosenHeroElement"
        :element="chosenHeroElement"
        :height="sizeCornerSmall"
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
import type { Element } from '~/utils/types/units-filters'

const { mobile } = useDisplay()

const props = withDefaults(
  defineProps<{
    unit: IUnitThumbnail
    blessing?: Element | null
    chosenHeroElement?: Element
    chosenHeroMerges?: number
    size?: number
    sizeCorner?: number
    margin?: number
    marginIcon?: number
  }>(),
  {
    blessing: undefined,
    chosenHeroElement: undefined,
    chosenHeroMerges: undefined,
    size: 80,
    sizeCorner: 30,
    margin: 10,
    marginIcon: -5,
  },
)

const sizeCornerSmall = computed(() => props.sizeCorner * 0.8)

const marginPx = computed(() => `${props.margin}px`)
const offsetForIconLine1Px = computed(() => `${props.marginIcon}px`)

const offsetForIconLine2 = computed(() => props.marginIcon + props.sizeCorner)
const offsetForIconLine2Px = computed(() => `${offsetForIconLine2.value}px`)

const offsetForIconRow2 = computed(
  () => props.marginIcon + props.sizeCorner / 2,
)
const offsetForIconRow2Px = computed(() => `${offsetForIconRow2.value}px`)
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
  top: v-bind('offsetForIconLine1Px');
}
.img-unit__icon--bottom {
  bottom: v-bind('offsetForIconLine1Px');
}
.img-unit__icon--left {
  left: v-bind('offsetForIconLine1Px');
}
.img-unit__icon--right {
  right: v-bind('offsetForIconLine1Px');
}

.img-unit__icon--legend {
  top: v-bind('offsetForIconLine2Px');
  left: v-bind('offsetForIconLine1Px');
}
.img-unit__icon--legend-bis {
  top: v-bind('offsetForIconLine2Px');
  left: v-bind('offsetForIconRow2Px');
}

.img-unit__icon--asset {
  bottom: v-bind('offsetForIconLine2Px');
  right: v-bind('offsetForIconLine1Px');
}
</style>
