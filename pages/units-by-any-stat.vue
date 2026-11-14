<template>
  <div>
    <div ref="mobile-units-filter-name" />

    <template v-if="groupByField">
      <div class="groups__line">
        <h4
          v-tooltip="t('units.groupBy.sortTooltip')"
          class="groups__key groups__key--sortable"
          @click="toggleOrder"
        >
          {{ t(`units.groupBy.fields.${groupByField}`) }}
          <v-icon
            size="small"
            class="ml-1"
          >
            {{ order === ASC ? 'mdi-sort-ascending' : 'mdi-sort-descending' }}
          </v-icon>
        </h4>
        <h4 class="groups__units">
          {{ t('scores.headers.units') }}
        </h4>
      </div>
      <client-only>
        <DynamicScroller
          :items="groups"
          :min-item-size="MIN_ROW_HEIGHT"
          key-field="key"
          page-mode
        >
          <template #default="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
              :size-dependencies="[item.units.length]"
            >
              <div class="groups__line">
                <div class="groups__key pt-4">
                  <div v-if="item.key === GROUP_BY_EMPTY_KEY">
                    {{ t('units.groupBy.empty') }}
                  </div>
                  <AppIconMoveType
                    v-else-if="groupByField === 'move_type'"
                    v-tooltip="item.key"
                    :move-type="item.key as MoveType"
                    :size="iconSize"
                  />
                  <AppIconWeaponType
                    v-else-if="isWeaponField"
                    v-tooltip="item.key"
                    :weapon-type="item.key as ExtendedWeaponType"
                    :size="iconSize"
                  />
                  <AppIconElement
                    v-else-if="groupByField === 'element'"
                    v-tooltip="item.key"
                    :element="item.key as Element"
                    :size="iconSize"
                  />
                  <div v-else-if="groupByField === 'theme'">
                    {{ t(`units.themes.${item.key}`) }}
                  </div>
                  <div v-else>
                    {{ item.key }}
                  </div>
                </div>
                <UnitListThumbnailsHorizontal
                  :units="item.units"
                  :size="size"
                  :size-corner="sizeCorner"
                  class="groups__units"
                />
              </div>

              <v-divider />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </client-only>
    </template>
  </div>
</template>

<script setup lang="ts">
import groupBy from 'lodash-es/groupBy'

import {
  ASC,
  DESC,
  createDefaultSortersForUnitsByMaxScore,
  type Order,
} from '~/utils/types/units-sorters'
import {
  GROUP_BY_EMPTY_KEY,
  getDefaultGroupByOrder,
  getGroupByKey,
  sortGroupByKeys,
} from '~/utils/types/units-group-by'
import type { MoveType } from '~/utils/types/moves'
import type { ExtendedWeaponType } from '~/utils/types/weapons'
import type { Element } from '~/utils/types/elements'

definePageMeta({
  layout: 'units-filters',
})

const { t } = useI18n()
const storeGlobals = useStoreGlobals()

const div = useTemplateRef('mobile-units-filter-name')
onMounted(() => {
  storeGlobals.setMobileUnitFilterElem(div.value)
})
onBeforeUnmount(() => {
  storeGlobals.setMobileUnitFilterElem()
})

const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

onMounted(() => {
  storeDataUnits.load()
  storeDataUnitsAvailabilities.load()
})

const size = 40
const sizeCorner = 15
const iconSize = 24
// horizontal scroller height + divider
const MIN_ROW_HEIGHT = 61

const storeUnitsFilters = useStoreUnitsFilters()
storeUnitsFilters.$reset()
storeUnitsFilters.sorters = createDefaultSortersForUnitsByMaxScore()

const groupByField = computed(() => storeUnitsFilters.groupBy)

const WEAPON_FIELDS = new Set(['weapon_type', 'weaponColor', 'weaponFamily'])
const isWeaponField = computed(
  () => !!groupByField.value && WEAPON_FIELDS.has(groupByField.value),
)

const reversed = ref(false)
watch(groupByField, () => {
  reversed.value = false
})
const order = computed<Order>(() => {
  if (!groupByField.value) return ASC

  const defaultOrder = getDefaultGroupByOrder(groupByField.value)
  if (!reversed.value) return defaultOrder

  return defaultOrder === ASC ? DESC : ASC
})
function toggleOrder() {
  reversed.value = !reversed.value
}

const unitsByKey = computed(() => {
  const field = groupByField.value
  if (!field) return {}

  const datePeriod = storeUnitsFilters.groupByDatePeriod

  return groupBy(storeUnitsFilters.unitsFilteredSorted, (unit) =>
    getGroupByKey(unit, field, datePeriod),
  )
})
const groups = computed(() => {
  const field = groupByField.value
  if (!field) return []

  return sortGroupByKeys(unitsByKey.value, field, order.value).map((key) => ({
    key,
    units: unitsByKey.value[key] ?? [],
  }))
})
</script>

<style lang="scss" scoped>
.groups__line {
  display: flex;
}
.groups__key {
  flex: 0 0 180px;

  display: flex;
  align-items: start;
  justify-content: center;
  text-align: center;
}
.groups__key--sortable {
  cursor: pointer;
  user-select: none;
}
.groups__units {
  flex: 1;
  min-width: 0;
}
</style>
