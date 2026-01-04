<template>
  <div>
    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('seals.show.tier') }}:</h4>
      <div>
        {{ seal.tier }}
      </div>
    </div>

    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('seals.show.sp') }}:</h4>
      <div>
        {{ seal.sp }}
      </div>
    </div>

    <div class="mb-2 d-flex align-center">
      <h4 class="mr-3">{{ t('seals.show.canUse') }}:</h4>
      <SealRestrictions
        :seal="seal"
        :size="size"
      />
    </div>

    <div>
      <h4 class="mt-5 mb-2">{{ t('seals.show.effect') }}</h4>
      <SealDescription :seal="seal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISeal } from '~/utils/types/seals'

const size = 30

const { t } = useI18n()

defineEmits(['close'])
withDefaults(
  defineProps<{
    seal: ISeal
    showClose?: boolean
  }>(),
  {
    showClose: false,
  },
)
</script>
