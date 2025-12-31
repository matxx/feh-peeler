<template>
  <v-autocomplete
    v-model="localSealId"
    v-model:search="searchText"
    autocomplete="off"
    :loading="isUpdating"
    :items="sealIdsFiltered"
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
          ? 'global.noSealIsMatchingYourRequest'
          : 'global.typeAtLeastThreeCharacters'
    "
    :error-messages="errorMessages"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template
      v-if="prependCategory"
      #prepend-inner
    >
      <SkillImgCategory
        :category="SKILL_PASSIVE_S"
        :size="18"
        class="mr-1"
      />
    </template>

    <template
      v-if="localSeal && !withoutThumbnail"
      #append
    >
      <SealImg
        :seal="localSeal"
        :size="size"
        class="mx-2 cursor-pointer"
        @click.prevent="storeGlobals.showSeal(localSeal.id)"
      />
    </template>

    <template #item="{ props: slotProps, item }">
      <v-list-item
        v-bind="slotProps"
        :title="undefined"
      >
        <template
          v-if="shouldDisplayIconInList"
          #prepend
        >
          <SealImg
            :seal="storeDataSeals.sealsById[item.raw]"
            :size="size"
            class="mr-2"
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

import type { IUnit } from '~/utils/types/units'
import { type SealId, filterByName } from '~/utils/types/seals'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'
import { SKILL_PASSIVE_S } from '~/utils/types/skills'

const storeGlobals = useStoreGlobals()
const storeDataSeals = useStoreDataSeals()
const storeSkillsFilters = useStoreSkillsFilters()

defineEmits(['update:model-value'])
const modelSealId = defineModel<SealId>()
const props = withDefaults(
  defineProps<{
    withoutThumbnail?: boolean
    prependCategory?: boolean
    unit?: IUnit
    clearable?: boolean
    size?: number
    itemTitle?: SelectItemKey
  }>(),
  {
    withoutThumbnail: false,
    prependCategory: false,
    unit: undefined,
    clearable: false,
    size: 20,
    itemTitle: undefined,
  },
)

const itemTitleDefault = (item: SealId) =>
  storeDataSeals.sealsById[item]?.nameForSelect
const itemTitleFinal = computed(() => props.itemTitle || itemTitleDefault)

const localSealId = ref<SealId>()
function updateSeal() {
  localSealId.value = modelSealId.value || undefined
}
watch(modelSealId, updateSeal, { immediate: true })
const localSeal = computed(
  () =>
    (localSealId.value && storeDataSeals.sealsById[localSealId.value]) ||
    undefined,
)

const shouldDisplayIconInList = computed(() => true)

const searchText = ref('')
const searchIsActive = computed(
  () =>
    searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, hasError, errorMessages } = useSearch(searchText)

const sealIds = computed(() => storeDataSeals.sortedSealIds)
const sealIdsAvailable = computed(() =>
  props.unit
    ? filter(sealIds.value, (id) =>
        storeSkillsFilters.isSealIdAvailableToUnit(id, props.unit!),
      )
    : sealIds.value,
)

const sealIdsFiltered = ref<SealId[]>([])
const getSealIdsFiltered = () =>
  regexp.value && searchIsActive.value && storeDataSeals.isLoaded
    ? filter(sealIdsAvailable.value, (id) =>
        filterByName(storeDataSeals.sealsById[id], regexp.value),
      )
    : []
const updateSealIdsFiltered = () => {
  sealIdsFiltered.value = getSealIdsFiltered()
}
const { isUpdating } = useDebounce(updateSealIdsFiltered, [
  [regexp],
  [sealIdsAvailable],
])
</script>
