<!-- examples: -->
<!-- https://www.arcticsilverfox.com/unit_chart/ -->
<!-- https://kannadb.up.railway.app/feh/heroes/ -->
<!-- TODO: games / book / genders / blessings -->
<template>
  <div v-if="filters">
    <div v-show="!mobile">
      <v-text-field
        v-model="filters.name"
        :loading="filterNameLoading"
        :color="searchIsActive ? 'success' : 'primary'"
        :counter="counter"
        density="compact"
        clearable
        :label="t('scores.labels.unitName')"
        :error-messages="filterNameErrorMessages"
      />
    </div>

    <div class="mt-1">
      <AppFiltersOnAvailability
        :size="SIZE"
        :availabilities="filters.availabilities"
        @toggle-availability="toggleAvailability"
      />
    </div>

    <div class="mt-1">
      <div>
        <v-btn-group
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_REARMED)"
            @click="toggleTrait(UnitsFilters.TRAIT_REARMED)"
          >
            <img
              src="assets/icons/unit_types/rearmed.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_ATTUNED)"
            @click="toggleTrait(UnitsFilters.TRAIT_ATTUNED)"
          >
            <img
              src="assets/icons/unit_types/attuned.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_ASCENDED)"
            @click="toggleTrait(UnitsFilters.TRAIT_ASCENDED)"
          >
            <img
              src="assets/icons/unit_types/ascended.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_EMBLEM)"
            @click="toggleTrait(UnitsFilters.TRAIT_EMBLEM)"
          >
            <img
              src="assets/icons/unit_types/emblem.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_AIDED)"
            @click="toggleTrait(UnitsFilters.TRAIT_AIDED)"
          >
            <img
              src="assets/icons/unit_types/aided.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-group>
      </div>

      <div>
        <v-btn-group
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_DUO)"
            @click="toggleTrait(UnitsFilters.TRAIT_DUO)"
          >
            <img
              src="assets/icons/unit_types/duo.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_HARMONIZED)"
            @click="toggleTrait(UnitsFilters.TRAIT_HARMONIZED)"
          >
            <img
              src="assets/icons/unit_types/harmonized.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-group>

        <v-btn-group
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_LEGENDARY)"
            @click="toggleTrait(UnitsFilters.TRAIT_LEGENDARY)"
          >
            <img
              src="assets/icons/unit_types/legendary.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.traits.has(UnitsFilters.TRAIT_MYTHIC)"
            @click="toggleTrait(UnitsFilters.TRAIT_MYTHIC)"
          >
            <img
              src="assets/icons/unit_types/mythic.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-group>
      </div>
    </div>

    <div class="mt-1">
      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          size="small"
          class="text-primary"
          :active="filters.isRefresher !== null"
          @click="cycleFilter('isRefresher')"
        >
          <v-icon start>
            {{ iconFor(filters.isRefresher) }}
          </v-icon>
          <img
            src="assets/icons/unit_types/dancer.png"
            :width="size"
            :height="size"
          />
        </v-btn>
      </v-btn-group>

      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
        class="ml-1"
      >
        <v-btn
          size="small"
          class="text-primary"
          :active="filters.hasResplendent !== null"
          @click="cycleFilter('hasResplendent')"
        >
          <v-icon start>
            {{ iconFor(filters.hasResplendent) }}
          </v-icon>
          <img
            src="assets/icons/resplendent.png"
            :width="size"
            :height="size"
          />
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          v-tooltip:bottom="t('units.filters.tooltips.isTT')"
          size="small"
          class="text-primary"
          :active="filters.isTT !== null"
          @click="cycleFilter('isTT')"
        >
          <v-icon start>
            {{ iconFor(filters.isTT) }}
          </v-icon>
          {{ t('units.filters.buttons.isTT') }}
        </v-btn>
      </v-btn-group>

      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
        class="ml-1"
      >
        <v-btn
          v-tooltip:bottom="t('units.filters.tooltips.isGHB')"
          size="small"
          class="text-primary"
          :active="filters.isGHB !== null"
          @click="cycleFilter('isGHB')"
        >
          <v-icon start>
            {{ iconFor(filters.isGHB) }}
          </v-icon>
          {{ t('units.filters.buttons.isGHB') }}
        </v-btn>
      </v-btn-group>

      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
        class="ml-1"
      >
        <v-btn
          size="small"
          class="text-primary"
          :active="filters.isBrave !== null"
          @click="cycleFilter('isBrave')"
        >
          <v-icon start>
            {{ iconFor(filters.isBrave) }}
          </v-icon>
          CYL
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          size="small"
          class="text-primary"
          :active="filters.isFallen !== null"
          @click="cycleFilter('isFallen')"
        >
          <v-icon start>
            {{ iconFor(filters.isFallen) }}
          </v-icon>
          Fallen
        </v-btn>
      </v-btn-group>

      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
        class="ml-1"
      >
        <v-btn
          size="small"
          class="text-primary"
          :active="filters.isStory !== null"
          @click="cycleFilter('isStory')"
        >
          <v-icon start>
            {{ iconFor(filters.isStory) }}
          </v-icon>
          Askr Trio
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          v-tooltip:bottom="t('units.filters.tooltips.hasPrfWeapon')"
          size="small"
          class="text-primary"
          :active="filters.hasPrfWeapon !== null"
          @click="cycleFilter('hasPrfWeapon')"
        >
          <v-icon start>
            {{ iconFor(filters.hasPrfWeapon) }}
          </v-icon>
          PRF
          <img
            src="assets/icons/skills/weapon.png"
            :width="size"
            :height="size"
            class="ml-2"
          />
        </v-btn>
      </v-btn-group>

      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
        class="ml-1"
      >
        <v-btn
          v-tooltip:bottom="t('units.filters.tooltips.hasPrfSkill')"
          size="small"
          class="text-primary"
          :active="filters.hasPrfSkill !== null"
          @click="cycleFilter('hasPrfSkill')"
        >
          <v-icon start>
            {{ iconFor(filters.hasPrfSkill) }}
          </v-icon>
          PRF
          <span class="ml-2 crossed text-white">
            <img
              src="assets/icons/skills/weapon.png"
              :width="size"
              :height="size"
            />
          </span>
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <v-btn-group
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          v-for="moveType in SORTED_MOVE_TYPES"
          :key="moveType"
          size="small"
          class="text-primary"
          :active="filters.moves.has(moveType)"
          @click="toggleMove(moveType)"
        >
          <AppIconMoveType
            :move-type="moveType"
            :size="size"
          />
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <div class="d-flex">
        <v-btn-group
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            @click="filters.weapons = new Set()"
          >
            <v-icon>mdi-restart</v-icon>
          </v-btn>
        </v-btn-group>
        <v-btn-group
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="weaponType in SORTED_WEAPON_COLORS"
            :key="weaponType"
            size="small"
            class="text-primary"
            :active="isWeaponAggregateActive[weaponType]"
            @click="toggleWeaponColor(weaponType)"
          >
            <AppIconWeaponType
              :weapon-type="weaponType"
              :size="size"
            />
          </v-btn>
        </v-btn-group>
      </div>
      <div
        v-for="(line, index) in SORTED_WEAPONS_MATRIX_FOR_UNITS_FILTERS"
        :key="index"
      >
        <v-btn-group
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            class="text-primary"
            :active="isWeaponAggregateActive[SORTED_WEAPON_FAMILY_TYPES[index]]"
            @click="toggleWeaponFamily(SORTED_WEAPON_FAMILY_TYPES[index])"
          >
            <AppIconWeaponType
              :weapon-type="SORTED_WEAPON_FAMILY_TYPES[index]"
              :size="size"
            />
          </v-btn>
        </v-btn-group>
        <v-btn-group
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="weaponType in line"
            :key="weaponType"
            size="small"
            class="text-primary"
            :active="filters.weapons.has(weaponType)"
            @click="toggleWeapon(weaponType)"
          >
            <AppIconWeaponType
              :weapon-type="weaponType"
              :size="size"
            />
          </v-btn>
        </v-btn-group>
        <v-btn-group
          v-if="index === 0"
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            size="small"
            class="text-primary"
            :active="filters.weapons.has(WEAPON_C_ST)"
            @click="toggleWeapon(WEAPON_C_ST)"
          >
            <AppIconWeaponType
              :weapon-type="WEAPON_C_ST"
              :size="size"
            />
          </v-btn>
        </v-btn-group>
      </div>
    </div>

    <div class="mt-1">
      <h4>
        {{ t('units.filters.headers.stats') }}
      </h4>
      <div
        v-for="stat in STATS_AND_BST"
        :key="stat"
        class="d-flex align-center"
      >
        <div class="width-stat-headers">
          {{ t(`units.filters.stats.${stat}`) }}
        </div>
        <v-range-slider
          v-model="filters.stats[stat]"
          :max="
            storeDataConstants.constants &&
            storeDataConstants.constants[`units_max_${stat}`]
          "
          :min="0"
          :step="1"
          class="align-center mx-5"
          hide-details
          thumb-label
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import difference from 'lodash-es/difference'

