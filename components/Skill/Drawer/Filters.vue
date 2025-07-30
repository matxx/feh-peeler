<!-- examples: -->
<!-- https://kannadb.up.railway.app/feh/skills/all/ -->
<template>
  <div v-if="filters">
    <div v-show="!mobile">
      <v-text-field
        v-model="filters.name"
        :loading="storeSkillsFilters.isUpdating"
        :color="storeSkillsFilters.searchNameIsActive ? 'success' : 'primary'"
        :counter="storeSkillsFilters.searchNameCounter"
        density="compact"
        clearable
        :label="t('skills.filters.skillName')"
        :error-messages="storeSkillsFilters.searchNameErrorMessages"
      />
    </div>

    <div class="mt-1">
      <v-text-field
        v-model="filters.description"
        :loading="storeSkillsFilters.isUpdating"
        :color="
          storeSkillsFilters.searchDescriptionIsActive ? 'success' : 'primary'
        "
        :counter="storeSkillsFilters.searchDescriptionCounter"
        density="compact"
        clearable
        :label="t('skills.filters.skillDescription')"
        :error-messages="storeSkillsFilters.searchDescriptionErrorMessages"
      />
    </div>

    <div class="mt-1">
      <h4>
        {{ t('skills.filters.headers.availability') }}
      </h4>
    </div>

    <div class="mt-1">
      <AppFiltersOnAvailability
        :size="SIZE"
        :availabilities="filters.availabilities"
        @toggle-availability="toggleAvailability"
      />
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
            {{ iconForBool(filters.isMax) }}
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
            {{ iconForBool(filters.isPrf) }}
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
      </div>
    </div>
    <div class="mt-1">
      <div>
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

    <div class="mt-1">
      <h4>
        {{ t('skills.filters.headers.preInheritance') }}
      </h4>
    </div>

    <div class="mt-1">
      <AppFiltersOnAvailability
        :size="SIZE"
        :availabilities="filters.preInheritance"
        @toggle-availability="togglePreInheritance"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
import { iconForBool } from '~/utils/functions/iconFor'

const SIZE = 24

const filters = defineModel<IFilters>('filters')
defineProps<{
  size: number
}>()
const { t } = useI18n()
const { mobile } = useDisplay()
const storeDataConstants = useStoreDataConstants()
const storeSkillsFilters = useStoreSkillsFilters()

function toggleAvailability(availability: Availability) {
  const val = filters.value
  if (!val) return

  if (val.availabilities.has(availability)) {
    val.availabilities.delete(availability)
  } else {
    val.availabilities.add(availability)
  }
}
function togglePreInheritance(availability: Availability) {
  const val = filters.value
  if (!val) return

  if (val.preInheritance.has(availability)) {
    val.preInheritance.delete(availability)
  } else {
    val.preInheritance.add(availability)
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
