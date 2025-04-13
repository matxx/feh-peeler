<template>
  <AppRenderOnceWhileActive
    :active="storeDataSkillsAvailabilities.isLoaded"
    class="d-flex"
  >
    <CompoAvailability
      :size="tileSize"
      :disabled="!availability.is_in[GENERIC_SUMMON_POOL]"
      :rarity="
        availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][GENERIC_SUMMON_POOL]
      "
      is-generic-pool
    />
    <CompoAvailability
      :size="tileSize"
      :disabled="!availability.is_in[SPECIAL_SUMMON_POOL]"
      :rarity="
        availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][SPECIAL_SUMMON_POOL]
      "
      is-special-pool
    />
    <CompoAvailability
      :size="tileSize"
      :disabled="!availability.is_in[FOCUS_ONLY]"
      :rarity="availability[FODDER_LOWEST_RARITY_WHEN_OBTAINED][FOCUS_ONLY]"
      is-limited-hero
    />

    <CompoHeroicGrails
      :disabled="!availability.is_in[HEROIC_GRAILS]"
      :size="tileSize"
    />

    <CompoDivineCodes
      :size="tileSize"
      :number="divineCodesNormalLowestNumber"
      :disabled="isNormalDivineCodeDisabled"
    >
      <template #tooltip:append>
        <div
          v-for="(desc, index) in availability.divine_codes.normal"
          :key="index"
        >
          {{ t('skillsFodders.availability.part') }} {{ desc.number }} -
          {{ desc.title }} - {{ desc.cost }}
        </div>
      </template>
    </CompoDivineCodes>

    <CompoDivineCodes
      ephemera
      :size="tileSize"
      :disabled="isLimitedDivineCodeDisabled"
    >
      <template #tooltip:append>
        <div
          v-for="date in divineCodesLimited"
          :key="date"
        >
          {{ date }}
        </div>
      </template>
    </CompoDivineCodes>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import uniq from 'lodash-es/uniq'
import minBy from 'lodash-es/minBy'
import sortBy from 'lodash-es/sortBy'
import padStart from 'lodash-es/padStart'

import type { ISkill } from '@/utils/types/skills'
import {
  FODDER_LOWEST_RARITY_WHEN_OBTAINED,
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'

const { t } = useI18n()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const props = defineProps<{
  skill: ISkill
  tileSize: number
}>()

const availability = computed(
  () => storeDataSkillsAvailabilities.availabilitiesById[props.skill.id],
)

const isNormalDivineCodeDisabled = computed(
  () => !availability.value.is_in[NORMAL_DIVINE_CODES],
)

const divineCodesNormalLowestNumber = computed(
  () =>
    availability.value.divine_codes.normal &&
    minBy(availability.value.divine_codes.normal, 'number')?.number,
)

const isLimitedDivineCodeDisabled = computed(
  () => !availability.value.is_in[LIMITED_DIVINE_CODES],
)
const divineCodesLimited = computed(() =>
  availability.value.divine_codes.limited
    ? sortBy(
        uniq(
          availability.value.divine_codes.limited.map(
            (x) => `${x.year}-${padStart(String(x.month), 2, '0')}`,
          ),
        ),
      )
    : [],
)
</script>

<style scoped>
.chevron {
  color: inherit;
  transition: transform 0.2s ease-in-out;
}
.chevron--opened {
  transform: rotate(90deg);
}
</style>