import * as UnitsFilters from '~/utils/types/units-filters'
import type { IFilters, Trait } from '~/utils/types/units-filters'
import { objectEntries, objectFromEntries } from '~/utils/functions/typeSafe'
import { SORTED_MOVE_TYPES, type MoveType } from '~/utils/types/moves'
import {
  WEAPON_C_ST,
  SORTED_WEAPONS_MATRIX_FOR_UNITS_FILTERS,
  SORTED_WEAPON_COLORS,
  SORTED_WEAPON_FAMILY_TYPES,
  WEAPON_AGGREGATIONS,
  type WeaponType,
  type WeaponColor,
  type WeaponFamily,
  type AggregatedWeaponType,
} from '@/utils/types/weapons'
import { STATS_AND_BST } from '~/utils/types/units-stats'
import { cycleState } from '~/utils/functions/cycleState'
import { iconFor } from '~/utils/functions/iconFor'
import type { Availability } from '~/utils/types/units-availabilities'

const SIZE = 24

const filters = defineModel<IFilters>('filters')
defineProps<{
  size: number
  filterNameLoading: boolean
  filterNameErrorMessages: string[]
}>()
const { t } = useI18n()
const { mobile } = useDisplay()
const storeDataConstants = useStoreDataConstants()

const searchLength = computed(() =>
  filters.value && filters.value.name ? filters.value.name.length : 0,
)
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)

