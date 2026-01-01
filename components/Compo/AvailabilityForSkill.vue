<template>
  <CompoAvailability
    v-if="availability === AV_GENERIC_POOL_34"
    :size="size"
    :rarity="3"
    is-generic-pool
  />
  <CompoHeroicGrails
    v-if="availability === AV_HEROIC_GRAILS"
    :size="size"
  />
  <CompoDivineCodes
    v-if="availability === AV_DIVINE_CODES"
    :size="size"
  />
  <CompoAvailability
    v-if="availability === AV_SPECIAL_POOL_4"
    :size="size"
    :rarity="4"
    is-special-pool
  />
  <CompoAvailability
    v-if="availability === AV_GENERIC_POOL_45"
    :size="size"
    :rarity="4.5"
    is-generic-pool
  />
  <CompoAvailability
    v-if="availability === AV_SPECIAL_POOL_45"
    :size="size"
    :rarity="4.5"
    is-special-pool
  />
</template>

<script setup lang="ts">
import {
  AV_GENERIC_POOL_34,
  AV_HEROIC_GRAILS,
  AV_DIVINE_CODES,
  AV_SPECIAL_POOL_4,
  AV_GENERIC_POOL_45,
  AV_SPECIAL_POOL_45,
} from '~/utils/types/obfuscated-keys'
import type { Availability } from '~/utils/types/skills-availabilities'

defineProps<{
  availability: Availability
  size: number
}>()
</script>
