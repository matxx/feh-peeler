<template>
  <v-autocomplete
    v-model="unit"
    v-model:search="searchText"
    autocomplete="off"
    return-object
    :loading="isUpdating"
    :items="unitsFiltered"
    item-title="full_name"
    item-value="id"
    :menu-props="{
      openOnFocus: false,
      location: 'bottom',
    }"
    density="compact"
    hide-details
    :clearable="clearable"
    :custom-filter="() => true"
    :no-data-text="
      hasError
        ? 'global.invalidRegExp'
        : searchIsActive
          ? 'global.noUnitIsMatchingYourRequest'
          : 'global.typeAtLeastThreeCharacters'
    "
    :error-messages="errorMessages"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event ? $event.id : null)"
  >
    <template
      v-if="$slots['prepend']"
      #prepend="slotProps"
    >
      <slot
        name="prepend"
        v-bind="slotProps"
      />
    </template>

    <template
      v-if="unit && !withoutThumbnail"
      #append
    >
      <CompoUnitThumbnail
        :unit="unit"
        :size="25"
        :size-corner="10"
        :margin="5"
        :margin-icon="-5"
        class="cursor-pointer"
        @click="storeGlobals.showUnit(unit.id)"
      />
    </template>

    <template #item="{ props: slotProps, item }">
      <v-list-item
        v-bind="slotProps"
        :title="undefined"
      >
        <template #prepend>
          <CompoUnitThumbnail
            :unit="item.raw"
            :size="30"
            :size-corner="15"
            :margin="10"
            :margin-icon="-5"
          />
        </template>
        <v-list-item-title>
          <AppRegExpMatches
            v-if="regexp"
            :text="item.raw.full_name"
            :regexp="regexp"
          />
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter'

import { type UnitId, type IUnit, filterByName } from '~/utils/types/units'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()

defineEmits(['update:model-value', 'click:thumbnail'])
const unitId = defineModel<null | UnitId>()
withDefaults(
  defineProps<{
    withoutThumbnail?: boolean
    thumbnailClickable?: boolean
    clearable?: boolean
  }>(),
  {
    withoutThumbnail: false,
    thumbnailClickable: false,
    clearable: false,
  },
)

const unit = ref<IUnit>()
const isInitialized = ref(false)
function updateUnit() {
  unit.value =
    (unitId.value && storeDataUnits.unitsById[unitId.value]) || undefined
}
watch(unitId, updateUnit, { immediate: true })
watch(
  () => storeDataUnits.isLoaded,
  () => {
    if (isInitialized.value) return

    isInitialized.value = true
    updateUnit()
  },
)

const searchText = ref('')
const searchIsActive = computed(
  () =>
    searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, hasError, errorMessages } = useSearch(searchText)

const units = computed(() => storeDataUnits.sortedUnits)

const unitsFiltered = ref<IUnit[]>([])
const getUnitsFiltered = () =>
  regexp.value && searchIsActive.value
    ? filter(units.value, (unit) => filterByName(unit, regexp.value))
    : []
const updateUnitsFiltered = () => {
  unitsFiltered.value = getUnitsFiltered()
}
const { isUpdating } = useDebounce(updateUnitsFiltered, [[regexp], [units]])
</script>
