<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsAvailabilities.isLoaded">
    <div class="mb-3">
      {{ t('global.inpiredBy') }}
      <!-- eslint-disable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/user/JabPerson/"
        target="_blank"
        class="text-decoration-none"
      >
        @JabPerson</a
      >
      Reddit
      <!-- eslint-enable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/r/FireEmblemHeroes/comments/1gumcdt/can_you_inherit_all_their_fodder_in_one_go/"
        target="_blank"
        class="text-decoration-none"
      >
        {{ t('global.post') }}
      </a>
    </div>

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
              <PlusModalLink
                :to="
                  localePath({
                    name: 'skills-name-tab',
                    params: {
                      name: skill.nameForLink,
                      tab: TAB_FODDERS,
                    },
                  })
                "
                class="d-flex align-center"
              >
                <SkillImg
                  v-show="SKILL_CATEGORIES_WITH_ICON.includes(category)"
                  :skill="skill"
                  :size="size / 2"
                  class="mr-2"
                />
                {{ skill.name }}
              </PlusModalLink>
            </th>
            <td
              v-for="avail in AVAILABILITIES"
              :key="avail"
              class="text-center"
            >
              <AppRenderOncePresent
                v-if="!skill.is_prf"
                :item="
                  storeDataSkillsAvailabilities.availabilitiesById[skill.id]
                "
              >
                <template #default="{ item }">
                  <span
                    v-if="
                      isUnitFiveStarLocked &&
                      !storeDataSkillsAvailabilities.isFiveStarLocked(item) &&
                      category === SKILL_SPECIAL
                    "
                  >
                    ({{ item && item.fodder[avail] }}){{
                      refsStars[REF_SPECIAL]
                    }}
                  </span>
                  <span
                    v-else-if="
                      relevantSkillsMaxTierByCategoryByAv[avail][category] &&
                      relevantSkillsMaxTierByCategoryByAv[avail][category]
                        .id !== skill.id
                    "
                  >
                    ({{ item && item.fodder[avail] }}){{
                      refsStars[REF_MULTIPLE_SKILL]
                    }}
                  </span>
                  <span v-else>
                    {{ item && item.fodder[avail] }}
                  </span>
                </template>
              </AppRenderOncePresent>
            </td>
          </tr>
        </template>
      </tbody>

      <AppRenderOnceWhileActive
        :active="storeDataSkillsAvailabilities.isLoaded"
        tag="tfoot"
      >
        <tr>
          <th />
          <th>{{ t('unitsFodder.totals') }}</th>
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

    <div
      v-if="anyRef"
      class="mt-3"
    >
      <div
        v-for="ref in refsList"
        :key="ref"
      >
        {{ refsStars[ref] }} {{ refsText[ref] }}
      </div>
    </div>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import some from 'lodash-es/some'
import take from 'lodash-es/take'
import sumBy from 'lodash-es/sumBy'
import filter from 'lodash-es/filter'
import values from 'lodash-es/values'
import compact from 'lodash-es/compact'
import isEmpty from 'lodash-es/isEmpty'
import orderBy from 'lodash-es/orderBy'
import intersection from 'lodash-es/intersection'

import { INHERIT_SLOTS } from '~/utils/constants'
import {
  SKILL_CATEGORIES,
  SKILL_CATEGORIES_WITH_ICON,
  SKILL_SPECIAL,
  TAB_FODDERS,
  type ISkill,
  type ISkillsByCategory,
} from '~/utils/types/skills'
import { AVAILABILITIES } from '~/utils/types/skills-availabilities'
import type { IUnit } from '~/utils/types/units'
import {
  objectFromEntries,
  groupBy,
  objectEntries,
} from '~/utils/functions/typeSafe'

const props = defineProps<{
  unit: IUnit
  size: number
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const storeDataSkills = useStoreDataSkills()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const DEFAULT_IS_UNIT_FIVE_STAR_LOCKED = false

const availability = computed(
  () => storeDataUnitsAvailabilities.availabilitiesById[props.unit.id],
)
const isUnitFiveStarLocked = computed(
  () =>
    isEmpty(availability.value.lowest_rarity) || // new units
    storeDataUnitsAvailabilities.isFiveStarLocked(availability.value) ||
    DEFAULT_IS_UNIT_FIVE_STAR_LOCKED,
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
const skillsMaxTierByCategory = computed<ISkillsByCategory>(() =>
  groupBy(skillsMaxTier.value, 'category'),
)

const hasSpecialNotFiveStarLocked = computed(() =>
  some(
    skillsMaxTierByCategory.value[SKILL_SPECIAL],
    (skill) => !storeDataSkillsAvailabilities.isSkillFiveStarLocked(skill),
  ),
)
const hasMultipleSkillsInSameSlots = computed(() =>
  some(
    values(skillsMaxTierByCategory.value).map(
      (skills) => filter(skills, (s) => !s.is_prf).length > 1,
    ),
  ),
)

const relevantSkillsMaxTierByCategoryByAv = computed(() =>
  objectFromEntries(
    AVAILABILITIES.map((avail) => [
      avail,
      objectFromEntries(
        objectEntries(skillsMaxTierByCategory.value).map(
          ([category, skills]) => {
            const skils = orderBy(
              skills,
              [
                'tier',
                (skill) =>
                  storeDataSkillsAvailabilities.requiredInheritSlotsCount(
                    skill,
                    isUnitFiveStarLocked.value,
                    avail,
                  ),
              ],
              ['desc', 'desc'],
            )
            return [category, skils[0]]
          },
        ),
      ),
    ]),
  ),
)

const totals = computed(() =>
  objectFromEntries(
    AVAILABILITIES.map((avail) => [
      avail,
      sumBy(
        values(relevantSkillsMaxTierByCategoryByAv.value[avail]),
        (skill) =>
          skill
            ? storeDataSkillsAvailabilities.requiredInheritSlotsCount(
                skill,
                isUnitFiveStarLocked.value,
                avail,
              )
            : 0,
      ),
    ]),
  ),
)

type Ref = typeof REF_SPECIAL | typeof REF_MULTIPLE_SKILL
type HasRefs = { [key in Ref]: boolean }

const REF_SPECIAL = 'SPECIAL'
const REF_MULTIPLE_SKILL = 'MULTIPLE_SKILL'
const SORTED_REFS: Ref[] = [REF_SPECIAL, REF_MULTIPLE_SKILL]

const refsText = {
  [REF_SPECIAL]: t('unitsFodder.explanationOnSpecial'),
  [REF_MULTIPLE_SKILL]: t('unitsFodder.explanationOnMultipleSkills'),
}

const hasRefs = computed<HasRefs>(() => ({
  [REF_SPECIAL]:
    isUnitFiveStarLocked.value && hasSpecialNotFiveStarLocked.value,
  [REF_MULTIPLE_SKILL]: hasMultipleSkillsInSameSlots.value,
}))
const refsList = computed(() =>
  filter(SORTED_REFS, (ref) => hasRefs.value[ref]),
)
const anyRef = computed(() => refsList.value.length > 0)
const refsStars = computed(() =>
  objectFromEntries(
    refsList.value.map((ref, index) => [ref, '*'.repeat(index + 1)]),
  ),
)
</script>
