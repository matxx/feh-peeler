<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsAvailabilities.isLoaded">
    <v-table class="text-no-wrap">
      <thead>
        <tr>
          <th />
          <th>
            {{ t('unitsFodder.skillName') }}
          </th>
          <th>
            {{ t('unitsFodder.availability') }}
          </th>
          <th>
            {{ t('unitsFodder.preInheritance') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <template
          v-for="category in SKILL_CATEGORIES"
          :key="category"
        >
          <tr
            v-for="(skill, index) in skillsMaxTierByCategory[category]"
            :key="skill.id"
          >
            <th
              v-if="index === 0"
              :rowspan="skillsMaxTierByCategory[category].length"
            >
              <SkillImgCategory
                :category="category"
                :size="size / 2"
              />
            </th>
            <th>
              <NuxtLink
                class="d-flex align-center"
                href="#"
                @click.prevent="storeGlobals.showSkill(skill.id, TAB_OWNERS)"
              >
                <SkillImg
                  v-show="SKILL_CATEGORIES_WITH_ICON.includes(category)"
                  :skill="skill"
                  :size="size / 2"
                  class="mr-2"
                />
                {{ skill.name }}
              </NuxtLink>
            </th>
            <td>
              <SkillAvailability
                v-if="!skill.is_prf"
                :skill="skill"
                :tile-size="size"
              />
            </td>
            <td>
              <SkillOwnersPreInheritances
                v-if="!skill.is_prf"
                :skill="skill"
                :tile-size="size"
                :skill-icon-size="size"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter'
import compact from 'lodash-es/compact'
import isEmpty from 'lodash-es/isEmpty'
import intersection from 'lodash-es/intersection'

import {
  SKILL_CATEGORIES,
  SKILL_CATEGORIES_WITH_ICON,
  TAB_OWNERS,
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
const storeGlobals = useStoreGlobals()

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
const skillsMaxTierByCategory = computed<GroupedBy<SkillCategory, ISkill>>(() =>
  groupBy(skillsMaxTier.value, 'category'),
)
</script>
