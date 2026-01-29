<template>
  <AppRenderOnceWhileActive
    v-if="skill.category !== SKILL_PASSIVE_S"
    :active="storeDataSkillsAvailabilities.isLoaded"
    class="d-flex"
  >
    <template v-if="availability">
      <CompoAvailability
        :size="tileSize"
        :disabled="!availability.is_in[GENERIC_SUMMON_POOL]"
        :rarity="
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED] &&
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED]![GENERIC_SUMMON_POOL]
        "
        is-generic-pool
      />
      <CompoAvailability
        v-if="availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED]"
        :size="tileSize"
        :disabled="!availability.is_in[SPECIAL_SUMMON_POOL]"
        :rarity="
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED] &&
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED]![SPECIAL_SUMMON_POOL]
        "
        is-special-pool
      />
      <CompoAvailability
        v-if="availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED]"
        :size="tileSize"
        :disabled="!availability.is_in[FOCUS_ONLY]"
        :rarity="
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED] &&
          availability[OWNER_LOWEST_RARITY_WHEN_OBTAINED]![FOCUS_ONLY]
        "
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
        <template
          v-if="availability.divine_codes"
          #tooltip:append
        >
          <div
            v-for="(desc, index) in availability.divine_codes.normal"
            :key="index"
          >
            {{ t('skillsOwners.availability.part') }} {{ desc.number }} -
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
    </template>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import uniq from 'lodash-es/uniq'
import minBy from 'lodash-es/minBy'
import sortBy from 'lodash-es/sortBy'
import padStart from 'lodash-es/padStart'

import { SKILL_PASSIVE_S, type ISkill } from '~/utils/types/skills'
import {
  OWNER_LOWEST_RARITY_WHEN_OBTAINED,
  GENERIC_SUMMON_POOL,
  SPECIAL_SUMMON_POOL,
  HEROIC_GRAILS,
  NORMAL_DIVINE_CODES,
  LIMITED_DIVINE_CODES,
  FOCUS_ONLY,
} from '~/utils/types/obfuscated-keys'
import type { ISkillAvailability } from '~/utils/types/skills-availabilities'

const { t } = useI18n()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const props = defineProps<{
  skill: ISkill
  tileSize: number
}>()

const availability = computed<ISkillAvailability | undefined>(
  () => storeDataSkillsAvailabilities.availabilitiesById[props.skill.baseId],
)

const isNormalDivineCodeDisabled = computed(
  () => !availability.value || !availability.value.is_in[NORMAL_DIVINE_CODES],
)

const divineCodesNormalLowestNumber = computed(
  () =>
    availability.value &&
    availability.value.divine_codes &&
    availability.value.divine_codes.normal &&
    minBy(availability.value.divine_codes.normal, 'number')?.number,
)

const isLimitedDivineCodeDisabled = computed(
  () => !availability.value || !availability.value.is_in[LIMITED_DIVINE_CODES],
)
const divineCodesLimited = computed(() =>
  availability.value &&
  availability.value.divine_codes &&
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
