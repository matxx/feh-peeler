<template>
  <div>
    <div
      v-if="showSorters"
      class="mb-3"
    >
      <h5 class="mb-3">
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
      <h5 class="mb-3">
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
import type { IFilters } from '@/utils/types/units-filters'
import type { ISorters } from '@/utils/types/units-sorters'

const filters = defineModel<IFilters>('filters')
withDefaults(
  defineProps<{
    sorters: ISorters
    sizeFilters: number
    sizeSorters: number
    filterNameLoading: boolean
    filterNameErrorMessages: string[]
    showSorters?: boolean
  }>(),
  {
    showSorters: false,
  },
)
defineEmits(['update:sorters'])

const { t } = useI18n()
</script>
