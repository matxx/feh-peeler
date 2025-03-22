<template>
  <v-autocomplete
    v-model="skill"
    v-model:search="searchText"
    return-object
    :loading="storeSkills.isLoading"
    :items="skillsFiltered"
    item-title="name"
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
    <template #prepend-inner>
      <SkillImgCategory
        :category="skillCategory"
        :size="18"
      />
    </template>
    <template #append>
      <v-btn
        :disabled="!skill"
        :href="skill ? storeLinks.skill(skill) : undefined"
        target="_blank"
        icon="mdi-open-in-new"
        size="x-small"
      />
    </template>
    <template
      v-if="shouldDisplayIconInSelection"
      #selection="{ item }"
    >
      <SkillImg
        :skill="item.raw"
        :size="size"
        class="mx-2"
      />
      {{ item.raw.name }}
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
            :skill="item.raw"
            :size="size"
            class="mr-2"
          />
        </template>
        <v-list-item-title>
          <AppRegExpMatches
            :text="item.raw.name"
            :regexp="regexp"
          />
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter'
import {
  SKILL_CATEGORIES_WITH_ICON,
  type SkillCategory,
  type SkillId,
  type ISkill,
} from '~/utils/types/skills'

import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const storeSkills = useStoreSkills()
const storeLinks = useStoreLinks()
const storeSearches = useStoreSearches()

defineEmits(['update:model-value'])
const skillId = defineModel<null | SkillId>()
const props = withDefaults(
  defineProps<{
    skillCategory?: SkillCategory
    clearable?: boolean
    showIconInSelection?: boolean
    showIconInList?: boolean
    size?: number
  }>(),
  {
    skillCategory: undefined,
    clearable: false,
    showIconInSelection: undefined,
    showIconInList: undefined,
    size: 20,
  },
)

const skill = ref<ISkill | null>(null)
const isInitialized = ref(false)
function updateSkill() {
  skill.value = (skillId.value && storeSkills.skillsById[skillId.value]) || null
}
watch(() => skillId, updateSkill, { immediate: true })
watch(
  () => storeSkills.skillsById,
  () => {
    if (isInitialized.value) return

    isInitialized.value = true
    updateSkill()
  },
)

const shouldDisplayIconInSelection = computed(() => {
  if (props.showIconInSelection !== undefined) return props.showIconInSelection

  return props.skillCategory
    ? SKILL_CATEGORIES_WITH_ICON.includes(props.skillCategory)
    : true
})

const shouldDisplayIconInList = computed(() => {
  if (props.showIconInList !== undefined) return props.showIconInList

  return props.skillCategory
    ? SKILL_CATEGORIES_WITH_ICON.includes(props.skillCategory)
    : true
})

const searchText = ref('')
const regexp = computed(() => storeSearches.filterToRegexp(searchText.value))

const skills = computed(
  () =>
    (props.skillCategory
      ? storeSkills.sortedSkillsByCategory[props.skillCategory]
      : storeSkills.sortedSkills) || [],
)
const skillsFiltered = computed(() =>
  searchText.value && searchText.value.length >= MINIMAL_TEXT_SEARCH_LENGTH
    ? filter(
        skills.value,
        (skill) => !!skill.filterableName.match(regexp.value),
      )
    : [],
)
</script>
