<template>
  <AppRenderOnceWhileActive :active="storeUnitsAvailabilities.isLoaded">
    <v-table class="text-no-wrap">
      <UnitFodderThead :size="size" />

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
              <a
                :href="storeLinks.skill(skill)"
                target="_blank"
                class="d-flex align-center"
              >
                <SkillImg
                  v-show="SKILL_CATEGORIES_WITH_ICON.includes(category)"
                  :skill="skill"
                  :size="size / 2"
                  class="mr-2"
                />
                {{ skill.name }}
              </a>
            </th>
            <td
              v-for="avail in AVAILABILITIES"
              :key="avail"
              class="text-center"
            >
              <RenderOncePresent
                :item="storeSkillsAvailabilities.availabilitiesById[skill.id]"
              >
                {{
                  skill.is_prf
                    ? undefined
                    : storeSkillsAvailabilities.availabilitiesById[skill.id] &&
                      storeSkillsAvailabilities.availabilitiesById[skill.id]
                        .fodder[avail]
                }}
              </RenderOncePresent>
            </td>
          </tr>
        </template>
      </tbody>

      <AppRenderOnceWhileActive
        :active="storeSkillsAvailabilities.isLoaded"
        tag="tfoot"
      >
        <tr>
          <th />
          <th>
            {{ t('unitsFodder.totals') }}
          </th>
          <td
            v-for="(avail, index) in AVAILABILITIES"
            :key="avail"
            class="text-center"
          >
            {{ totals[avail] }}

            <v-tooltip>
              <template #activator="{ props: tooltipProps }">
                <v-icon
                  v-bind="tooltipProps"
                  :color="totals[avail] <= INHERIT_SLOTS ? 'green' : 'red'"
                >
                  {{
                    totals[avail] <= INHERIT_SLOTS
                      ? 'mdi-check-circle'
                      : 'mdi-close-circle'
                  }}
                </v-icon>
              </template>

              <p>
                <strong
                  v-if="totals[avail] <= INHERIT_SLOTS"
                  class="text-success"
                >
                  {{ t('unitsFodder.allSkillsCanBeInheritedInOneGo') }}
                </strong>
                <strong
                  v-else
                  class="text-error"
                >
                  {{ t('unitsFodder.notAllSkillsCanBeInheritedInOneGo') }}
                </strong>
              </p>
              <p>{{ t('unitsFodder.usingBridgeFodderFrom') }}:</p>
              <ul class="pl-3">
                <li
                  v-for="av in take(AVAILABILITIES, index + 1)"
                  :key="av"
                >
                  {{ t(`unitsFodder.availabilities.${av}`) }}
                </li>
              </ul>
            </v-tooltip>
          </td>
        </tr>
      </AppRenderOnceWhileActive>
    </v-table>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import take from 'lodash-es/take'
import maxBy from 'lodash-es/maxBy'
import sumBy from 'lodash-es/sumBy'
import filter from 'lodash-es/filter'
// import groupBy from 'lodash-es/groupBy'
import isEmpty from 'lodash-es/isEmpty'
import intersection from 'lodash-es/intersection'

import { INHERIT_SLOTS } from '~/utils/constants'
import {
  SKILL_CATEGORIES,
  SKILL_CATEGORIES_WITH_ICON,
  type ISkill,
  type ISkillsByCategory,
} from '~/utils/types/skills'
import { AVAILABILITIES } from '~/utils/types/skills-availabilities'
import type { IUnit } from '~/utils/types/units'
import { objectFromEntries, groupBy } from '~/utils/functions/typeSafe'

const props = defineProps<{
  unit: IUnit
  size: number
}>()
const { t } = useI18n()
const storeSkills = useStoreSkills()
const storeLinks = useStoreLinks()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()
const storeSkillsAvailabilities = useStoreSkillsAvailabilities()

const availability = computed(
  () => storeUnitsAvailabilities.availabilitiesById[props.unit.id],
)
const skills = computed(() =>
  availability.value.skill_ids.map((id) => storeSkills.skillsById[id]),
)
const skillsMaxTier = computed<ISkill[]>(() =>
  filter(
    skills.value,
    (skill) =>
      !skill.upgrade_ids ||
      isEmpty(intersection(skill.upgrade_ids, availability.value.skill_ids)),
  ),
)
const skillsMaxTierByCategory = computed<ISkillsByCategory>(() =>
  groupBy(skillsMaxTier.value, 'category'),
)

const totals = computed(() =>
  objectFromEntries(
    AVAILABILITIES.map((avail) => [
      avail,
      sumBy(
        Object.entries(skillsMaxTierByCategory.value),
        ([_category, skills]) => {
          if (skills.length === 0) return 0

          const skill = maxBy(skills, (skill) => {
            const availability =
              storeSkillsAvailabilities.availabilitiesById[skill.id]
            if (!availability) return 0

            return availability.fodder[avail]
          })
          if (!skill) return 0
          if (skill.is_prf) return 0

          const availability =
            storeSkillsAvailabilities.availabilitiesById[skill.id]
          if (!availability) return 0

          return availability.fodder[avail]
        },
      ),
    ]),
  ),
)
</script>
