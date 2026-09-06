<!-- when updating this component -->
<!-- make sure those units appear correct -->

<!-- Jesse: Blithe Mercenary [Jesse] - trash unit with trash special to inherit => no note -->
<!-- Cordelia: Knight Paragon [Cordelia] - trash unit with good special to inherit => no note -->
<!-- Micaiah: Of Dawn [E!Micaiah] - premium unit with trash assist => note on assist -->
<!-- Heiðrún: Sisters of Healing [NY!Heiðrún] - premium unit with trash special => note on special -->

<!-- Micaiah: Radiant Queen [L!Micaiah] - double C skill => note on always the same C skill -->
<!-- Xander: Gallant King [L!Xander] - double A skill => note on always the same A skill -->

<!-- Sakura: In Full Bloom [L!Sakura] - special with both notes -->
<!-- Mikoto: Caring Mother [Mikoto] - 2 specials with notes & both notes -->
<!-- Maria: Ritual Sacrifice [F!Maria] - 2 specials - imbue on top -->

<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsAvailabilities.isLoaded">
    <UnitTabFodderSettings />

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
      <UnitTabFodderThead :size="size" />

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
              class="border-b-lg"
            >
              <SkillImgCategory
                :category="category"
                :size="size / 2"
              />
            </th>
            <th
              :class="{
                'border-b-lg':
                  index === skillsMaxTierByCategory[category].length - 1,
              }"
            >
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
            <td
              v-for="avail in storeFodderSettings.fodderAvailabilities"
              :key="avail"
              class="text-center"
              :class="{
                'border-b-lg':
                  index === skillsMaxTierByCategory[category].length - 1,
              }"
            >
              <AppRenderOncePresent
                v-if="!skill.is_prf"
                :item="
                  storeDataSkillsAvailabilities.availabilitiesById[skill.id]
                "
              >
                <template #default="{ item }">
                  <UnitTabFodderCellText
                    v-if="item"
                    :number="
                      storeDataSkillsAvailabilities.requiredInheritSlotsCount(
                        skill,
                        false,
                        avail,
                        storeFodderSettings.fodderAvailabilities,
                      )
                    "
                    :has-note-not-five-star-locked="
                      isUnitFiveStarLocked &&
                      !storeDataSkillsAvailabilities.isFiveStarLocked(item) &&
                      storeDataSkillsAvailabilities.notFiveStarLockedCategories.includes(
                        category,
                      )
                    "
                    :note-text-not-five-star-locked="
                      notFiveStarLockedTextByCategory[category]
                    "
                    :has-note-multiple-skills="
                      relevantSkillIdByCategory[category]
                        ? relevantSkillIdByCategory[category] !== skill.id
                        : false
                    "
                    :note-text-multiple-skills="
                      t('unitsFodder.reasonMultipleSkillsInSameSlot')
                    "
                  />
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
            v-for="(avail, index) in storeFodderSettings.fodderAvailabilities"
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
                  v-for="av in take(
                    storeFodderSettings.fodderAvailabilities,
                    index + 1,
                  )"
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
import sumBy from 'lodash-es/sumBy'
import filter from 'lodash-es/filter'
import values from 'lodash-es/values'
import compact from 'lodash-es/compact'
import isEmpty from 'lodash-es/isEmpty'
import orderBy from 'lodash-es/orderBy'
import mapValues from 'lodash-es/mapValues'
import intersection from 'lodash-es/intersection'

import { INHERIT_SLOTS } from '~/utils/constants'
import {
  SKILL_CATEGORIES,
  SKILL_CATEGORIES_WITH_ICON,
  SKILL_SPECIAL,
  SKILL_ASSIST,
  TAB_OWNERS,
  type ISkill,
  type SkillCategory,
  type SkillId,
} from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'
import {
  groupBy,
  objectEntries,
  objectFromEntries,
  type IndexedBy,
} from '~/utils/functions/typeSafe'

const props = defineProps<{
  unit: IUnit
  size: number
}>()

const { t } = useI18n()
const storeGlobals = useStoreGlobals()
const storeFodderSettings = useStoreFodderSettings()

const notFiveStarLockedTextByCategory: Partial<
  IndexedBy<SkillCategory, string>
> = {
  [SKILL_SPECIAL]: t('unitsFodder.reasonSpecialNotFiveStarLocked'),
  [SKILL_ASSIST]: t('unitsFodder.reasonAssistNotFiveStarLocked'),
}

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
const skillsSorted = computed(() =>
  orderBy(skills.value, ['sortableVersion'], ['asc']),
)
const skillsMaxTier = computed<ISkill[]>(() =>
  filter(
    skillsSorted.value,
    (skill) =>
      !skill.upgrade_ids ||
      isEmpty(intersection(skill.upgrade_ids, availability.value.skill_ids)),
  ),
)
const skillsMaxTierByCategory = computed<IndexedBy<SkillCategory, ISkill[]>>(
  () => groupBy(skillsMaxTier.value, 'category'),
)

const relevantSkillIdByCategory = computed<
  IndexedBy<SkillCategory, SkillId | undefined>
>(() =>
  objectFromEntries(
    objectEntries(skillsMaxTierByCategory.value).map(([category, skills]) => [
      category,
      skills.toReversed()[0].id,
    ]),
  ),
)

const relevantSkillByCategoryByAv = computed(() =>
  objectFromEntries(
    storeFodderSettings.fodderAvailabilities.map((avail) => [
      avail,
      mapValues(relevantSkillIdByCategory.value, (skillId) =>
        skillId ? storeDataSkills.skillsById[skillId] : undefined,
      ),
    ]),
  ),
)

const totals = computed(() =>
  objectFromEntries(
    storeFodderSettings.fodderAvailabilities.map((avail) => [
      avail,
      sumBy(values(relevantSkillByCategoryByAv.value[avail]), (skill) =>
        skill
          ? storeDataSkillsAvailabilities.requiredInheritSlotsCount(
              skill,
              isUnitFiveStarLocked.value,
              avail,
              storeFodderSettings.fodderAvailabilities,
            )
          : 0,
      ),
    ]),
  ),
)
</script>
