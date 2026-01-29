<template>
  <AppRenderOnceWhileActive :active="storeDataSkillsAvailabilities.isLoaded">
    <RecycleScroller
      v-slot="{ item }"
      class="scroller"
      :items="sortedOwners"
      :item-size="tileSize"
      key-field="id"
      direction="horizontal"
    >
      <NuxtLink
        href="#"
        @click.prevent="storeGlobals.showUnit(item.id)"
      >
        <CompoUnitThumbnail
          :unit="item"
          :size="tileSize - 10"
          :size-corner="tileSize / 3"
          :margin="5"
        />
      </NuxtLink>
    </RecycleScroller>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

import type { ISkill } from '@/utils/types/skills'

const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const props = withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    hideSorting?: boolean
  }>(),
  {
    hideSorting: false,
  },
)

const availability = computed(
  () => storeDataSkillsAvailabilities.availabilitiesById[props.skill.baseId],
)
const owners = computed(() =>
  compact(
    (availability.value.owner_ids || []).map(
      (id) => storeDataUnits.unitsById[id],
    ),
  ),
)
const sortedOwners = computed(() =>
  sortBy(owners.value, [
    (unit) =>
      storeGlobals.sortedByAvailability
        ? storeDataUnitsAvailabilities.availabilitySortingValue(unit)
        : 0,
    'nameForSorting',
  ]),
)

const tileSizePx = computed(() => `${props.tileSize}px`)
const maxWidthPx = computed(() => `${props.tileSize * 4.5}px`)
</script>

<style lang="scss" scoped>
.scroller {
  height: v-bind('tileSizePx');
  max-width: v-bind('maxWidthPx');
}
</style>
