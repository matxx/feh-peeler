<!-- examples: -->
<!-- https://kannadb.up.railway.app/feh/skills/all/ -->
<template>
  <div v-if="filters">
    <div v-show="!mobile">
      <v-text-field
        v-model="filters.name"
        :loading="storeSealsFilters.isUpdating"
        :color="storeSealsFilters.searchNameIsActive ? 'success' : 'primary'"
        :counter="storeSealsFilters.searchNameCounter"
        density="compact"
        clearable
        :label="t('seals.filters.sealName')"
        :error-messages="storeSealsFilters.searchNameErrorMessages"
      />
    </div>

    <div class="mt-1">
      <v-text-field
        v-model="filters.description"
        :loading="storeSealsFilters.isUpdating"
        :color="
          storeSealsFilters.searchDescriptionIsActive ? 'success' : 'primary'
        "
        :counter="storeSealsFilters.searchDescriptionCounter"
        density="compact"
        clearable
        :label="t('seals.filters.sealDescription')"
        :error-messages="storeSealsFilters.searchDescriptionErrorMessages"
      />
    </div>

    <div class="mt-1">
      <h4>
        {{ t('seals.filters.headers.type') }}
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
          {{ t('seals.filters.isMax') }}
        </v-btn>
      </v-btn-group>
    </div>

    <div class="mt-3">
      <h4>
        {{ t('seals.filters.headers.whoCanEquip') }}
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

    <div class="mt-3">
      <h4>
        {{ t('seals.filters.headers.stats') }}
      </h4>
      <div
        v-for="stat in STATS"
        :key="stat"
        class="d-flex align-center"
      >
        <div class="width-stat-headers">
          {{ t(`seals.filters.stats.${stat}`) }}
        </div>
        <v-range-slider
          v-model="filters.stats[stat]"
          :max="
            storeDataConstants.constants &&
            storeDataConstants.constants[`seals_max_${stat}`]
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
import { STATS, type IFilters } from '~/utils/types/seals-filters'
import { SORTED_MOVE_TYPES, type MoveType } from '~/utils/types/moves'
import {
  WEAPONS_FOR_SKILLS_FILTERS,
  type ExtendedWeaponType,
} from '@/utils/types/weapons'
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
const storeSealsFilters = useStoreSealsFilters()

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

function cycleFilter(key: 'isMax') {
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
