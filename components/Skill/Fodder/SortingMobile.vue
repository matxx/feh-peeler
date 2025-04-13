<template>
  <div>
    <v-btn
      icon
      size="x-small"
      @click="isOpen = !isOpen"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-if="mounted && mobile"
      v-model="isOpen"
      location="bottom"
    >
      <div class="pa-5 pt-2">
        <div class="mb-5">
          <v-switch
            density="compact"
            color="primary"
            hide-details
            :model-value="storeGlobals.sortedByAvailability"
            @update:model-value="storeGlobals.setSortedByAvailability(!!$event)"
          >
            <template #label>
              {{
                storeGlobals.sortedByAvailability
                  ? t('skills.show.fodders.sortByAvailability')
                  : t('skills.show.fodders.sortByName')
              }}
            </template>
          </v-switch>
        </div>
        <div>
          <SkillFodderSortingListAvailabilities />
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { mobile } = useDisplay()
const { mounted } = useMounted()
const storeGlobals = useStoreGlobals()

const isOpen = ref(false)

const icon = computed(() =>
  storeGlobals.sortedByAvailability
    ? 'mdi-sort-bool-ascending-variant'
    : 'mdi-sort-alphabetical-ascending',
)
</script>
