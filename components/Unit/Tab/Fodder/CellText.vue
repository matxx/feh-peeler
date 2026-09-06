<template>
  <span v-if="!hasRefNotFiveStarLocked && !hasRefMultipleSkills">
    {{ number }}
  </span>
  <span
    v-else
    class="position-relative"
  >
    ({{ number }})

    <v-tooltip location="bottom">
      <template #activator="{ props: tooltipProps }">
        <sup class="icon-info">
          <v-icon
            v-bind="tooltipProps"
            color="info"
            size="x-small"
          >
            mdi-information-outline
          </v-icon>
        </sup>
      </template>

      <p v-if="reasons.length === 1">
        {{ t('unitsFodder.notCountedInTotals') }} : {{ reasons[0] }}
      </p>
      <template v-else>
        <p>{{ t('unitsFodder.notCountedInTotals') }} :</p>
        <ul class="pl-3">
          <li
            v-for="reason in reasons"
            :key="reason"
          >
            {{ reason }}
          </li>
        </ul>
      </template>
    </v-tooltip>
  </span>
</template>

<script setup lang="ts">
import compact from 'lodash-es/compact'

const props = defineProps<{
  number: number
  hasRefNotFiveStarLocked: boolean
  hasRefMultipleSkills: boolean
  refNotFiveStarLockedText?: string
  refMultipleSkillsText?: string
}>()

const { t } = useI18n()

const reasons = computed(() =>
  compact([
    props.hasRefNotFiveStarLocked ? props.refNotFiveStarLockedText : undefined,
    props.hasRefMultipleSkills ? props.refMultipleSkillsText : undefined,
  ]),
)
</script>

<style lang="scss" scoped>
.icon-info {
  position: absolute;
  top: 0;
  left: 100%;
}
</style>
