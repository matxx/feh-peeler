<template>
  <v-tooltip :location="tooltipLocation">
    <template #activator="{ props: tooltipProps }">
      <CompoAvailabilityLayoutInverse
        v-bind="tooltipProps"
        :disabled="disabled"
        :size="size"
        :rarity="rarity"
        :show-rarity="showRarity"
      >
        <template #kind>
          <template v-if="isGenericPool">
            <AppSpriteSheetsItem
              frame="Icon_Orb_L.png"
              :size="imageSize"
              :class="cssClasses"
            />
          </template>
          <template v-if="isSpecialPool">
            <AppSpriteSheetsSummon_Category
              frame="Icon_Summon_Category_01.png"
              :size="imageSize"
              :class="cssClasses"
            />
          </template>
          <template v-if="isHeroicGrails">
            <AppSpriteSheetsItem
              frame="Icon_HeroHolyGrail_L.png"
              :size="imageSize"
              :class="cssClasses"
            />
          </template>

          <v-img
            v-if="image"
            :src="image"
            :height="imageSize"
            :class="cssClasses"
          />
        </template>
      </CompoAvailabilityLayoutInverse>
    </template>

    <span v-if="isGenericPool">
      {{ t('skillsOwners.availability.genericSummonPool') }}{{ suffixRarity }}
    </span>
    <span v-if="isSpecialPool">
      {{ t('skillsOwners.availability.specialHeroes') }}{{ suffixRarity }}
    </span>
    <span v-if="isLimitedHero">
      {{ t('skillsOwners.availability.limitedHeroes') }}{{ suffixRarity }}<br />
      ({{ t('skillsOwners.availability.limitedHeroesList') }})
    </span>
    <span v-if="isHeroicGrails">
      {{ t('skillsOwners.availability.heroicGrails') }}{{ suffixRarity }}
    </span>
  </v-tooltip>
</template>

<script setup lang="tsx">
import type { Anchor } from 'vuetify'

import ImgFehPass from '~/assets/icons/fehpass.png'

const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    size: number
    disabled?: boolean
    rarity?: number
    showRarity?: boolean
    tooltipLocation?: Anchor
    isGenericPool?: boolean
    isSpecialPool?: boolean
    isLimitedHero?: boolean
    isHeroicGrails?: boolean
  }>(),
  {
    disabled: false,
    rarity: undefined,
    showRarity: true,
    tooltipLocation: 'top',
    isGenericPool: false,
    isSpecialPool: false,
    isLimitedHero: false,
    isHeroicGrails: false,
  },
)
const image = computed(() => {
  if (props.isLimitedHero) {
    return ImgFehPass
  }
  return undefined
})
const imageSize = computed(() => props.size * 0.75)
const cssClasses = computed(() => ({
  'filter-grayscale-1': props.disabled,
  'opacity-50': props.disabled,
}))
const suffixRarity = computed(() => {
  if (props.disabled) return undefined
  if (!props.showRarity) return undefined

  let text
  switch (props.rarity) {
    case 4.5:
      text = props.isSpecialPool ? '4★ SHSR' : '4★ SR'
      break
    default:
      text = `${props.rarity}★`
  }
  return ` (${text})`
})
</script>
