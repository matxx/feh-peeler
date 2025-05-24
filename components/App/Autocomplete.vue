<template>
  <v-autocomplete
    v-model="item"
    v-model:search="searchText"
    :loading="isUpdating || !!$attrs.loading"
    autocomplete="off"
    return-object
    :items="itemsFiltered"
    :item-title="itemTitle"
    :item-value="itemValue"
    :menu-props="{
      openOnFocus: false,
      location: 'bottom',
    }"
    hide-details
    :clearable="clearable"
    :custom-filter="() => true"
    :no-data-text="
      hasError
        ? 'global.invalidRegExp'
        : searchIsActive
          ? 'global.nothingIsMatchingYourRequest'
          : 'global.typeAtLeastThreeCharacters'
    "
    :error-messages="errorMessages"
    v-bind="$attrs"
  >
    <template #item="{ props: slotProps, item: slotItem }">
      <v-list-item
        v-bind="slotProps"
        :title="undefined"
      >
        <v-list-item-title>
          <AppRegExpMatches
            v-if="regexp"
            :text="slotItem.raw[itemTitle]"
            :regexp="regexp"
          />
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import filter from 'lodash-es/filter'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

const item = defineModel<T>()
const props = withDefaults(
  defineProps<{
    items: T[]
    itemTitle: string
    itemValue: string
    clearable?: boolean
  }>(),
  {
    clearable: false,
  },
)

const searchText = ref('')
const searchIsActive = computed(
  () =>
    searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, hasError, errorMessages } = useSearch(searchText)

const itemsFiltered = ref<T[]>([])
const getItemsFiltered = () =>
  regexp.value && searchIsActive.value
    ? filter(
        props.items,
        (item) => !!item[props.itemTitle].match(regexp.value!),
      )
    : []
const updateItemsFiltered = () => {
  itemsFiltered.value = getItemsFiltered()
}
const { isUpdating } = useDebounce(updateItemsFiltered, [[regexp]])
</script>
