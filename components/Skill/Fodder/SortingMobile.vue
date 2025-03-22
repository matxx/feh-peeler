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
const sortedByAvailability = defineModel<boolean>('sortedByAvailability')

const { t } = useI18n()
const { mobile } = useDisplay()
const { mounted } = useMounted()

const isOpen = ref(false)

const icon = computed(() =>
  sortedByAvailability.value
    ? 'mdi-sort-bool-ascending-variant'
    : 'mdi-sort-alphabetical-ascending',
)
</script>