const isWeaponAggregateActive = computed(() =>
  objectFromEntries(
    objectEntries(WEAPON_AGGREGATIONS).map(([aggregate, weaponTypes]) => [
      aggregate,
      filters.value
        ? difference(weaponTypes, Array.from(filters.value.weapons)).length ===
          0
        : false,
    ]),
  ),
)

function toggleAvailability(availability: Availability) {
  if (!filters.value) return

  if (filters.value.availabilities.has(availability)) {
    filters.value.availabilities.delete(availability)
  } else {
    filters.value.availabilities.add(availability)
  }
}
function toggleTrait(trait: Trait) {
  if (!filters.value) return

  if (filters.value.traits.has(trait)) {
    filters.value.traits.delete(trait)
  } else {
    filters.value.traits.add(trait)
  }
}
function toggleMove(moveType: MoveType) {
  if (!filters.value) return

  if (filters.value.moves.has(moveType)) {
    filters.value.moves.delete(moveType)
  } else {
    filters.value.moves.add(moveType)
  }
}
function toggleWeapon(weaponType: WeaponType) {
  if (!filters.value) return

  if (filters.value.weapons.has(weaponType)) {
    filters.value.weapons.delete(weaponType)
  } else {
    filters.value.weapons.add(weaponType)
  }
}

function toggleWeaponColor(weaponType: WeaponColor) {
  toggleWeaponAggregate(weaponType)
}
function toggleWeaponFamily(weaponType: WeaponFamily) {
  toggleWeaponAggregate(weaponType)
}
function toggleWeaponAggregate(aggregate: AggregatedWeaponType) {
  if (!filters.value) return

  const types = WEAPON_AGGREGATIONS[aggregate]
  if (isWeaponAggregateActive.value[aggregate]) {
    types.forEach((type) => filters.value!.weapons.delete(type))
  } else {
    types.forEach((type) => filters.value!.weapons.add(type))
  }
}

function cycleFilter(
  key:
    | 'isRefresher'
    | 'hasResplendent'
    | 'isBrave'
    | 'isFallen'
    | 'isStory'
    | 'isTT'
    | 'isGHB'
    | 'hasPrfWeapon'
    | 'hasPrfSkill',
) {
  if (!filters.value) return

  filters.value[key] = cycleState(filters.value[key])
}
</script>

<style lang="scss" scoped>
.width-stat-headers {
  flex: 0 0 30px;
}
</style>
