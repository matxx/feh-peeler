<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-select
          v-model="consideration"
          :loading="isLoading"
          :label="t('misc.stats.considerUnits')"
          :items="considerationItems"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="operator"
          :loading="isLoading"
          :label="t('misc.stats.operator')"
          :items="operatorItems"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <template
          v-for="graph in [graphOnBST, graphOnStats]"
          :key="graph.key"
        >
          <highchart
            :options="graph.chartOptions"
            :modules="['accessibility', 'exporting', 'export-data']"
          />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import filter from 'lodash-es/filter'
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

import { hexColor } from '~/plugins/vuetify'
import { objectEntries } from '~/utils/functions/typeSafe'
import { MOVES_COLORS, SORTED_MOVE_TYPES } from '~/utils/types/moves'
import {
  STATS,
  STATS_COLORS,
  CONSIDERATIONS,
  OPERATORS,
  UNITS_RELEASED_UP_TO_THAT_MONTH,
  UNITS_RELEASED_ONLY_THAT_MONTH,
  OPERATOR_AVERAGE,
  OPERATOR_MEDIAN,
  OPERATOR_MODE,
  OPERATOR_RANGE,
  type IUnitStat,
} from '~/utils/types/units-stats'
import { mean, median, mode, range } from '~/utils/functions/math'

const { t } = useI18n()
const { current } = useTheme()

const consideration = ref(UNITS_RELEASED_ONLY_THAT_MONTH)
const operator = ref(OPERATOR_AVERAGE)

const considerationItems = CONSIDERATIONS.map((key) => ({
  value: key,
  title: t(`misc.stats.consideredUnits.${key}`),
}))

const operatorItems = OPERATORS.map((key) => ({
  value: key,
  title: t(`misc.stats.operators.${key}`),
}))

const operatorCallback = computed(() => {
  switch (operator.value) {
    case OPERATOR_AVERAGE:
      return mean
    case OPERATOR_MEDIAN:
      return median
    case OPERATOR_MODE:
      return mode
    case OPERATOR_RANGE:
      return range
    default:
      return () => 0
  }
})

const storeDataUnits = useStoreDataUnits()
const storeDataUnitsStats = useStoreDataUnitsStats()
const { isLoading } = useDataStores([storeDataUnits, storeDataUnitsStats])

const unitsConsidered = computed(() =>
  consideration.value === UNITS_RELEASED_UP_TO_THAT_MONTH
    ? storeDataUnits.unitsUntilYearMonth
    : storeDataUnits.unitsByReleaseYearMonth,
)
const unitsByMonthSorted = computed(() =>
  sortBy(objectEntries(unitsConsidered.value), ([month, _units]) => month),
)
type monthAndUnits = [string, IUnitStat[]]
const unitsStatsByMonthSorted = computed<monthAndUnits[]>(() =>
  unitsByMonthSorted.value.map(([month, units]) => [
    month,
    units.map((unit) => storeDataUnitsStats.statsById[unit.id]),
  ]),
)

const graphOnBST = computed(() => ({
  key: 'bst',
  chartOptions: {
    chart: {
      styledMode: true,
    },
    title: {
      text: t('misc.stats.evolutionOfBST'),
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      title: {
        text: null,
      },
      categories: unitsByMonthSorted.value.map(([month, _units]) => month),
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: t('global.all'),
        data: unitsByMonthSorted.value.map(([month, units]) => [
          month,
          Math.round(
            operatorCallback.value(
              compact(units.map((unit) => unit && unit.bst)),
            ),
          ),
        ]),
        color: current.value.colors['on-surface'],
      },
    ].concat(
      SORTED_MOVE_TYPES.map((move) => ({
        name: t(`misc.stats.moves.${move}`),
        data: unitsByMonthSorted.value.map(([month, units]) => [
          month,
          Math.round(
            operatorCallback.value(
              compact(
                filter(units, (unit) => unit.move_type === move).map(
                  (unit) => unit && unit.bst,
                ),
              ),
            ),
          ),
        ]),
        color: hexColor(MOVES_COLORS[move]),
      })),
    ),
  },
}))

const graphOnStats = computed(() => ({
  key: 'stats',
  chartOptions: {
    chart: {
      styledMode: true,
    },
    title: {
      text: t('misc.stats.evolutionOfStats'),
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      title: {
        text: null,
      },
      categories: unitsByMonthSorted.value.map(([month, _units]) => month),
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: STATS.map((stat) => ({
      name: t(`units.filters.stats.${stat}`),
      data: unitsStatsByMonthSorted.value.map(([month, unitsStats]) => [
        month,
        Math.round(
          operatorCallback.value(
            compact(
              unitsStats.map(
                (unitStats) => unitStats && unitStats[`level40_${stat}`],
              ),
            ),
          ),
        ),
      ]),
      color: hexColor(STATS_COLORS[stat]),
    })),
  },
}))
</script>
