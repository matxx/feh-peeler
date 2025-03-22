<template>
  <div>
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

const { t } = useI18n()

const filters = defineModel<IFilters>('filters')
defineProps<{
  sorters: ISorters
  sizeFilters: number
  sizeSorters: number
  filterNameLoading: boolean
  filterNameErrorMessages: string[]
}>()
defineEmits(['update:sorters'])
</script>
