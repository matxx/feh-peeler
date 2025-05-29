<!-- examples: -->
<!-- https://kannadb.up.railway.app/feh/skills/all/ -->
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
        :label="t('skills.filters.skillName')"
        :error-messages="filterNameErrorMessages"
      />
    </div>

    <div class="mt-1">
      <div
        v-for="(array, index) in a.AVAILABILITIES_FOR_FILTERS"
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
              v-if="availability === a.AV_GENERIC_POOL_3_4"
              :size="SIZE"
              :rarity="3"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_GENERIC_POOL_45"
              :size="SIZE"
              :rarity="4.5"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_GENERIC_POOL_5"
              :size="SIZE"
              :rarity="5"
              is-generic-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SPECIAL_POOL_4"
              :size="SIZE"
              :rarity="4"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SPECIAL_POOL_45"
              :size="SIZE"
              :rarity="4.5"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_SPECIAL_POOL_5"
              :size="SIZE"
              :rarity="5"
              is-special-pool
            />
            <CompoAvailability
              v-if="availability === a.AV_LIMITED_HEROES"
              :size="SIZE"
              :rarity="5"
              is-limited-hero
            />
            <CompoHeroicGrails
              v-if="availability === a.AV_HEROIC_GRAILS"
              :size="SIZE"
            />
            <!-- <CompoDivineCodes
              v-if="availability === a.AV_NORMAL_DIVINE_CODES"
              :size="SIZE"
            /> -->
          </v-btn>
        </v-btn-group>
      </div>
    </div>

    <div class="mt-1">
      <h4>
        {{ t('skills.filters.headers.type') }}
      </h4>
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
          :active="filters.isMax !== null"
          @click="cycleFilter('isMax')"
        >
          <v-icon start>
            {{ iconFor(filters.isMax) }}
          </v-icon>
          {{ t('skills.filters.isMax') }}
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
          :active="filters.isPrf !== null"
          @click="cycleFilter('isPrf')"
        >
          <v-icon start>
            {{ iconFor(filters.isPrf) }}
          </v-icon>
          {{ t('skills.filters.isPrf') }}
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <div>
        <v-btn-group
          v-for="(line, index) in WEAPONS_FOR_SKILLS_FILTERS"
          :key="index"
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="weapon in line"
            :key="weapon"
            size="small"
            class="text-primary"
            :active="filters.weaponTypes.has(weapon)"
            @click="toggleWeapon(weapon)"
          >
            <AppIconWeaponType
              :weapon-type="weapon"
              :size="SIZE"
            />
          </v-btn>
        </v-btn-group>
        <v-btn-group
          v-for="(line, index) in CATEGORIES_FOR_SKILLS_FILTERS"
          :key="index"
          divided
          color="primary"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="category in line"
            :key="category"
            size="small"
            class="text-primary"
            :active="filters.categories.has(category)"
            @click="toggleCategory(category)"
          >
            <SkillImgCategory
              :category="category"
              :size="SIZE"
            />
          </v-btn>
        </v-btn-group>
      </div>
    </div>

    <div class="mt-1">
      <h4>
        {{ t('skills.filters.headers.whoCanInherit') }}
      </h4>
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
          :active="filters.canUse.moves.has(moveType)"
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
      <v-btn-group
        v-for="(line, index) in WEAPONS_FOR_SKILLS_FILTERS"
        :key="index"
        divided
        color="primary"
        density="compact"
        variant="outlined"
      >
        <v-btn
          v-for="weapon in line"
          :key="weapon"
          size="small"
          class="text-primary"
          :active="filters.canUse.weapons.has(weapon)"
          @click="toggleCanUseWeapon(weapon)"
        >
          <AppIconWeaponType
            :weapon-type="weapon"
            :size="SIZE"
          />
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-1">
      <h4>
        {{ t('skills.filters.headers.stats') }}
      </h4>
      <div
        v-for="stat in STATS"
        :key="stat"
        class="d-flex align-center"
      >
        <div class="width-stat-headers">
          {{ t(`skills.filters.stats.${stat}`) }}
        </div>
        <v-range-slider
          v-model="filters.stats[stat]"
          :max="
            storeDataConstants.constants &&
            storeDataConstants.constants[`skills_max_${stat}`]
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
import * as a from '~/utils/types/units-availabilities'
import { STATS, type IFilters } from '~/utils/types/skills-filters'
import { SORTED_MOVE_TYPES, type MoveType } from '~/utils/types/moves'
import {
  WEAPONS_FOR_SKILLS_FILTERS,
  type ExtendedWeaponType,
} from '@/utils/types/weapons'
import type { Availability } from '~/utils/types/units-availabilities'
import {
  CATEGORIES_FOR_SKILLS_FILTERS,
  type SkillCategory,
} from '~/utils/types/skills'
import { cycleState } from '~/utils/functions/cycleState'
import { iconFor } from '~/utils/functions/iconFor'

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

function toggleAvailability(availability: Availability) {
  const val = filters.value
  if (!val) return

  if (val.availabilities.has(availability)) {
    val.availabilities.delete(availability)
  } else {
    val.availabilities.add(availability)
  }
}
function toggleWeapon(weaponType: ExtendedWeaponType) {
  const val = filters.value
  if (!val) return

  if (val.weaponTypes.has(weaponType)) {
    val.weaponTypes.delete(weaponType)
  } else {
    val.weaponTypes.add(weaponType)
  }
}
function toggleCategory(category: SkillCategory) {
  const val = filters.value
  if (!val) return

  if (val.categories.has(category)) {
    val.categories.delete(category)
  } else {
    val.categories.add(category)
  }
}

function toggleMove(moveType: MoveType) {
  const val = filters.value
  if (!val) return

  if (val.canUse.moves.has(moveType)) {
    val.canUse.moves.delete(moveType)
  } else {
    val.canUse.moves.add(moveType)
  }
}
function toggleCanUseWeapon(weaponType: ExtendedWeaponType) {
  const val = filters.value
  if (!val) return

  if (val.canUse.weapons.has(weaponType)) {
    val.canUse.weapons.delete(weaponType)
  } else {
    val.canUse.weapons.add(weaponType)
  }
}

function cycleFilter(key: 'isMax' | 'isPrf') {
  const val = filters.value
  if (!val) return

  val[key] = cycleState(val[key])
}
</script>

<style lang="scss" scoped>
.width-stat-headers {
  flex: 0 0 30px;
}
</style>
