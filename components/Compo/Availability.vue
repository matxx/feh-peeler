<template>
  <v-tooltip :location="tooltipLocation">
    <template #activator="{ props: tooltipProps }">
      <CompoAvailabilityLayout
        v-bind="tooltipProps"
        :disabled="disabled"
        :size="size"
        :rarity="rarity"
      >
        <template #kind>
          <v-img :src="image" />
        </template>
      </CompoAvailabilityLayout>
    </template>

    <span v-if="isGenericPool">
      {{ t('skillsOwners.availability.genericSummonPool') }}
    </span>
    <span v-if="isSpecialPool">
      {{ t('skillsOwners.availability.specialHeroes') }}
    </span>
    <span v-if="isLimitedHero">
      {{ t('skillsOwners.availability.limitedHeroes') }}<br />
      ({{ t('skillsOwners.availability.limitedHeroesList') }})
    </span>
  </v-tooltip>
</template>

<script setup lang="ts">
import type { Anchor } from 'vuetify'

import ImgOrb from '~/assets/icons/fodder/orb.png'
import ImgSpecialHeroes from '~/assets/icons/summoning/Icon_Summoning_Special_Heroes.png'
import ImgFehPass from '~/assets/icons/fodder/fehpass.png'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    size: number
    rarity?: number
    disabled?: boolean
    isGenericPool?: boolean
    isSpecialPool?: boolean
    isLimitedHero?: boolean
    tooltipLocation?: Anchor
  }>(),
  {
    rarity: undefined,
    disabled: false,
    isGenericPool: false,
    isSpecialPool: false,
    isLimitedHero: false,
    tooltipLocation: 'top',
  },
)
const image = computed(() => {
  if (props.isGenericPool) {
    return ImgOrb
  }
  if (props.isSpecialPool) {
    return ImgSpecialHeroes
  }
  if (props.isLimitedHero) {
    return ImgFehPass
  }
  return undefined
})
</script>
