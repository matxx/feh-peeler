<template>
  <LayoutDefault>
    <v-navigation-drawer
      v-if="mounted"
      v-model="isDrawerOpen"
      :location="mobile ? 'bottom' : 'left'"
      :permanent="!mobile"
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

      <UnitDrawerAll
        v-model:filters="filters"
        :sorters="sorters"
        :show-sorters="showSorters"
        :size-sorters="sizeSorters"
        :size-filters="sizeFilters"
        class="pa-3"
        @update:sorter="storeUnitsFilters.updateSorter"
      />
    </v-navigation-drawer>

    <Teleport
      v-if="mobile && storeGlobals.mobileUnitFilterElem"
      :to="storeGlobals.mobileUnitFilterElem"
    >
      <v-text-field
        v-model="filters.name"
        :loading="storeUnitsFilters.isUpdating"
        :color="storeUnitsFilters.searchNameIsActive ? 'success' : 'primary'"
        :counter="storeUnitsFilters.searchNameCounter"
        density="compact"
        clearable
        :label="t('scores.labels.unitName')"
        :error-messages="storeUnitsFilters.searchNameErrorMessages"
      >
        <template #prepend>
          <v-btn
            icon
            size="x-small"
            @click="isDrawerOpen = true"
          >
            <v-icon
              :color="
                storeUnitsFilters.anyFilterActiveExceptName
                  ? 'primary'
                  : undefined
              "
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

const storeGlobals = useStoreGlobals()

const { isLoading } = useDataStores([
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataUnitsStats(),
  useStoreDataSkills(),
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
