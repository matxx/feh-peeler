<template>
  <thead>
    <tr>
      <th
        v-show="!mobile"
        colspan="2"
        class="border-b-lg"
      />
      <th
        :colspan="colspan"
        class="border-b-lg"
        :class="{ 'text-center': !mobile }"
      >
        {{ t('unitsFodder.numberOfSlotsRequiredToInherit') }}
      </th>
    </tr>
    <tr>
      <th class="border-b-lg" />
      <th class="border-b-lg">
        {{ t('unitsFodder.skillName') }}
      </th>
      <th
        v-for="availability in storeFodderSettings.fodderAvailabilities"
        :key="availability"
        class="border-b-lg"
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
