<template>
  <v-autocomplete
    v-model="unit"
    v-model:search="searchText"
    return-object
    :loading="storeUnits.isLoading"
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
    no-data-text="global.typeAtLeastThreeCharacters"
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

    <template #append>
      <CompoUnitThumbnail
        v-if="thumbnailAtEnd && unit"
        :unit="unit"
        :size="25"
        :size-corner="10"
        :margin="5"
        :margin-icon="-5"
        class="mr-5"
        :class="{ 'cursor-pointer': thumbnailClickable }"
        @click="$emit('click:thumbnail')"
      />

      <v-btn
        :disabled="!unit"
        :href="unit ? storeLinks.unit(unit) : undefined"
        target="_blank"
        icon="mdi-open-in-new"
        size="x-small"
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
            :text="item.raw.full_name"
            :regexp="regexp"
          />
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { filter } from 'lodash-es'
import type { UnitId, IUnit } from '~/utils/types/units'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const storeUnits = useStoreUnits()
const storeLinks = useStoreLinks()
const storeSearches = useStoreSearches()

defineEmits(['update:model-value', 'click:thumbnail'])
const unitId = defineModel<null | UnitId>()
withDefaults(
  defineProps<{
    thumbnailAtEnd?: boolean
    thumbnailClickable?: boolean
    clearable?: boolean
  }>(),
  {
    thumbnailAtEnd: false,
    thumbnailClickable: false,
    clearable: false,
  },
)

const unit = ref<IUnit | null>(null)
const isInitialized = ref(false)
function updateUnit() {
  unit.value = (unitId.value && storeUnits.unitsById[unitId.value]) || null
}
watch(() => unitId, updateUnit, { immediate: true })
watch(
  () => storeUnits.isLoaded,
  () => {
    if (isInitialized.value) return

    isInitialized.value = true
    updateUnit()
  },
)

const searchText = ref('')
const regexp = computed(() => storeSearches.filterToRegexp(searchText.value))

const units = computed(() => storeUnits.sortedUnits)
const unitsFiltered = computed(() =>
  searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH
    ? filter(units.value, (unit) => !!unit.filterableName.match(regexp.value))
    : [],
)
</script>
