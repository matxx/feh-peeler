<template>
  <v-card>
    <v-tabs
      v-model="tabSelected"
      bg-color="primary"
    >
      <v-tab
        v-for="tab in SKILL_CATEGORIES_FOR_HALL_OF_FORMS"
        :key="tab"
        :value="tab"
        :min-width="60"
      >
        <SkillImgCategory
          :category="tab"
          :size="26"
          class="mr-1"
        />
        <span v-show="!mobile">
          {{ t(`skillsList.tabs.${tab}`) }}
        </span>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tabSelected">
      <v-tabs-window-item
        v-for="tab in SKILL_CATEGORIES_FOR_HALL_OF_FORMS"
        :key="tab"
        :value="tab"
      >
        <ListSkills
          v-if="filters"
          v-model="filters[tab]"
          :regexps="regexps"
          :error-messages="errorMessages"
          :category="tab"
          :filters-count="2"
          :filters-on-new-lines="mobile"
          can-clear-all
          :highlighted-skill="highlightedSkill"
          can-equip-skill
          :show-descriptions="showDescriptions"
          @equip="$emit('equip', { skillCategory: tab, skill: $event })"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import type { IUnitInstance } from '~/utils/types/units'
import type { FiltersBySkillCategory } from '~/utils/functions/skillLists'
import {
  SKILL_CATEGORIES_FOR_HALL_OF_FORMS,
  type SkillCategory,
} from '~/utils/types/skills'

const { t } = useI18n()
const { mobile } = useDisplay()
const storeSkills = useStoreSkills()

defineEmits(['equip'])
const props = withDefaults(
  defineProps<{
    selectedUnitInstance: null | IUnitInstance
    regexps: RegExpsBySkillCategory
    errorMessages: ErrorMessagesBySkillCategory
    showDescriptions?: boolean
  }>(),
  { showDescriptions: false },
)
const filters = defineModel<FiltersBySkillCategory>('filters')
const tabSelected = defineModel<SkillCategory>('tabSelected')

const highlightedSkillId = computed(
  () =>
    props.selectedUnitInstance &&
    tabSelected.value &&
    props.selectedUnitInstance.skillIds[tabSelected.value],
)
const highlightedSkill = computed(() =>
  tabSelected.value && highlightedSkillId.value
    ? storeSkills.skillsById[highlightedSkillId.value]
    : undefined,
)

watch(tabSelected, () => {
  if (!filters.value) return
  if (!tabSelected.value) return

  filters.value[tabSelected.value] = ['', '']
})
</script>
