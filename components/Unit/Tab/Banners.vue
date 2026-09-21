<template>
  <v-list
    v-if="occurrencesSorted.length > 0"
    density="compact"
  >
    <v-list-item
      v-for="(occurrence, index) in occurrencesSorted"
      :key="index"
    >
      <v-list-item-title>
        {{ formatDate(occurrence.start_time) }} –
        {{ formatDate(occurrence.end_time) }} :
        <a
          v-if="occurrence.banner.fandom_id"
          :href="lFandom(occurrence.banner.fandom_id)"
          target="_blank"
          class="text-primary"
          >{{ occurrence.banner.name }}</a
        >
        <span v-else>
          {{ occurrence.banner.name }}
        </span>
      </v-list-item-title>
    </v-list-item>
  </v-list>

  <p v-else>
    {{ t('units.show.banners.noBannersAssociated') }}
  </p>
</template>

<script setup lang="ts">
import orderBy from 'lodash-es/orderBy'
import { DateTime } from 'luxon'

import type { IUnit } from '~/utils/types/units'

const props = defineProps<{
  unit: IUnit
}>()

const { t } = useI18n()
const { l: lFandom } = useFandom()
const storeDataBanners = useStoreDataBanners()

const occurrences = computed(
  () => storeDataBanners.bannerOccurrencesByUnitId[props.unit.id] || [],
)
const occurrencesSorted = computed(() =>
  orderBy(occurrences.value, 'start_time'),
)

function formatDate(dateTime: string) {
  return DateTime.fromSQL(dateTime).toFormat('yyyy-LL-dd')
}
</script>
