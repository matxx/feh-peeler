<template>
  <div class="position-relative">
    <v-overlay
      contained
      :model-value="storeDataUnitsAvailabilities.isLoading"
      class="d-flex justify-space-around align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-overlay>

    <div class="mb-3">
      <h5>
        {{ t('scores.headers.sort') }}
      </h5>
      <div>
        <UnitScoresSorters
          :sorters="sorters"
          :size="sizeSorters"
          @update="$emit('update:sorters', $event)"
        />
      </div>
    </div>

    <div class="mb-3">
      <h5>
        {{ t('scores.headers.filters') }}
      </h5>
      <div>
        <UnitScoresFilters
          v-model:filters="filters"
          :size="sizeFilters"
          :filter-name-loading="filterNameLoading"
          :filter-name-error-messages="filterNameErrorMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFilters, ISorters } from '@/utils/types/scores'

const filters = defineModel<IFilters>('filters')
defineProps<{
  sorters: ISorters
  sizeFilters: number
  sizeSorters: number
  filterNameLoading: boolean
  filterNameErrorMessages: string[]
}>()
defineEmits(['update:sorters'])

const { t } = useI18n()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
</script>
