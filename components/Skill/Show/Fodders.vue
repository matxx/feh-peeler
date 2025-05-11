<template>
  <AppRenderOnceWhileActive :active="storeDataSkillsAvailabilities.isLoaded">
    <SkillFodderSorting
      v-if="!hideSorting && sortedFodders.length > 1"
      class="ml-3 mb-3"
    />

    <v-table>
      <thead>
        <tr>
          <th>
            <span v-show="!mobile">
              {{ t('skillsFodders.fodders.unitName') }}
            </span>
          </th>
          <th>
            {{ t('skillsFodders.fodders.availability') }}
          </th>
          <th>
            {{ t('skillsFodders.fodders.unlockAt') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <SkillFodderAvailabilitiesUnit
          v-for="fodder in sortedFodders"
          :key="fodder.id"
          :skill="skill"
          :unit="fodder"
          :tile-size="tileSize"
        />
      </tbody>
    </v-table>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import sortBy from 'lodash-es/sortBy'
import compact from 'lodash-es/compact'

import type { ISkill } from '@/utils/types/skills'

const { t } = useI18n()
const { mobile } = useDisplay()
const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const props = withDefaults(
  defineProps<{
    skill: ISkill
    tileSize: number
    hideSorting?: boolean
  }>(),
  {
    hideSorting: false,
  },
)

const availability = computed(
  () => storeDataSkillsAvailabilities.availabilitiesById[props.skill.baseId],
)
const fodders = computed(() =>
  compact(
    availability.value.fodder_ids.map((id) => storeDataUnits.unitsById[id]),
  ),
)
const sortedFodders = computed(() =>
  sortBy(fodders.value, [
    (unit) =>
      storeGlobals.sortedByAvailability
        ? storeDataUnitsAvailabilities.availabiltySortingVector(unit)
        : 0,
    'nameForSorting',
  ]),
)
</script>
