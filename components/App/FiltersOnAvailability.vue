<template>
  <div
    v-for="(array, index) in a.AVAILABILITIES_FOR_FILTERS"
    :key="index"
  >
    <v-btn-group
      divided
      color="primary"
      density="compact"
      variant="outlined"
    >
      <v-btn
        v-for="availability in array"
        :key="availability"
        size="small"
        class="text-primary"
        :active="availabilities.has(availability)"
        @click="$emit('toggle-availability', availability)"
      >
        <CompoAvailability
          v-if="availability === a.AV_GENERIC_POOL_3_4"
          :size="size"
          :rarity="3"
          is-generic-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_GENERIC_POOL_45"
          :size="size"
          :rarity="4.5"
          is-generic-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_GENERIC_POOL_5"
          :size="size"
          :rarity="5"
          is-generic-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_SPECIAL_POOL_4"
          :size="size"
          :rarity="4"
          is-special-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_SPECIAL_POOL_45"
          :size="size"
          :rarity="4.5"
          is-special-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_SPECIAL_POOL_5"
          :size="size"
          :rarity="5"
          is-special-pool
        />
        <CompoAvailability
          v-if="availability === a.AV_LIMITED_HEROES"
          :size="size"
          :rarity="5"
          is-limited-hero
        />
        <CompoHeroicGrails
          v-if="availability === a.AV_HEROIC_GRAILS"
          :size="size"
        />
        <!-- <CompoDivineCodes
          v-if="availability === a.AV_NORMAL_DIVINE_CODES"
          :size="size"
        /> -->
      </v-btn>
    </v-btn-group>
  </div>
</template>

<script setup lang="ts">
import * as a from '~/utils/types/units-availabilities'
import type { Availability } from '~/utils/types/units-availabilities'
defineProps<{
  availabilities: Set<Availability>
  size: number
}>()
defineEmits<{
  'toggle-availability': [availability: Availability]
}>()
</script>
