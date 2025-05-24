<template>
  <LayoutDefault>
    <v-navigation-drawer
      v-if="mounted"
      v-model="isDrawerOpen"
      :location="mobile ? 'bottom' : 'left'"
      :permanent="!mobile"
      class="pa-3"
      width="275"
    >
      <v-overlay
        contained
        :model-value="isLoading"
        class="d-flex justify-space-around align-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-overlay>

      <UnitScoresSettings
        v-model:filters="filters"
        v-model:sorters="sorters"
        :show-sorters="showSorters"
        :size-sorters="sizeSorters"
        :size-filters="sizeFilters"
        :filter-name-loading="storeUnitsFilters.isUpdating"
        :filter-name-error-messages="storeUnitsFilters.errorMessages"
        @update:sorters="storeUnitsFilters.updateSorters"
      />
    </v-navigation-drawer>

    <Teleport
      v-if="mobile"
      to="#mobile-units-filter-name"
    >
      <v-text-field
        v-model="filters.name"
        :loading="storeUnitsFilters.isUpdating"
        :color="storeUnitsFilters.searchIsActive ? 'success' : 'primary'"
        :counter="storeUnitsFilters.counter"
        density="compact"
        clearable
        class="mt-5"
        :label="t('scores.labels.unitName')"
        :error-messages="storeUnitsFilters.errorMessages"
      >
        <template #prepend>
          <v-btn
            icon
            size="x-small"
            @click="isDrawerOpen = true"
          >
            <v-icon
              :color="storeUnitsFilters.anyFilterActive ? 'primary' : undefined"
            >
              mdi-filter
            </v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </Teleport>

    <div class="fill-height position-relative pa-3">
      <v-overlay
        contained
        :model-value="isLoading"
        class="d-flex justify-space-around align-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-overlay>

      <slot />
    </div>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '~/layouts/default.vue'

const { t } = useI18n()
const { mobile } = useDisplay()
const { mounted } = useMounted()

const isDrawerOpen = ref(false)

watch(
  mobile,
  (val) => {
    if (val) return

    isDrawerOpen.value = true
  },
  { immediate: true },
)

const { isLoading } = useDataStores([
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataUnitsStats(),
])

const sizeSorters = 20
const sizeFilters = 20

const storeUnitsFilters = useStoreUnitsFilters()
const { filters, sorters } = storeToRefs(storeUnitsFilters)

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const showSorters = computed(
  () => getRouteBaseName(route) === 'units-maximum-scores',
)
</script>
