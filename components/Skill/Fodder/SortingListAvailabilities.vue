<template>
  <div>
    <p class="mb-1">{{ t('skillsFodders.order.title') }}:</p>
    <ol class="pl-5">
      <li
        v-for="availabilty in SORTED_AV_SCORES"
        :key="availabilty"
        class="pl-2"
      >
        {{ t(`skillsFodders.order.${availabilty}`) }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { SORTED_AV_SCORES } from '@/utils/types/units-availabilities'
const { t } = useI18n()
</script>
