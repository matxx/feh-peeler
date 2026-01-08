<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title class="pa-0 flex-grow-1">
      <v-card
        color="primary"
        tile
      >
        <v-card-title>
          <AppSelectUnit
            :model-value="unitInstance.id"
            without-thumbnail
            clearable
            class="mb-2"
            :label="t('scoreCalc.labels.unit', { index: index + 1 })"
            @update:model-value="$emit('select-unit', $event)"
          />
        </v-card-title>
        <v-card-text class="pb-0">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div class="d-flex flex-column">
              <v-card-title>
                {{ t('scoreCalc.headers.score') }}: {{ finalScore }}
              </v-card-title>

              <v-card-subtitle>
                {{ t('scoreCalc.headers.bst') }}: {{ bst }}

                <span
                  v-if="visibleBst !== bst"
                  v-tooltip:bottom="t('scoreCalc.tooltips.visibleBst')"
                >
                  ({{ visibleBst }})<!--
                --><sup>
                    <v-icon size="x-small">mdi-information-outline</v-icon>
                  </sup>
                </span>
              </v-card-subtitle>
              <v-card-subtitle>
                {{ t('scoreCalc.headers.totalSP') }}: {{ totalSkillSPs }}
              </v-card-subtitle>

              <!-- <DevOnly>
              <v-card-subtitle
                v-for="stat in STATS"
                :key="stat"
              >
                {{ t(`global.stats.${stat}`) }}: {{ stats[stat] }}
              </v-card-subtitle>
            </DevOnly> -->
            </div>

            <div style="height: 100px">
              <CompoUnitThumbnail
                v-if="unit"
                :unit="unit"
                :blessing="unitInstance.blessing"
                :size="THUMBNAIL_SIZE"
                :size-corner="25"
                :margin="12"
                :margin-icon="-9"
                class="cursor-pointer"
                @click="storeGlobals.showUnit(unit.id)"
              />
              <v-sheet
                v-else
                class="ma-3 d-flex justify-center align-center"
                tile
                :height="THUMBNAIL_SIZE"
                :width="THUMBNAIL_SIZE"
                color="transparent"
              >
                <v-icon :size="THUMBNAIL_SIZE">mdi-account-question</v-icon>
              </v-sheet>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-show="isClosable"
            size="small"
            variant="outlined"
            @click="$emit('toggle-details')"
          >
            {{ t('scoreCalc.cta.details') }}
            <v-icon
              class="ml-1"
              right
              :icon="
                isClosed
                  ? 'mdi-plus-circle-outline'
                  : 'mdi-minus-circle-outline'
              "
            />
          </v-btn>

          <v-spacer v-show="isClosable" />

          <v-btn
            :disabled="!unit"
            size="small"
            :text="t('scoreCalc.cta.loadMaxScore')"
            variant="outlined"
            @click="loadMaxScore"
          />
        </v-card-actions>
      </v-card>
    </v-card-title>

    <v-card-text
      class="fill-height flex-column pt-3"
      :class="{
        'd-none': isClosed && isClosable,
        'd-flex': !isClosed || !isClosable,
      }"
    >
      <v-overlay
        :model-value="isLoading"
        contained
        class="align-center justify-center"
      >
        <v-progress-circular
          color="primary"
          indeterminate
        />
      </v-overlay>

      <v-container
        fluid
        class="pa-0"
      >
        <v-row dense>
          <v-col cols="4">
            <VeeField
              v-slot="{ handleChange, errors }"
              :value="unitInstance.rarity"
              name="rarity"
            >
              <v-text-field
                :model-value="unitInstance.rarity"
                disabled
                required
                type="number"
                step="1"
                min="1"
                max="5"
                pattern="[0-9]+"
                density="compact"
                hide-details
                :label="t('scoreCalc.labels.rarity')"
                :error-messages="errors"
                @update:model-value="
                  ($event) => {
                    updateUnit('rarity', parseInt($event, 10))
                    handleChange($event)
                  }
                "
              />
            </VeeField>
          </v-col>
          <v-col cols="4">
            <VeeField
              v-slot="{ handleChange, errors }"
              :value="unitInstance.level"
              name="level"
            >
              <v-text-field
                :model-value="unitInstance.level"
                disabled
                required
                type="number"
                step="1"
                min="1"
                max="40"
                pattern="[0-9]+"
                density="compact"
                hide-details
                :label="t('scoreCalc.labels.level')"
                :error-messages="errors"
                @update:model-value="
                  ($event) => {
                    updateUnit('level', parseInt($event, 10))
                    handleChange($event)
                  }
                "
              />
            </VeeField>
          </v-col>
          <v-col cols="4">
            <VeeField
              v-slot="{ handleChange, errors }"
              :value="unitInstance.merges"
              name="merges"
            >
              <v-text-field
                :model-value="unitInstance.merges"
                :disabled="unit?.is_story"
                required
                type="number"
                step="1"
                min="0"
                max="10"
                pattern="[0-9]+"
                density="compact"
                hide-details
                :label="t('scoreCalc.labels.merges')"
                :error-messages="errors"
                @update:model-value="
                  ($event) => {
                    updateUnit('merges', parseInt($event, 10))
                    handleChange($event)
                  }
                "
              />
            </VeeField>
          </v-col>

          <v-col cols="6">
            <v-select
              :model-value="unitInstance.boon"
              :items="itemsForStats"
              clearable
              density="compact"
              hide-details
              :label="t('scoreCalc.labels.boon')"
              @update:model-value="updateUnit('boon', $event)"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              :model-value="unitInstance.bane"
              :items="itemsForStats"
              clearable
              density="compact"
              hide-details
              :label="t('scoreCalc.labels.bane')"
              @update:model-value="updateUnit('bane', $event)"
            />
          </v-col>

          <v-col cols="12">
            <v-select
              :disabled="isBlessingDisabled"
              :model-value="unitInstance.blessing"
              :items="itemsForElements"
              clearable
              density="compact"
              hide-details
              :label="t('scoreCalc.labels.blessing')"
              @update:model-value="updateUnit('blessing', $event)"
            />
          </v-col>
        </v-row>
      </v-container>

      <AppRenderOnceWhileActive :active="isLoaded">
        <v-container
          fluid
          class="mt-2 pa-0"
        >
          <v-row no-gutters>
            <v-col
              v-for="category in SKILL_CATEGORIES_FOR_SCORE_CALC"
              :key="category"
              cols="12"
            >
              <ScoreCalcUnitCardSkill
                :category="category"
                :unit="unit"
                :unit-instance="unitInstance"
                :available-sp="spsAvailableByCategory[category]"
                @select-skill="$emit('select-skill', $event)"
                @select-sp="$emit('select-sp', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </AppRenderOnceWhileActive>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import max from 'lodash-es/max'
