<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title class="pa-0 flex-grow-1">
      <v-card
        color="primary"
        tile
      >
        <v-card-title>
          <AppSelectUnit
            :disabled="disabled"
            :model-value="unitInstance.id"
            without-thumbnail
            clearable
            class="mb-2"
            :label="t('scoreCalc.labels.unit', { index: index + 1 })"
            @update:model-value="$emit('select-unit', $event)"
          />
        </v-card-title>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="d-flex flex-column">
            <v-card-title>
              {{ t('scoreCalc.headers.score') }}: {{ unit ? score : 0 }}
            </v-card-title>

            <v-card-subtitle>
              {{ t('scoreCalc.headers.bst') }}: {{ bst }}
              <span
                v-if="visibleBst !== bst"
                v-tooltip="t('scoreCalc.headers.visibleBst')"
              >
                ({{ visibleBst }})
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

            <v-spacer />

            <v-card-actions>
              <v-btn
                :disabled="!unit"
                class="ms-2"
                size="small"
                :text="t('scoreCalc.cta.loadMaxScore')"
                variant="outlined"
                @click="loadMaxScore"
              />
            </v-card-actions>
          </div>

          <div :style="{ height: '175px' }">
            <CompoUnitThumbnail
              v-if="unit"
              :unit="unit"
              :size="THUMBNAIL_SIZE"
              :size-corner="40"
              :margin="20"
              :margin-icon="-10"
              class="cursor-pointer"
              @click="storeGlobals.showUnit(unit.id)"
            />
            <v-sheet
              v-else
              class="ma-5 d-flex justify-center align-center"
              tile
              :height="THUMBNAIL_SIZE"
              :width="THUMBNAIL_SIZE"
              color="transparent"
            >
              <v-icon size="100">mdi-account-question</v-icon>
            </v-sheet>
          </div>
        </div>
      </v-card>
    </v-card-title>

    <v-card-text class="fill-height d-flex flex-column pt-3">
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
                    updateUnit('rarity', $event)
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
                    updateUnit('level', $event)
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
                :disabled="disabled"
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
                    updateUnit('merges', $event)
                    handleChange($event)
                  }
                "
              />
            </VeeField>
          </v-col>

          <v-col cols="6">
            <v-select
              :disabled="disabled"
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
              :disabled="disabled"
              :model-value="unitInstance.bane"
              :items="itemsForStats"
              clearable
              density="compact"
              hide-details
              :label="t('scoreCalc.labels.bane')"
              @update:model-value="updateUnit('bane', $event)"
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
                :available-sp-for-seals="spsAvailableForSeals"
                @select-skill="$emit('select-skill', $event)"
                @select-sp="$emit('select-sp', $event)"
              />
            </v-col>
          </v-row>
        </v-container>
      </AppRenderOnceWhileActive>

      <v-container
        fluid
        class="pa-0"
      >
        <v-row dense>
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
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import uniq from 'lodash-es/uniq'
import filter from 'lodash-es/filter'
import orderBy from 'lodash-es/orderBy'

import {
  getEmptyUnitInstanceSkillSPs,
  MAX_LEVEL,
  MAX_RARITY,
  MAX_MERGES,
  DUEL_SKILL_IDS_BY_MOVE_BY_COLOR,
  SEAL_ID_DC_MELEE,
  SEAL_ID_DC_DRAGON,
  SEAL_MAX_SP,
  SEAL_OTHER_THAN_DC_MAX_SP,
  type IUnitInstanceInScoreCalc,
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
  SKILL_PASSIVE_S,
} from '~/utils/types/skills'
import {
  WEAPON_A_BR,
  WEAPON_A_ME,
  WEAPON_COLOR_FOR_TYPE,
  WEAPON_FAMILY_FOR_TYPE,
} from '~/utils/types/weapons'

const THUMBNAIL_SIZE = 125

const emit = defineEmits([
  'select-unit',
  'update-unit',
  'replace-unit',
  'select-skill',
  'select-sp',
])
const props = withDefaults(
  defineProps<{
    unitInstance: IUnitInstanceInScoreCalc
    index: number
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
  },
)

const { t } = useI18n()
const { itemsForStats, itemsForElements } = useSelects()
const {
  unit,
  // stats,
  bst,
  visibleBst,
  totalSkillSPs,
  score,
  superBoons,
  hasAccessToDuelSkill,
  needsDuelSkill,
} = useScoreData(toRef(props, 'unitInstance'))

const storeGlobals = useStoreGlobals()
const storeDataSeals = useStoreDataSeals()
const storeDataSkills = useStoreDataSkills()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()
const storeSkillsFilters = useStoreSkillsFilters()

const isLoaded = computed(
  () =>
    storeDataSkills.isLoaded &&
    storeDataSeals.isLoaded &&
    storeDataSkillsAvailabilities.isLoaded,
)

const disabled = false
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
    blessing: null,
  }

  SORTED_SKILL_CATEGORIES.forEach((category) => {
    if (category === SKILL_PASSIVE_S) {
      const weaponFamily = WEAPON_FAMILY_FOR_TYPE[unit.value!.weapon_type]
      switch (weaponFamily) {
        case WEAPON_A_ME:
          newUnitInstance.skillIds[category] = SEAL_ID_DC_MELEE
          newUnitInstance.skillSPs[category] = SEAL_MAX_SP
          break
        case WEAPON_A_BR:
          newUnitInstance.skillIds[category] = SEAL_ID_DC_DRAGON
          newUnitInstance.skillSPs[category] = SEAL_MAX_SP
          break
        default:
          newUnitInstance.skillSPs[category] = SEAL_OTHER_THAN_DC_MAX_SP
      }
      return
    }

    const sp = spsAvailableByCategory.value[category][0]
    newUnitInstance.skillSPs[category] = sp

    const relevantSkills = filter(
      skillIdsAvailableByCategory.value[category],
      (id) => storeDataSkills.skillsById[id].sp === sp,
    )
    if (relevantSkills.length === 1) {
      newUnitInstance.skillIds[category] = relevantSkills[0]
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
const skillIdsAvailableByCategory = computed<GroupedBy<SkillId, SkillCategory>>(
  () =>
    groupByFunc(
      skillIdsAvailable.value,
      (id) => storeDataSkills.skillsById[id].category,
    ),
)
const spsAvailableByCategory = computed<GroupedBy<number, SkillCategory>>(() =>
  objectFromEntries(
    objectEntries(skillIdsAvailableByCategory.value).map(([category, ids]) => [
      category,
      orderBy(
        uniq(ids.map((id) => storeDataSkills.skillsById[id].sp)),
        [(i) => i],
        ['desc'],
      ),
    ]),
  ),
)

const sealIds = computed(() => storeDataSeals.sortedSealIds)
const sealIdsAvailable = computed(() =>
  unit.value && isLoaded.value
    ? filter(sealIds.value, (sealId) =>
        storeSkillsFilters.isSealIdAvailableToUnit(sealId, unit.value!),
      )
    : sealIds.value,
)
const spsAvailableForSeals = computed(() =>
  orderBy(
    uniq(sealIdsAvailable.value.map((id) => storeDataSeals.sealsById[id].sp)),
    [(i) => i],
    ['desc'],
  ),
)
</script>
