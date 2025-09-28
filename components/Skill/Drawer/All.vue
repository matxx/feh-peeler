<template>
  <div>
    <div class="position-relative">
      <v-btn
        v-tooltip="t('skills.filters.resetFilters')"
        flat
        position="absolute"
        location="top end"
        icon="mdi-restart"
        size="x-small"
        @click="storeSkillsFilters.resetFilters"
      />
    </div>

    <!-- <div
      v-if="showSorters"
      class="mb-3"
    >
      <h3 class="mb-3">
        {{ t('scores.headers.sort') }}
      </h3>
      <div>
        <SkillDrawerSorters
          :sorters="sorters"
          :size="sizeSorters"
          @update="$emit('update:sorter', $event)"
        />
      </div>
    </div> -->

    <div class="mb-3">
      <h3 class="mb-3">
        {{ t('scores.headers.filters') }}
      </h3>
      <div>
        <SkillDrawerFilters
          v-model:filters="filters"
          :size="sizeFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFilters } from '~/utils/types/skills-filters'
import type { ISorters } from '~/utils/types/skills-sorters'

const filters = defineModel<IFilters>('filters')
withDefaults(
  defineProps<{
    sorters: ISorters
    sizeFilters: number
    sizeSorters: number
    showSorters?: boolean
  }>(),
  {
    showSorters: false,
  },
)
defineEmits(['update:sorter'])

const { t } = useI18n()
const storeSkillsFilters = useStoreSkillsFilters()
</script>
