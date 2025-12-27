<template>
  <v-autocomplete
    v-model="localSkillId"
    v-model:search="searchText"
    autocomplete="off"
    :loading="isUpdating"
    :items="skillIdsFiltered"
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
          ? 'global.noSkillIsMatchingYourRequest'
          : 'global.typeAtLeastThreeCharacters'
    "
    :error-messages="errorMessages"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event ? $event : null)"
  >
    <template
      v-if="skillCategory"
      #prepend-inner
    >
      <SkillImgCategory
        :category="skillCategory"
        :size="18"
        class="mr-1"
      />
    </template>

    <template
      v-if="localSkill && !withoutThumbnail"
      #append
    >
      <SkillImg
        :skill="localSkill"
        :size="size"
        class="mx-2 cursor-pointer"
        @click.prevent="storeGlobals.showSkill(localSkill.id)"
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
          <SkillImg
            :skill="storeDataSkills.skillsById[item.raw]"
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
import {
  SKILL_CATEGORIES_WITH_ICON,
  type SkillCategory,
  type SkillId,
  filterByName,
} from '~/utils/types/skills'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const storeGlobals = useStoreGlobals()
const storeDataSkills = useStoreDataSkills()
const storeSkillsFilters = useStoreSkillsFilters()

defineEmits(['update:model-value'])
const modelSkillId = defineModel<SkillId>()
const props = withDefaults(
  defineProps<{
    withoutThumbnail?: boolean
    skillCategory?: SkillCategory
    unit?: IUnit
    clearable?: boolean
    size?: number
    itemTitle?: SelectItemKey
  }>(),
  {
    withoutThumbnail: false,
    skillCategory: undefined,
    unit: undefined,
    clearable: false,
    size: 20,
    itemTitle: undefined,
  },
)

const itemTitleDefault = (item: SkillId) =>
  storeDataSkills.skillsById[item]?.name
const itemTitleFinal = computed(() => props.itemTitle || itemTitleDefault)

const localSkillId = ref<SkillId>()
function updateSkill() {
  localSkillId.value = modelSkillId.value || undefined
}
watch(modelSkillId, updateSkill, { immediate: true })
const localSkill = computed(
  () =>
    (localSkillId.value && storeDataSkills.skillsById[localSkillId.value]) ||
    undefined,
)

const shouldDisplayIconInList = computed(() => {
  return props.skillCategory
    ? SKILL_CATEGORIES_WITH_ICON.includes(props.skillCategory)
    : true
})

const searchText = ref('')
const searchIsActive = computed(
  () =>
    searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, hasError, errorMessages } = useSearch(searchText)

const skillIds = computed(
  () =>
    (props.skillCategory
      ? storeDataSkills.sortedSkillIdsByCategory[props.skillCategory]
      : storeDataSkills.sortedSkillIds) || [],
)
const skillIdsAvailable = computed(() =>
  props.unit
    ? filter(skillIds.value, (skillId) =>
        storeSkillsFilters.isSkillIdAvailableToUnit(skillId, props.unit!),
      )
    : skillIds.value,
)

const skillIdsFiltered = ref<SkillId[]>([])
const getSkillIdsFiltered = () =>
  regexp.value && searchIsActive.value
    ? filter(skillIdsAvailable.value, (skillId) =>
        filterByName(storeDataSkills.skillsById[skillId], regexp.value),
      )
    : []
const updateSkillIdsFiltered = () => {
  skillIdsFiltered.value = getSkillIdsFiltered()
}
const { isUpdating } = useDebounce(updateSkillIdsFiltered, [
  [regexp],
  [skillIdsAvailable],
])
</script>
