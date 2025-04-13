<template>
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
      <v-tooltip location="end">
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-show="storeGlobals.sortedByAvailability"
            v-bind="tooltipProps"
            color="info"
            size="x-small"
            class="mb-2"
          >
            mdi-information-outline
          </v-icon>
        </template>

        <SkillFodderSortingListAvailabilities />
      </v-tooltip>
    </template>
  </v-switch>
</template>

<script setup lang="ts">
const storeGlobals = useStoreGlobals()
const { t } = useI18n()
</script>
