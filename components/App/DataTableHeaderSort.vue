<template>
  <v-icon
    v-if="column.sortable"
    class="v-data-table-header__sort-icon"
    :icon="getSortIcon(column)"
    size="small"
  />

  <div
    v-if="multiSort && isSorted(column)"
    class="v-data-table-header__sort-badge"
  >
    {{ sortBy.findIndex((item) => item.key === column.key) + 1 }}
  </div>
</template>

<script setup lang="ts">
import type { VDataTableHeaderCellColumnSlotProps } from 'vuetify/lib/components/VDataTable/VDataTableHeaders.js'

withDefaults(
  defineProps<
    Pick<
      VDataTableHeaderCellColumnSlotProps,
      'column' | 'isSorted' | 'getSortIcon' | 'sortBy'
    > & {
      multiSort?: boolean
    }
  >(),
  { multiSort: false },
)
</script>
