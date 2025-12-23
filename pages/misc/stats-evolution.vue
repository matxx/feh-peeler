<template>
  <v-container
    fluid
    class="highcharts-colors"
  >
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
          v-for="graph in allGraphs"
          :key="graph.key"
        >
          <v-card
            class="mb-8"
            elevation="4"
          >
            <highchart
              :options="graph.chartOptions"
              :modules="['accessibility', 'exporting', 'export-data']"
              :class="`highcharts-${storeTheme.appliedTheme}`"
            />
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import min from 'lodash-es/min'
import max from 'lodash-es/max'
import filter from 'lodash-es/filter'
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

import { hexColor } from '~/plugins/vuetify'
import { objectEntries } from '~/utils/functions/typeSafe'
import * as moves from '~/utils/types/moves'
import * as stats from '~/utils/types/units-stats'
import { mean, median, mode, range } from '~/utils/functions/math'

const { t } = useI18n()
const { current } = useTheme()
const storeTheme = useStoreTheme()

const consideration = ref(stats.UNITS_RELEASED_ONLY_THAT_MONTH)
const operator = ref(stats.OPERATOR_AVERAGE)

const considerationItems = stats.CONSIDERATIONS.map((key) => ({
  value: key,
  title: t(`misc.stats.consideredUnits.${key}`),
}))

const operatorItems = stats.OPERATORS.map((key) => ({
  value: key,
  title: t(`misc.stats.operators.${key}`),
}))

const operatorCallback = computed(() => {
  switch (operator.value) {
    case stats.OPERATOR_AVERAGE:
      return mean
    case stats.OPERATOR_MEDIAN:
      return median
    case stats.OPERATOR_MIN:
      return min
    case stats.OPERATOR_MAX:
      return max
    case stats.OPERATOR_MODE:
      return mode
    case stats.OPERATOR_RANGE:
      return range
    default:
      return () => 0
  }
})

const storeDataUnits = useStoreDataUnits()
const storeDataUnitsStats = useStoreDataUnitsStats()
const { isLoading } = useDataStores([storeDataUnits, storeDataUnitsStats])

const unitsConsidered = computed(() =>
  consideration.value === stats.UNITS_RELEASED_UP_TO_THAT_MONTH
    ? storeDataUnits.unitsUntilYearMonth
    : storeDataUnits.unitsByReleaseYearMonth,
)
const unitsByMonthSorted = computed(() =>
  sortBy(objectEntries(unitsConsidered.value), ([month, _units]) => month),
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
            ) || NaN,
          ),
        ]),
        color: current.value.colors['on-surface-variant'],
        colorIndex: colorIndexes.value.all,
      },
    ].concat(
      moves.SORTED_MOVE_TYPES.map((move) => ({
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
            ) || NaN,
          ),
        ]),
        color: hexColor(moves.MOVES_COLORS[move]),
        colorIndex: colorIndexes.value.moves[move],
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
      text: t('misc.stats.evolutionOfStats.all'),
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
    series: stats.STATS.map((stat) => ({
      name: t(`global.stats.${stat}`),
      data: unitsByMonthSorted.value.map(([month, units]) => [
        month,
        Math.round(
          operatorCallback.value(
            compact(
              units.map(
                (unit) =>
                  unit &&
                  storeDataUnitsStats.statsById[unit.id] &&
                  storeDataUnitsStats.statsById[unit.id][`level40_${stat}`],
              ),
            ),
          ) || NaN,
        ),
      ]),
      color: hexColor(stats.STATS_COLORS[stat]),
      colorIndex: colorIndexes.value.stats[stat],
    })),
  },
}))

const graphOnStatsByMove = computed(() =>
  moves.SORTED_MOVE_TYPES.map((move) => ({
    key: `stats-${move}`,
    chartOptions: {
      chart: {
        styledMode: true,
      },
      title: {
        text: t(`misc.stats.evolutionOfStats.byMoves.${move}`),
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
      series: stats.STATS.map((stat) => ({
        name: t(`global.stats.${stat}`),
        data: unitsByMonthSorted.value.map(([month, units]) => [
          month,
          Math.round(
            operatorCallback.value(
              compact(
                filter(units, (unit) => unit.move_type === move).map(
                  (unit) =>
                    unit &&
                    storeDataUnitsStats.statsById[unit.id] &&
                    storeDataUnitsStats.statsById[unit.id][`level40_${stat}`],
                ),
              ),
            ) || NaN,
          ),
        ]),
        color: hexColor(stats.STATS_COLORS[stat]),
        colorIndex: colorIndexes.value.stats[stat],
      })),
    },
  })),
)

const graphOnStatsByStat = computed(() =>
  stats.STATS.map((stat) => ({
    key: `stats-${stat}`,
    chartOptions: {
      chart: {
        styledMode: true,
      },
      title: {
        text: t(`misc.stats.evolutionOfStats.byStats.${stat}`),
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
                compact(
                  units.map(
                    (unit) =>
                      unit &&
                      storeDataUnitsStats.statsById[unit.id] &&
                      storeDataUnitsStats.statsById[unit.id][`level40_${stat}`],
                  ),
                ),
              ) || NaN,
            ),
          ]),
          color: current.value.colors['on-surface-variant'],
          colorIndex: colorIndexes.value.all,
        },
      ].concat(
        moves.SORTED_MOVE_TYPES.map((move) => ({
          name: t(`misc.stats.moves.${move}`),
          data: unitsByMonthSorted.value.map(([month, units]) => [
            month,
            Math.round(
              operatorCallback.value(
                compact(
                  filter(units, (unit) => unit.move_type === move).map(
                    (unit) =>
                      unit &&
                      storeDataUnitsStats.statsById[unit.id] &&
                      storeDataUnitsStats.statsById[unit.id][`level40_${stat}`],
                  ),
                ),
              ) || NaN,
            ),
          ]),
          color: hexColor(moves.MOVES_COLORS[move]),
          colorIndex: colorIndexes.value.moves[move],
        })),
      ),
    },
  })),
)

