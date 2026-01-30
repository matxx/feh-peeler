<template>
  <v-autocomplete
    v-model="localUnitId"
    v-model:search="searchText"
    autocomplete="off"
    :loading="isUpdating"
    :items="unitIdsFiltered"
    :item-value="(item) => item"
    :item-title="itemTitleFinal"
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
    @update:model-value="$emit('update:model-value', $event)"
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
      v-if="localUnit && !withoutThumbnail"
      #append
    >
      <CompoUnitThumbnail
        :unit="localUnit"
        :size="25"
        :size-corner="10"
        :margin="5"
        :margin-icon="-5"
        class="cursor-pointer"
        @click="storeGlobals.showUnit(localUnit.id)"
      />
    </template>

    <template #item="{ props: slotProps, item }">
      <v-list-item
        v-bind="slotProps"
        :title="undefined"
      >
        <template #prepend>
          <CompoUnitThumbnail
            :unit="storeDataUnits.unitsById[item.raw]"
            :size="30"
            :size-corner="15"
            :margin="10"
            :margin-icon="-5"
          />
        </template>
        <v-list-item-title>
          <AppRegExpMatches
            v-if="regexp"
            :text="itemTitleFinal(item.raw)"
            :regexp="regexp"
          />
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
// @ts-expect-error not exported by vuetify
import type { SelectItemKey } from 'vuetify'
import filter from 'lodash-es/filter'
import difference from 'lodash-es/difference'

import { type UnitId, filterByName } from '~/utils/types/units'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()

defineEmits(['update:model-value', 'click:thumbnail'])
const modelUnitId = defineModel<null | UnitId>()
const props = withDefaults(
  defineProps<{
    withoutThumbnail?: boolean
    thumbnailClickable?: boolean
    clearable?: boolean
    itemTitle?: SelectItemKey
    forbiddenIds?: UnitId[]
  }>(),
  {
    withoutThumbnail: false,
    thumbnailClickable: false,
    clearable: false,
    itemTitle: undefined,
    forbiddenIds: () => [],
  },
)

const itemTitleDefault = (item: UnitId) =>
  storeDataUnits.unitsById[item]?.nameForSelect
const itemTitleFinal = computed(() => props.itemTitle || itemTitleDefault)

const localUnitId = ref<UnitId>()
function updateUnit() {
  localUnitId.value = modelUnitId.value || undefined
}
watch(modelUnitId, updateUnit, { immediate: true })
const localUnit = computed(
  () =>
    (localUnitId.value && storeDataUnits.unitsById[localUnitId.value]) ||
    undefined,
)

const searchText = ref('')
const searchIsActive = computed(
  () =>
    searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, hasError, errorMessages } = useSearch(searchText)

const unitIds = computed(() => storeDataUnits.sortedUnitIds)
const availableUnitIds = computed(() =>
  difference(unitIds.value, props.forbiddenIds),
)

const unitIdsFiltered = ref<UnitId[]>([])
const getUnitIdsFiltered = () =>
  regexp.value && searchIsActive.value && storeDataUnits.isLoaded
    ? filter(availableUnitIds.value, (id) =>
        filterByName(storeDataUnits.unitsById[id], regexp.value),
      )
    : []
const updateUnitIdsFiltered = () => {
  unitIdsFiltered.value = getUnitIdsFiltered()
}
const { isUpdating } = useDebounce(updateUnitIdsFiltered, [
  [regexp],
  [availableUnitIds],
])
</script>
