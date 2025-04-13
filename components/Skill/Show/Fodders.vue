<template>
  <AppRenderOnceWhileActive :active="storeDataSkillsAvailabilities.isLoaded">
    <v-table>
      <thead>
        <tr>
          <th>
            {{ t('skillsFodders.fodders.unitName') }}
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
const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

const props = defineProps<{
  skill: ISkill
  tileSize: number
}>()

const availability = computed(
  () => storeDataSkillsAvailabilities.availabilitiesById[props.skill.id],
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
