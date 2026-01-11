<template>
  <LayoutDefault>
    <v-navigation-drawer
      v-if="mounted"
      v-model="isDrawerOpen"
      :location="mobile ? 'bottom' : 'left'"
      :permanent="!mobile"
      :width="drawerWidth"
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

      <SkillDrawerAll
        ref="content"
        v-model:filters="filters"
        :sorters="sorters"
        :show-sorters="showSorters"
        :size-sorters="sizeSorters"
        :size-filters="sizeFilters"
        class="pa-3"
        @update:sorter="storeSkillsFilters.updateSorter"
      />
    </v-navigation-drawer>

    <Teleport
      v-if="mobile && storeGlobals.mobileSkillFilterElem"
      :to="storeGlobals.mobileSkillFilterElem"
    >
      <v-text-field
        v-model="filters.name"
        :loading="storeSkillsFilters.isUpdating"
        :color="storeSkillsFilters.searchNameIsActive ? 'success' : 'primary'"
        :counter="storeSkillsFilters.searchNameCounter"
        density="compact"
        clearable
        :label="t('skills.filters.skillName')"
        :error-messages="storeSkillsFilters.searchNameErrorMessages"
      >
        <template #prepend>
          <v-btn
            icon
            size="x-small"
            @click="isDrawerOpen = true"
          >
            <v-icon
              :color="
                storeSkillsFilters.anyFilterActiveExceptName
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
  useStoreDataSkills(),
  useStoreDataSkillsAvailabilities(),
])

const DEFAULT_DRAWER_WIDTH = 275

const sizeSorters = 20
const sizeFilters = 20

const storeSkillsFilters = useStoreSkillsFilters()
const { filters, sorters } = storeToRefs(storeSkillsFilters)

const showSorters = false
// const route = useRoute()
// const getRouteBaseName = useRouteBaseName()
// const showSorters = computed(
//   () => getRouteBaseName(route) !== 'skills',
// )

const content = useTemplateRef('content')
const container = computed<HTMLElement | undefined>(
  () => content.value?.$el.parentElement,
)
const { scrollbarWidth } = useScroll(container)
const drawerWidth = computed(() => DEFAULT_DRAWER_WIDTH + scrollbarWidth.value)
</script>
