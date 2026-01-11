<template>
  <RecycleScroller
    ref="scroller"
    v-slot="{ item }"
    class="scroller"
    :items="units"
    :item-size="ITEM_HEIGHT"
    key-field="id"
    direction="horizontal"
  >
    <NuxtLink
      href="#"
      @click.prevent="storeGlobals.showUnit(item.id)"
    >
      <CompoUnitThumbnail
        :unit="item"
        :size="size"
        :size-corner="sizeCorner"
      />
    </NuxtLink>
  </RecycleScroller>
</template>

<script setup lang="ts">
import type { IUnit } from '~/utils/types/units'

defineProps<{
  units: IUnit[]
  size: number
  sizeCorner: number
}>()

const storeGlobals = useStoreGlobals()

const ITEM_HEIGHT = 60

const scroller = useTemplateRef('scroller')
const container = computed<HTMLElement | undefined>(() => scroller.value?.$el)
const { scrollbarHeight } = useScroll(container)
const totalHeight = computed(() => ITEM_HEIGHT + scrollbarHeight.value)
const totalHeightPx = computed(() => `${totalHeight.value}px`)
</script>

<style lang="scss" scoped>
.scroller {
  height: v-bind('totalHeightPx');
}
</style>
