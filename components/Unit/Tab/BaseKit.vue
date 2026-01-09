<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsAvailabilities.isLoaded">
    <SkillCardDescription
      v-for="skill in skillsDisplayed"
      :key="skill.id"
      :skill="skill"
      :size="size"
    />
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter'
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'
import flatMap from 'lodash-es/flatMap'
import isEmpty from 'lodash-es/isEmpty'
import intersection from 'lodash-es/intersection'

import {
  SKILL_WEAPON,
  SORTED_SLOT_INDEXES,
  type ISkill,
} from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

const props = defineProps<{
  unit: IUnit
  size: number
}>()

const storeDataSkills = useStoreDataSkills()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()

const availability = computed(
  () => storeDataUnitsAvailabilities.availabilitiesById[props.unit.id],
)

const skills = computed(() =>
  compact(
    availability.value.skill_ids.map((id) => storeDataSkills.skillsById[id]),
  ),
)
const skillsMaxTier = computed<ISkill[]>(() =>
  filter(
    skills.value,
    (skill) =>
      !skill.upgrade_ids ||
      isEmpty(intersection(skill.upgrade_ids, availability.value.skill_ids)),
  ),
)
const skillsMaxTierSorted = computed<ISkill[]>(() =>
  sortBy(skillsMaxTier.value, (skill) => SORTED_SLOT_INDEXES[skill.category]),
)
const skillsDisplayed = computed<ISkill[]>(() =>
  flatMap(skillsMaxTierSorted.value, (skill) => {
    if (skill.category !== SKILL_WEAPON) return [skill]

    return storeDataSkills.refinesByBaseId[skill.id] || [skill]
  }),
)
</script>
