<template>
  <AppRenderOnceWhileActive
    :active="storeUnitsAvailabilities.isLoaded"
    class="d-flex"
  >
    <CompoAvailability
      v-if="availability.is_in[GENERIC_SUMMON_POOL]"
      :size="tileSize"
      :rarity="availability.lowest_rarity[GENERIC_SUMMON_POOL]"
      is-generic-pool
    />
    <CompoAvailability
      v-if="availability.is_in[SPECIAL_SUMMON_POOL]"
      :size="tileSize"
      :rarity="availability.lowest_rarity[SPECIAL_SUMMON_POOL]"
      is-special-pool
    />
    <CompoAvailability
      v-if="availability.is_in[FOCUS_ONLY]"
      :size="tileSize"
      :rarity="availability.lowest_rarity[FOCUS_ONLY]"
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

import type { IUnit } from '@/utils/types/units'
import {
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '@/utils/types/obfuscated-keys'

const props = withDefaults(
  defineProps<{
    unit: IUnit
    tileSize: number
    size?: number
    sizeCorner?: number
  }>(),
  { size: 80, sizeCorner: 30 },
)
const { t } = useI18n()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()

const availability = computed(
  () => storeUnitsAvailabilities.availabilitiesById[props.unit.id],
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
