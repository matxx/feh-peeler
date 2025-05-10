<template>
  <div>
    <CompoHeroicGrails
      v-if="availability === AV_HEROIC_GRAILS"
      :size="tileSize"
    />

    <CompoAvailability
      v-if="availability === AV_GENERIC_POOL_3_4"
      :size="tileSize"
      :rarity="4"
      is-generic-pool
    />
    <CompoAvailability
      v-if="availability === AV_GENERIC_POOL_45"
      :size="tileSize"
      :rarity="4.5"
      is-generic-pool
    />
    <CompoAvailability
      v-if="availability === AV_GENERIC_POOL_5"
      :size="tileSize"
      :rarity="5"
      is-generic-pool
    />

    <CompoAvailability
      v-if="availability === AV_SPECIAL_POOL_4"
      :size="tileSize"
      :rarity="4"
      is-special-pool
    />
    <CompoAvailability
      v-if="availability === AV_SPECIAL_POOL_45"
      :size="tileSize"
      :rarity="4.5"
      is-special-pool
    />
    <CompoAvailability
      v-if="availability === AV_SPECIAL_POOL_5"
      :size="tileSize"
      :rarity="5"
      is-special-pool
    />

    <CompoAvailability
      v-if="availability === AV_LIMITED_HEROES"
      :size="tileSize"
      :rarity="5"
      is-limited-hero
    />
  </div>
</template>

<script setup lang="ts">
import {
  AV_HEROIC_GRAILS,
  AV_GENERIC_POOL_3_4,
  AV_GENERIC_POOL_45,
  AV_GENERIC_POOL_5,
  AV_SPECIAL_POOL_4,
  AV_SPECIAL_POOL_45,
  AV_SPECIAL_POOL_5,
  AV_LIMITED_HEROES,
  type Availability,
} from '~/utils/types/units-availabilities'
defineProps<{
  availability: Availability
  tileSize: number
}>()
</script>
