<template>
  <thead>
    <tr>
      <th colspan="2" />
      <th
        :colspan="AVAILABILITIES.length"
        class="text-center"
      >
        {{ t('unitsFodder.numberOfSlotsRequiredToInherit') }}
      </th>
    </tr>
    <tr>
      <th />
      <th>
        {{ t('unitsFodder.skillName') }}
      </th>
      <th
        v-for="availability in AVAILABILITIES"
        :key="availability"
      >
        <div class="d-flex justify-space-around">
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
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { AVAILABILITIES } from '~/utils/types/skills-availabilities'
import {
  AV_GENERIC_POOL_34,
  AV_HEROIC_GRAILS,
  AV_DIVINE_CODES,
  AV_SPECIAL_POOL_4,
  AV_GENERIC_POOL_45,
  AV_SPECIAL_POOL_45,
} from '~/utils/types/obfuscated-keys'

defineProps<{
  size: number
}>()

const { t } = useI18n()
</script>
