<template>
  <div>
    <p class="mb-1">{{ t('skillsOwners.order.title') }}:</p>
    <ol class="mb-3">
      <li
        v-for="availabilty in availabilties.SORTED_AV_SCORES"
        :key="availabilty"
        class="d-flex align-center mb-2"
      >
        <div>
          <CompoHeroicGrails
            v-if="availabilty === availabilties.AV_SCORE_HEROIC_GRAILS"
            :size="tileSize"
          />

          <div
            v-if="availabilty === availabilties.AV_SCORE_GENERIC_POOL_3_4"
            class="d-flex align-center"
          >
            <CompoAvailability
              :size="tileSize"
              :rarity="3"
              is-generic-pool
            />
            <CompoAvailability
              :size="tileSize"
              :rarity="4"
              is-generic-pool
            />
          </div>

          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_GENERIC_POOL_45"
            :size="tileSize"
            :rarity="4.5"
            is-generic-pool
          />
          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_GENERIC_POOL_5"
            :size="tileSize"
            :rarity="5"
            is-generic-pool
          />

          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_SPECIAL_POOL_4"
            :size="tileSize"
            :rarity="4"
            is-special-pool
          />
          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_SPECIAL_POOL_45"
            :size="tileSize"
            :rarity="4.5"
            is-special-pool
          />
          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_SPECIAL_POOL_5"
            :size="tileSize"
            :rarity="5"
            is-special-pool
          />

          <CompoAvailability
            v-if="availabilty === availabilties.AV_SCORE_LIMITED_HEROES"
            :size="tileSize"
            :rarity="5"
            is-limited-hero
          />
        </div>

        <div class="ml-4">
          {{ t(`skillsOwners.order.${availabilty}`) }}
        </div>
      </li>
    </ol>
    <p class="mb-1">{{ t('skillsOwners.order.legends.sh') }}</p>
    <p class="mb-1">{{ t('skillsOwners.order.legends.sr') }}</p>
  </div>
</template>

<script setup lang="ts">
import * as availabilties from '@/utils/types/units-availabilities'
const { t } = useI18n()
const tileSize = 30
</script>

<style lang="scss" scoped>
ol {
  list-style: none;
  counter-reset: items;
}

ol li {
  counter-increment: items;
}

ol li:before {
  content: counter(items) '. ';
  margin-left: 12px;
  margin-right: 12px;
}
</style>
