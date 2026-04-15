<template>
  <div>
    <!-- <CompoHeroicGrails
      v-if="availability === U_AV_HEROIC_GRAILS"
      :size="tileSize"
    /> -->
    <CompoHeroicGrails
      v-if="availability === U_AV_HEROIC_GRAILS_4"
      :size="tileSize"
      :rarity="4"
    />
    <CompoHeroicGrails
      v-if="availability === U_AV_HEROIC_GRAILS_5"
      :size="tileSize"
      :rarity="5"
    />

    <CompoAvailability
      v-if="availability === U_AV_GENERIC_POOL_3_4"
      :size="tileSize"
      :rarity="4"
      is-generic-pool
    />
    <CompoAvailability
      v-if="availability === U_AV_GENERIC_POOL_45"
      :size="tileSize"
      :rarity="4.5"
      is-generic-pool
    />
    <CompoAvailability
      v-if="availability === U_AV_GENERIC_POOL_5"
      :size="tileSize"
      :rarity="5"
      is-generic-pool
    />

    <CompoAvailability
      v-if="availability === U_AV_SPECIAL_POOL_4"
      :size="tileSize"
      :rarity="4"
      is-special-pool
    />
    <CompoAvailability
      v-if="availability === U_AV_SPECIAL_POOL_45"
      :size="tileSize"
      :rarity="4.5"
      is-special-pool
    />
    <CompoAvailability
      v-if="availability === U_AV_SPECIAL_POOL_5"
      :size="tileSize"
      :rarity="5"
      is-special-pool
    />

    <CompoAvailability
      v-if="availability === U_AV_LIMITED_HEROES"
      :size="tileSize"
      :rarity="5"
      is-limited-hero
    />
  </div>
</template>

<script setup lang="ts">
import {
  // U_AV_HEROIC_GRAILS,
  U_AV_HEROIC_GRAILS_4,
  U_AV_HEROIC_GRAILS_5,
  U_AV_GENERIC_POOL_3_4,
  U_AV_GENERIC_POOL_45,
  U_AV_GENERIC_POOL_5,
  U_AV_SPECIAL_POOL_4,
  U_AV_SPECIAL_POOL_45,
  U_AV_SPECIAL_POOL_5,
  U_AV_LIMITED_HEROES,
  type Availability,
} from '~/utils/types/units-availabilities'
defineProps<{
  availability: Availability
  tileSize: number
}>()
</script>