import uniq from 'lodash-es/uniq'
import filter from 'lodash-es/filter'
import compact from 'lodash-es/compact'
import orderBy from 'lodash-es/orderBy'

import {
  getEmptyUnitInstanceSkillSPs,
  MAX_LEVEL,
  MAX_RARITY,
  MAX_MERGES,
  DUEL_SKILL_IDS_BY_MOVE_BY_COLOR,
  type IUnitInstanceInScoreCalc,
  type ScoreContext,
} from '~/utils/types/score-calc'
import { getEmptyUnitInstanceSkillIds } from '~/utils/types/units'
// import { STATS } from '~/utils/types/units-stats'
import {
  objectEntries,
  objectFromEntries,
  groupByFunc,
  type GroupedBy,
} from '~/utils/functions/typeSafe'
import {
  type SkillId,
  type SkillCategory,
  SORTED_SKILL_CATEGORIES,
  SKILL_CATEGORIES_FOR_SCORE_CALC,
  SKILL_PASSIVE_A,
} from '~/utils/types/skills'
import { WEAPON_COLOR_FOR_TYPE } from '~/utils/types/weapons'

const THUMBNAIL_SIZE = 70

const emit = defineEmits([
  'select-unit',
  'update-unit',
  'replace-unit',
  'select-skill',
  'select-sp',
  'update-score',
  'toggle-details',
])
const props = withDefaults(
  defineProps<{
    scoreContext: ScoreContext
    unitInstance: IUnitInstanceInScoreCalc
    index: number
    isLoading?: boolean
    isClosed?: boolean
  }>(),
  {
    isLoading: false,
    isClosed: false,
  },
)

