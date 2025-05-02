<template>
  <AppRenderOnceWhileActive
    :active="storeDataUnitsStats.isLoaded && storeDataConstants.isLoaded"
  >
    <v-table
      v-if="storeDataConstants.constants"
      class="text-no-wrap"
    >
      <thead>
        <tr>
          <th />
          <th>
            <div class="d-flex align-center justify-space-between">
              <div>
                {{ t('units.show.stats.headers.unit') }}
              </div>
              <div>-</div>
              <div>
                {{ t('units.show.stats.headers.max') }}
              </div>
            </div>
          </th>
          <th class="text-end">
            {{ t('units.show.stats.headers.rank') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="stat in STATS"
          :key="stat"
        >
          <th
            :class="
              stats[`iv_${stat}`]
                ? STATS_IVS_COLORS[stats[`iv_${stat}`]!]
                : undefined
            "
          >
            {{ STATS_NAMES[stat] }}
          </th>
          <td>
            <div class="d-flex align-center">
              <div>
                {{ stats[`level40_${stat}`] }}
              </div>
              <v-progress-linear
                :location="null"
                :bg-color="barBgColor"
                :color="STATS_COLORS[stat]"
                height="12"
                :model-value="stats[`level40_${stat}`]"
                min="0"
                :max="storeDataConstants.constants[`units_max_${stat}`]"
                rounded
                class="mx-3 min-width-100px"
              />
              <div>
                {{ storeDataConstants.constants[`units_max_${stat}`] }}
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ stats[`rank_${stat}`] }}
            /
            {{ storeDataConstants.constants.units_count }}
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th>
            {{ t('units.show.stats.headers.bst') }}
          </th>
          <td>
            <div class="d-flex align-center">
              <div>
                {{ unit.bst }}
              </div>
              <v-progress-linear
                :location="null"
                :bg-color="barBgColor"
                color="on-surface"
                height="12"
                :model-value="unit.bst"
                min="0"
                :max="storeDataConstants.constants.units_max_bst"
                rounded
                class="mx-3"
              />
              <div>
                {{ storeDataConstants.constants.units_max_bst }}
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ stats.rank_bst }}
            /
            {{ storeDataConstants.constants.units_count }}
          </td>
        </tr>
      </tfoot>
    </v-table>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import {
  STATS,
  STATS_NAMES,
  STATS_COLORS,
  STATS_IVS_COLORS,
} from '~/utils/types/units-stats'

import type { IUnit } from '~/utils/types/units'

const props = defineProps<{
  unit: IUnit
}>()

const { t } = useI18n()
const storeDataConstants = useStoreDataConstants()
const storeDataUnitsStats = useStoreDataUnitsStats()

const stats = computed(() => storeDataUnitsStats.statsById[props.unit.id])

const barBgColor = 'gray'
</script>

<style lang="scss" scoped>
.min-width-100px {
  min-width: 100px;
}
</style>
