<template>
  <LayoutDefault>
    <v-container fluid>
      <v-row>
        <v-col
          :cols="mobile ? 12 : 3"
          class="position-relative"
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

          <div v-show="mobile">
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
                <UnitScoresSettingsMobile
                  :active="storeUnitsFilters.anyFilterActive"
                >
                  <template #drawer>
                    <div class="pa-5 pt-2">
                      <UnitScoresSettings
                        v-model:filters="filters"
                        v-model:sorters="sorters"
                        :size-sorters="sizeSorters"
                        :size-filters="sizeFilters"
                        :filter-name-loading="storeUnitsFilters.isUpdating"
                        :filter-name-error-messages="
                          storeUnitsFilters.errorMessages
                        "
                        @update:sorters="storeUnitsFilters.updateSorters"
                      />
                    </div>
                  </template>
                </UnitScoresSettingsMobile>
              </template>
            </v-text-field>
          </div>

          <UnitScoresSettings
            v-show="!mobile"
            v-model:filters="filters"
            v-model:sorters="sorters"
            :size-sorters="sizeSorters"
            :size-filters="sizeFilters"
            :filter-name-loading="storeUnitsFilters.isUpdating"
            :filter-name-error-messages="storeUnitsFilters.errorMessages"
            @update:sorters="storeUnitsFilters.updateSorters"
          />
        </v-col>

        <v-col
          :cols="mobile ? 12 : 9"
          class="position-relative"
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

          <slot />
        </v-col>
      </v-row>
    </v-container>
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from '~/layouts/default.vue'

const { t } = useI18n()
const { mobile } = useDisplay()

const { isLoading } = useDataStores([
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataUnitsStats(),
])

const sizeSorters = 20
const sizeFilters = 20

const storeUnitsFilters = useStoreUnitsFilters()
const { filters, sorters } = storeToRefs(storeUnitsFilters)
</script>