const { t } = useI18n()
const { smAndDown } = useDisplay()
const { itemsForStats, itemsForElements } = useSelects()
const {
  unit,
  // stats,
  bst,
  visibleBst,
  totalSkillSPs,

  // for debug
  // scorePartRarity,
  // scorePartLevel,
  // scorePartMerges,
  // scorePartSPs,
  // scorePartBST,
  // scorePartBlessing,

  baseScore,
  finalScore,
  superBoons,
  hasAccessToDuelSkill,
  needsDuelSkill,
} = useUnitScore(toRef(props, 'unitInstance'), toRef(props, 'scoreContext'))
watch(baseScore, () => {
  emit('update-score', baseScore.value)
})

const storeGlobals = useStoreGlobals()
const storeDataSkills = useStoreDataSkills()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()
const storeSkillsFilters = useStoreSkillsFilters()

const isLoaded = computed(
  () => storeDataSkills.isLoaded && storeDataSkillsAvailabilities.isLoaded,
)

const isClosable = computed(() => smAndDown.value)
const isBlessingDisabled = computed(() => !unit.value || !!unit.value.element)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateUnit(key: keyof IUnitInstanceInScoreCalc, value: any) {
  emit('update-unit', { key, value })
}

function loadMaxScore() {
  if (!unit.value) return

  const newUnitInstance: IUnitInstanceInScoreCalc = {
    id: props.unitInstance.id,

    skillIds: getEmptyUnitInstanceSkillIds(),
    skillSPs: getEmptyUnitInstanceSkillSPs(),

    level: MAX_LEVEL,
    rarity: MAX_RARITY,
    merges: unit.value.is_story ? 0 : MAX_MERGES,
    boon: superBoons.value[0],
    bane: null,
    blessing: props.unitInstance.blessing || unit.value.element || null,
  }

  SORTED_SKILL_CATEGORIES.forEach((category) => {
    const sp = spsAvailableByCategory.value[category][0]
    newUnitInstance.skillSPs[category] = sp

    const relevantSkillIds = filter(
      skillIdsAvailableByCategory.value[category],
      (id) => {
        const skill = storeDataSkills.skillsById[id]

        // upgrades have same or higher SPs
        if (skill.upgrade_ids) return false

        // refines have same or higher SPs
        if (skill.has_refine && storeDataSkills.refinesByBaseId[id]) {
          return false
        }

        return max(compact([skill.sp, skill.refines_max_sp])) === sp
      },
    )
    if (relevantSkillIds.length === 1) {
      newUnitInstance.skillIds[category] = relevantSkillIds[0]
      return
    }

    const relevantSkillIds2 = filter(relevantSkillIds, (id) => {
      const skill = storeDataSkills.skillsById[id]

      return !skill.upgrade_ids && !!skill.is_prf
    })
    if (relevantSkillIds2.length === 1) {
      newUnitInstance.skillIds[category] = relevantSkillIds2[0]
    }
  })

  if (hasAccessToDuelSkill.value && needsDuelSkill.value) {
    const color = WEAPON_COLOR_FOR_TYPE[unit.value.weapon_type]
    const move = unit.value.move_type
    // @ts-expect-error move type "armor" is excluded by `hasAccessToDuelSkill`
    const skillIds = DUEL_SKILL_IDS_BY_MOVE_BY_COLOR[color][move] || []
    newUnitInstance.skillIds[SKILL_PASSIVE_A] = skillIds[3]
  }

  emit('replace-unit', newUnitInstance)
}

const skillIds = computed(() => storeDataSkills.sortedSkillIds)
const skillIdsAvailable = computed(() =>
  unit.value && isLoaded.value
    ? filter(skillIds.value, (skillId) =>
        storeSkillsFilters.isSkillIdAvailableToUnit(skillId, unit.value!),
      )
    : skillIds.value,
)
const skillIdsAvailableByCategory = computed<GroupedBy<SkillCategory, SkillId>>(
  () =>
    groupByFunc(
      skillIdsAvailable.value,
      (id) => storeDataSkills.skillsById[id].category,
    ),
)
const spsAvailableByCategory = computed<GroupedBy<SkillCategory, number>>(() =>
  objectFromEntries(
    objectEntries(skillIdsAvailableByCategory.value).map(([category, ids]) => [
      category,
      orderBy(
        uniq(
          ids.map((id) => {
            const skill = storeDataSkills.skillsById[id]
            return max(compact([skill.sp, skill.refines_max_sp])) || 0
          }),
        ),
        [(i) => i],
        ['desc'],
      ),
    ]),
  ),
)
</script>