const allGraphs = computed(() =>
  [graphOnBST.value, graphOnStats.value].concat(
    graphOnStatsByMove.value,
    graphOnStatsByStat.value,
  ),
)

// TODO: find a way to refactor `colorIndexes` / `colors` into one constant to avoid possible mistakes

// must be in sync with `colors`
const colorIndexes = computed(() => ({
  all: 100,
  moves: {
    [moves.MOVE_I]: 110,
    [moves.MOVE_A]: 111,
    [moves.MOVE_C]: 112,
    [moves.MOVE_F]: 113,
  },
  stats: {
    [stats.HP]: 120,
    [stats.ATK]: 121,
    [stats.SPD]: 122,
    [stats.DEF]: 123,
    [stats.RES]: 124,
  },
}))

// must be in sync with `colorIndexes`
const colors = computed(() => ({
  _100: current.value.colors['on-surface'], // not defined...

  _110: hexColor(moves.MOVES_COLORS[moves.MOVE_I]),
  _111: hexColor(moves.MOVES_COLORS[moves.MOVE_A]),
  _112: hexColor(moves.MOVES_COLORS[moves.MOVE_C]),
  _113: hexColor(moves.MOVES_COLORS[moves.MOVE_F]),

  _120: hexColor(stats.STATS_COLORS[stats.HP]),
  _121: hexColor(stats.STATS_COLORS[stats.ATK]),
  _122: hexColor(stats.STATS_COLORS[stats.SPD]),
  _123: hexColor(stats.STATS_COLORS[stats.DEF]),
  _124: hexColor(stats.STATS_COLORS[stats.RES]),
}))
</script>

<style lang="scss" scoped>
.highcharts-colors {
  // --highcharts-color-100: v-bind('colors._100');
  --highcharts-color-100: rgb(var(--v-theme-on-surface));

  --highcharts-color-110: v-bind('colors._110');
  --highcharts-color-111: v-bind('colors._111');
  --highcharts-color-112: v-bind('colors._112');
  --highcharts-color-113: v-bind('colors._113');

  --highcharts-color-120: v-bind('colors._120');
  --highcharts-color-121: v-bind('colors._121');
  --highcharts-color-122: v-bind('colors._122');
  --highcharts-color-123: v-bind('colors._123');
  --highcharts-color-124: v-bind('colors._124');

  :deep(.highcharts-color-100) {
    fill: var(--highcharts-color-100);
    stroke: var(--highcharts-color-100);
  }

  :deep(.highcharts-color-110) {
    fill: var(--highcharts-color-110);
    stroke: var(--highcharts-color-110);
  }
  :deep(.highcharts-color-111) {
    fill: var(--highcharts-color-111);
    stroke: var(--highcharts-color-111);
  }
  :deep(.highcharts-color-112) {
    fill: var(--highcharts-color-112);
    stroke: var(--highcharts-color-112);
  }
  :deep(.highcharts-color-113) {
    fill: var(--highcharts-color-113);
    stroke: var(--highcharts-color-113);
  }

  :deep(.highcharts-color-120) {
    fill: var(--highcharts-color-120);
    stroke: var(--highcharts-color-120);
  }
  :deep(.highcharts-color-121) {
    fill: var(--highcharts-color-121);
    stroke: var(--highcharts-color-121);
  }
  :deep(.highcharts-color-122) {
    fill: var(--highcharts-color-122);
    stroke: var(--highcharts-color-122);
  }
  :deep(.highcharts-color-123) {
    fill: var(--highcharts-color-123);
    stroke: var(--highcharts-color-123);
  }
  :deep(.highcharts-color-124) {
    fill: var(--highcharts-color-124);
    stroke: var(--highcharts-color-124);
  }
}
</style>
