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

      <SealDrawerAll
        v-model:filters="filters"
        :sorters="sorters"
        :show-sorters="showSorters"
        :size-sorters="sizeSorters"
        :size-filters="sizeFilters"
        class="pa-3"
        @update:sorter="storeSealsFilters.updateSorter"
      />
    </v-navigation-drawer>

    <Teleport
      v-if="mobile && storeGlobals.mobileSealFilterElem"
      :to="storeGlobals.mobileSealFilterElem"
    >
      <v-text-field
        v-model="filters.name"
        :loading="storeSealsFilters.isUpdating"
        :color="storeSealsFilters.searchNameIsActive ? 'success' : 'primary'"
        :counter="storeSealsFilters.searchNameCounter"
        density="compact"
        clearable
        :label="t('seals.filters.sealName')"
        :error-messages="storeSealsFilters.searchNameErrorMessages"
      >
        <template #prepend>
          <v-btn
            icon
            size="x-small"
            @click="isDrawerOpen = true"
          >
            <v-icon
              :color="
                storeSealsFilters.anyFilterActiveExceptName
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

const { isLoading } = useDataStores([useStoreDataSeals()])

const sizeSorters = 20
const sizeFilters = 20

const storeSealsFilters = useStoreSealsFilters()
const { filters, sorters } = storeToRefs(storeSealsFilters)

const showSorters = false
// const route = useRoute()
// const getRouteBaseName = useRouteBaseName()
// const showSorters = computed(
//   () => getRouteBaseName(route) !== 'seals',
// )
</script>
