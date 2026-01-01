<template>
  <thead>
    <tr>
      <th
        v-show="!mobile"
        colspan="2"
      />
      <th
        :colspan="colspan"
        :class="{ 'text-center': !mobile }"
      >
        {{ t('unitsFodder.numberOfSlotsRequiredToInherit') }}
      </th>
    </tr>
    <tr>
      <th />
      <th>
        {{ t('unitsFodder.skillName') }}
      </th>
      <th
        v-for="availability in storeFodderSettings.fodderAvailabilities"
        :key="availability"
      >
        <div class="d-flex justify-space-around">
          <CompoAvailabilityForSkill
            :availability="availability"
            :size="size"
          />
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
defineProps<{
  size: number
}>()

const { t } = useI18n()
const { mobile } = useDisplay()

const storeFodderSettings = useStoreFodderSettings()

const colspan = computed(() =>
  mobile.value
    ? storeFodderSettings.fodderAvailabilities.length + 2
    : storeFodderSettings.fodderAvailabilities.length,
)
</script>
