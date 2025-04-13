<template>
  <v-switch
    density="compact"
    color="primary"
    hide-details
    :label="
      storeGlobals.sortedByAvailability
        ? t('skills.show.fodders.sortByAvailability')
        : t('skills.show.fodders.sortByName')
    "
    :model-value="storeGlobals.sortedByAvailability"
    @update:model-value="storeGlobals.setSortedByAvailability(!!$event)"
  >
    <template #label>
      {{
        storeGlobals.sortedByAvailability
          ? t('skills.show.fodders.sortByAvailability')
          : t('skills.show.fodders.sortByName')
      }}
      <v-tooltip
        v-if="!mobile"
        location="end"
      >
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

    <template
      v-if="mobile"
      #append
    >
      <v-icon
        color="info"
        size="x-small"
        @click="isOpen = !isOpen"
      >
        mdi-information-outline
      </v-icon>

      <Teleport to="body">
        <v-navigation-drawer
          v-if="mounted && mobile"
          v-model="isOpen"
          location="bottom"
          class="z-index-above-modal"
        >
          <div class="pa-5 pt-2">
            <SkillFodderSortingListAvailabilities />
          </div>
        </v-navigation-drawer>
      </Teleport>
    </template>
  </v-switch>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { mobile } = useDisplay()
const { mounted } = useMounted()

const storeGlobals = useStoreGlobals()

const isOpen = ref(false)
</script>

<style lang="scss" scoped>
.z-index-above-modal {
  z-index: 10000 !important;
}
</style>
