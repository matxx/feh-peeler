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
            {{ t('skillsFodders.fodders.equippedAt') }}
          </th>
          <th>
            {{ t('skillsFodders.fodders.unlockAt') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <template
          v-for="category in SKILL_CATEGORIES"
          :key="category"
        >
          <tr
            v-for="(skill, index) in skillsByCategory[category]"
            :key="skill.id"
          >
            <th
              v-if="index === 0"
              :rowspan="skillsByCategory[category].length"
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
                @click.prevent="storeGlobals.showSkill(skill.id, TAB_FODDERS)"
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
              <UnitSkillEquippedRarity
                :unit="unit"
                :skill="skill"
                :tile-size="(size * 3) / 4"
              />
            </td>
            <td>
              <UnitSkillUnlockRarity
                :unit="unit"
                :skill="skill"
                :tile-size="(size * 3) / 4"
              />
            </td>
          </tr>
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
  SKILL_CATEGORIES_WITH_ICON,
  TAB_FODDERS,
  type ISkillsByCategory,
} from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'
import { groupBy } from '~/utils/functions/typeSafe'

const props = defineProps<{
  unit: IUnit
  size: number
}>()

const { t } = useI18n()
const storeGlobals = useStoreGlobals()

const storeDataSkills = useStoreDataSkills()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkillsUnits = useStoreDataSkillsUnits()

const availability = computed(
  () => storeDataUnitsAvailabilities.availabilitiesById[props.unit.id],
)
const skills = computed(() =>
  compact(
    availability.value.skill_ids.map((id) => storeDataSkills.skillsById[id]),
  ),
)
const skillsSorted = computed(() =>
  orderBy(skills.value, (skill) =>
    storeDataSkillsUnits.isLoaded
      ? storeDataSkillsUnits.skillsUnitsBySkillId[skill.id].unlock
      : 0,
  ),
)
const skillsByCategory = computed<ISkillsByCategory>(() =>
  groupBy(skillsSorted.value, 'category'),
)
</script>
