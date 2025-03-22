<template>
  <AppRenderOnceWhileActive :active="storeSkillsAvailabilities.isLoaded">
    <div class="d-flex align-center my-1">
      <SkillImg
        v-show="withIcon"
        v-tooltip="skill.name"
        :skill="skill"
        :size="skillIconSize"
        class="mr-5"
      />

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

      <v-btn
        class="ml-3"
        variant="text"
        @click="isOpen = !isOpen"
      >
        <v-icon
          left
          class="chevron"
          :class="{ 'chevron--opened': isOpen }"
        >
          mdi-chevron-right
        </v-icon>
        {{ t('global.details') }}
      </v-btn>
    </div>

    <AppRenderOnceWhileActive :active="isOpen">
      <v-table>
        <tbody>
          <SkillFodderAvailabilitiesUnit
            v-for="fodder in sortedFodders"
            :key="fodder.id"
            :unit="fodder"
            :tile-size="tileSize"
          />
        </tbody>
      </v-table>
    </AppRenderOnceWhileActive>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import uniq from 'lodash-es/uniq'
import minBy from 'lodash-es/minBy'
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'
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
const storeUnits = useStoreUnits()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()
const storeSkillsAvailabilities = useStoreSkillsAvailabilities()

const props = withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    skillIconSize: number
    sortedByAvailability: boolean
    withIcon?: boolean
  }>(),
  { withIcon: false },
)

const isOpen = ref(false)
const availability = computed(
  () => storeSkillsAvailabilities.availabilitiesById[props.skill.id],
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

const fodders = computed(() =>
  compact(availability.value.fodder_ids.map((id) => storeUnits.unitsById[id])),
)
const sortedFodders = computed(() =>
  sortBy(fodders.value, [
    (unit) =>
      props.sortedByAvailability
        ? storeUnitsAvailabilities.availabiltySortingVector(unit)
        : 0,
    'sortableName',
  ]),
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
