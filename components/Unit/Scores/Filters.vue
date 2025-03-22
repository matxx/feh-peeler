<template>
  <div v-if="filters">
    <div v-show="!mobile">
      <v-text-field
        v-model="filters.name"
        :color="searchIsActive ? 'success' : 'primary'"
        :counter="counter"
        density="compact"
        clearable
        class="mb-2"
        :label="t('scores.labels.unitName')"
      />
    </div>
    <div>
      <div
        v-for="(array, index) in a.SORTED_AV_SCORES_FOR_FILTERS"
        :key="index"
      >
        <v-btn-toggle
          v-model="filters.availabilities"
          multiple
          divided
          color="primary"
          density="compact"
          variant="outlined"
          class="mr-2 mb-1"
        >
          <v-btn
            v-for="availability in array"
            :key="availability"
            size="small"
            :value="availability"
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
        </v-btn-toggle>
      </div>

      <div class="mt-2">
        <v-btn-toggle
          v-model="filters.traits"
          multiple
          divided
          color="primary"
          density="compact"
          variant="outlined"
          class="mr-2 mb-1"
        >
          <v-btn
            size="small"
            :value="TRAIT_REARMED"
          >
            <img
              src="assets/icons/unit_types/rearmed.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            :value="TRAIT_ATTUNED"
          >
            <img
              src="assets/icons/unit_types/attuned.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            :value="TRAIT_ASCENDED"
          >
            <img
              src="assets/icons/unit_types/ascended.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            :value="TRAIT_EMBLEM"
          >
            <img
              src="assets/icons/unit_types/emblem.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            :value="TRAIT_AIDED"
          >
            <img
              src="assets/icons/unit_types/aided.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-toggle>
      </div>

      <div class="mb-2">
        <v-btn-toggle
          v-model="kinds"
          multiple
          divided
          color="primary"
          density="compact"
          variant="outlined"
          class="mr-1 mb-1"
        >
          <v-btn
            size="small"
            :value="DUO"
          >
            <img
              src="assets/icons/unit_types/duo.png"
              :width="size"
              :height="size"
            />
          </v-btn>
          <v-btn
            size="small"
            :value="HARMONIZED"
          >
            <img
              src="assets/icons/unit_types/harmonized.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle
          v-model="isRefresher"
          color="primary"
          density="compact"
          variant="outlined"
          class="mr-1 mb-1"
        >
          <v-btn
            size="small"
            :value="true"
          >
            <img
              src="assets/icons/unit_types/dancer.png"
              :width="size"
              :height="size"
            />
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <div>
      <div class="mb-3">
        <v-btn-toggle
          v-model="filters.moves"
          multiple
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="moveType in SORTED_MOVE_TYPES"
            :key="moveType"
            :value="moveType"
            size="small"
          >
            <AppIconMoveType
              :move-type="moveType"
              :size="size"
            />
          </v-btn>
        </v-btn-toggle>
      </div>

      <div class="d-flex">
        <v-sheet
          :height="36"
          :width="50"
          color="transparent"
        />
        <v-btn-toggle
          v-model="filters.weapons"
          multiple
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="weaponType in WEAPON_COLORS_FOR_FILTERS"
            :key="weaponType"
            :value="weaponType"
            size="small"
          >
            <AppIconWeaponType
              :weapon-type="weaponType"
              :size="size"
            />
          </v-btn>
        </v-btn-toggle>
      </div>
      <div
        v-for="(line, index) in SORTED_WEAPONS_MATRIX_FOR_FILTERS"
        :key="index"
      >
        <v-btn-toggle
          v-model="filters.weapons"
          multiple
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            :value="WEAPON_FAMILY_TYPES_FOR_FILTERS[index]"
            size="small"
          >
            <AppIconWeaponType
              :weapon-type="WEAPON_FAMILY_TYPES_FOR_FILTERS[index]"
              :size="size"
            />
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-model="filters.weapons"
          multiple
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="weaponType in line"
            :key="weaponType"
            :value="weaponType"
            size="small"
          >
            <AppIconWeaponType
              :weapon-type="weaponType"
              :size="size"
            />
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-if="index === 0"
          v-model="filters.weapons"
          multiple
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            :value="WEAPON_C_ST"
            size="small"
          >
            <AppIconWeaponType
              :weapon-type="WEAPON_C_ST"
              :size="size"
            />
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as a from '@/utils/types/units-availabilities'
import { SORTED_MOVE_TYPES } from '@/utils/types/moves'
import {
  WEAPON_C_ST,
  SORTED_WEAPONS_MATRIX_FOR_FILTERS,
  WEAPON_COLORS_FOR_FILTERS,
  WEAPON_FAMILY_TYPES_FOR_FILTERS,
} from '@/utils/types/weapons'
import type { IFilters } from '@/utils/types/scores'
import {
  TRAIT_REARMED,
  TRAIT_ATTUNED,
  TRAIT_ASCENDED,
  TRAIT_EMBLEM,
  TRAIT_AIDED,
} from '@/utils/types/scores'

const SIZE = 24

const filters = defineModel<IFilters>('filters')
defineProps<{ size: number }>()
const { t } = useI18n()
const { mobile } = useDisplay()

const searchLength = computed(() =>
  filters.value && filters.value.name ? filters.value.name.length : 0,
)
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)

const isRefresher = ref(filters.value?.isRefresher ? true : false)
watch(isRefresher, () => {
  if (!filters.value) return

  filters.value.isRefresher = !!isRefresher.value
})

const DUO = 'DUO'
const HARMONIZED = 'HARMONIZED'

const initialKinds = []
if (filters.value?.isDuo) initialKinds.push(DUO)
if (filters.value?.isHarmonized) initialKinds.push(HARMONIZED)

const kinds = ref<string[]>([])
watch(kinds, () => {
  if (!filters.value) return

  filters.value.isDuo = kinds.value.includes(DUO)
  filters.value.isHarmonized = kinds.value.includes(HARMONIZED)
})
</script>
