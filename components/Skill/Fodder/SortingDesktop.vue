<template>
  <v-switch
    v-model="sortedByAvailability"
    density="compact"
    color="primary"
    hide-details
  >
    <template #label>
      {{
        sortedByAvailability
          ? t('skillsFodders.foddersSortByAvailability')
          : t('skillsFodders.foddersSortByName')
      }}
      <v-tooltip location="end">
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-show="sortedByAvailability"
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
const sortedByAvailability = defineModel<boolean>('sortedByAvailability')
const { t } = useI18n()
</script>
