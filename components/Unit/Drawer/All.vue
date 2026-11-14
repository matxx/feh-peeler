<template>
  <div>
    <div class="position-relative">
      <v-btn
        v-tooltip="t('units.filters.resetFilters')"
        flat
        position="absolute"
        location="top end"
        icon="mdi-restart"
        size="x-small"
        @click="storeUnitsFilters.resetFilters"
      />
    </div>

    <div
      v-if="showGroupBy"
      class="mb-3"
    >
      <h3 class="mb-3">
        {{ t('scores.headers.groupBy') }}
      </h3>
      <div>
        <v-select
          v-model="storeUnitsFilters.groupBy"
          :items="itemsForGroupBy"
          density="compact"
          hide-details
          :label="t('scores.headers.groupByLabel')"
        />
      </div>
      <div
        v-if="isDateGroupByField(storeUnitsFilters.groupBy)"
        class="mt-3 d-flex align-center"
      >
        <span class="mr-2">
          {{ t('units.groupBy.datePeriodsLabel') }}
        </span>
        <v-btn-toggle
          v-model="storeUnitsFilters.groupByDatePeriod"
          mandatory
          divided
          variant="outlined"
          density="compact"
          color="primary"
        >
          <v-btn
            v-for="period in DATE_PERIODS"
            :key="period"
            :value="period"
            size="small"
          >
            {{ t(`units.groupBy.datePeriods.${period}`) }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <div
      v-if="showSorters"
      class="mb-3"
    >
      <h3 class="mb-3">
        {{ t('scores.headers.sort') }}
      </h3>
      <div>
        <UnitDrawerSorters
          :sorters="sorters"
          :size="sizeSorters"
          @update="$emit('update:sorter', $event)"
        />
      </div>
    </div>

    <div class="mb-3">
      <h3 class="mb-3">
        {{ t('scores.headers.filters') }}
      </h3>
      <div>
        <UnitDrawerFilters
          v-model:filters="filters"
          :size="sizeFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFilters } from '~/utils/types/units-filters'
import type { ISorters } from '~/utils/types/units-sorters'
import {
  DATE_PERIODS,
  GROUP_BY_FIELDS,
  isDateGroupByField,
} from '~/utils/types/units-group-by'

const filters = defineModel<IFilters>('filters')
withDefaults(
  defineProps<{
    sorters: ISorters
    sizeFilters: number
    sizeSorters: number
    showSorters?: boolean
    showGroupBy?: boolean
  }>(),
  {
    showSorters: false,
    showGroupBy: false,
  },
)
defineEmits(['update:sorter'])

const { t } = useI18n()
const storeUnitsFilters = useStoreUnitsFilters()

const itemsForGroupBy = computed(() =>
  GROUP_BY_FIELDS.map((field) => ({
    value: field,
    title: t(`units.groupBy.fields.${field}`),
  })),
)
</script>
