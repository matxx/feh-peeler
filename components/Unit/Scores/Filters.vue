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
      <div
        v-for="(array, index) in a.SORTED_AV_SCORES_FOR_FILTERS"
        :key="index"
      >
        <v-btn-group
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="availability in array"
            :key="availability"
            size="small"
            class="text-primary"
            :active="filters.availabilities.has(availability)"
            @click="toggleAvailability(availability)"
          >
            <CompoAvailability
              v-if="availability === a.AV_SCORE_GENERIC_POOL_3_4"
              :size="SIZE"
              :rarity="3"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_GENERIC_POOL_45"
              :size="SIZE"
              :rarity="4.5"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_GENERIC_POOL_5"
              :size="SIZE"
              :rarity="5"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_SPECIAL_POOL_4"
              :size="SIZE"
              :rarity="4"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_SPECIAL_POOL_45"
              :size="SIZE"
              :rarity="4.5"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_SPECIAL_POOL_5"
              :size="SIZE"
              :rarity="5"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SCORE_LIMITED_HEROES"
              :size="SIZE"
              :rarity="5"
              is-limited-hero
            />
            <CompoHeroicGrails
              v-if="availability === a.AV_SCORE_HEROIC_GRAILS"
              :size="SIZE"
            />
            <CompoDivineCodes
              v-if="availability === a.AV_SCORE_NORMAL_DIVINE_CODES"
              :size="SIZE"
            />
          </v-btn>
        </v-btn-group>
      </div>
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
          @click="cycleRefresher"
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
          @click="cycleResplendent"
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
          @click="cycleBrave"
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
        v-for="(line, index) in SORTED_WEAPONS_MATRIX_FOR_FILTERS"
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
            :active="
              isWeaponAggregateActive[WEAPON_FAMILY_TYPES_FOR_FILTERS[index]]
            "
            @click="toggleWeaponFamily(WEAPON_FAMILY_TYPES_FOR_FILTERS[index])"
          >
            <AppIconWeaponType
              :weapon-type="WEAPON_FAMILY_TYPES_FOR_FILTERS[index]"
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

import * as a from '~/utils/types/units-availabilities'
import * as UnitsFilters from '~/utils/types/units-filters'
import type { IFilters, Trait } from '~/utils/types/units-filters'
import { objectEntries, objectFromEntries } from '~/utils/functions/typeSafe'
import { SORTED_MOVE_TYPES, type MoveType } from '~/utils/types/moves'
import {
  WEAPON_C_ST,
  SORTED_WEAPONS_MATRIX_FOR_FILTERS,
  SORTED_WEAPON_COLORS,
  WEAPON_FAMILY_TYPES_FOR_FILTERS,
  WEAPON_AGGREGATIONS_FOR_FILTERS,
  type WeaponType,
  type WeaponColor,
  type WeaponFamily,
  type AggregatedWeaponType,
} from '@/utils/types/weapons'
import { STATS_AND_BST } from '~/utils/types/units-stats'

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
    objectEntries(WEAPON_AGGREGATIONS_FOR_FILTERS).map(
      ([aggregate, weaponTypes]) => [
        aggregate,
        filters.value
          ? difference(weaponTypes, Array.from(filters.value.weapons))
              .length === 0
          : false,
      ],
    ),
  ),
)

function toggleAvailability(availability: a.AV_Availability) {
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

  const types = WEAPON_AGGREGATIONS_FOR_FILTERS[aggregate]
  if (isWeaponAggregateActive.value[aggregate]) {
    types.forEach((type) => filters.value!.weapons.delete(type))
  } else {
    types.forEach((type) => filters.value!.weapons.add(type))
  }
}

function cycleState(state: boolean | null) {
  switch (state) {
    case true:
      return false
    case false:
      return null
    case null:
      return true
  }
}
function cycleRefresher() {
  if (!filters.value) return

  filters.value.isRefresher = cycleState(filters.value.isRefresher)
}
function cycleResplendent() {
  if (!filters.value) return

  filters.value.hasResplendent = cycleState(filters.value.hasResplendent)
}
function cycleBrave() {
  if (!filters.value) return

  filters.value.isBrave = cycleState(filters.value.isBrave)
}

function iconFor(state: boolean | null) {
  switch (state) {
    case true:
      return 'mdi-checkbox-outline'
    case false:
      return 'mdi-close-box-outline'
    case null:
      return 'mdi-checkbox-blank-outline'
  }
}
</script>

<style lang="scss" scoped>
.width-stat-headers {
  flex: 0 0 30px;
}
</style>
