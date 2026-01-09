<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsAvailabilities.isLoaded">
    <v-table
      hover
      density="compact"
      class="text-no-wrap"
    >
      <thead>
        <tr>
          <th class="border-b-lg" />
          <th class="border-b-lg">
            {{ t('unitsFodder.skillName') }}
          </th>
          <th class="border-b-lg">
            {{ t('skillsOwners.owners.equippedAt') }}
          </th>
          <th class="border-b-lg">
            {{ t('skillsOwners.owners.unlockAt') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <template
          v-for="category in SKILL_CATEGORIES"
          :key="category"
        >
          <UnitSkillsRow
            v-for="(skill, index) in skillsByCategory[category]"
            :key="skill.id"
            :unit="unit"
            :category="category"
            :category-skills-count="skillsByCategory[category].length"
            :skill="skill"
            :index="index"
            :size="size"
          />
        </template>
      </tbody>
    </v-table>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import compact from 'lodash-es/compact'
import orderBy from 'lodash-es/orderBy'

import {
  SKILL_CATEGORIES,
  type ISkill,
  type SkillCategory,
} from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'
import { groupBy, type GroupedBy } from '~/utils/functions/typeSafe'

const props = defineProps<{
  unit: IUnit
  size: number
}>()

const { t } = useI18n()

const storeDataSkills = useStoreDataSkills()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
// const storeDataSkillsUnits = useStoreDataSkillsUnits()

const availability = computed(
  () => storeDataUnitsAvailabilities.availabilitiesById[props.unit.id],
)
const skills = computed(() =>
  compact(
    availability.value.skill_ids.map((id) => storeDataSkills.skillsById[id]),
  ),
)
const skillsSorted = computed(
  () => orderBy(skills.value, 'tier'),
  // orderBy(skills.value, (skill) =>
  //   storeDataSkillsUnits.isLoaded
  //     ? storeDataSkillsUnits.bySkillIdByUnitId[props.unit.id][skill.id].unlock
  //     : 0,
  // ),
)
const skillsByCategory = computed<GroupedBy<SkillCategory, ISkill>>(() =>
  groupBy(skillsSorted.value, 'category'),
)
</script>
