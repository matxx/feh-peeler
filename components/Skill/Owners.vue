<template>
  <AppRenderOnceWhileActive :active="storeDataSkillsAvailabilities.isLoaded">
    <SkillOwnersSorting
      v-if="!hideSorting && sortedOwners.length > 1"
      class="ml-3 mb-3"
    />

    <v-table>
      <thead>
        <tr>
          <th class="text-no-wrap">
            {{ t('skillsOwners.owners.unit') }}
          </th>
          <th class="text-no-wrap">
            {{ t('skillsOwners.owners.availability') }}
          </th>
          <th class="text-no-wrap">
            {{ t('skillsOwners.owners.unlockAt') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <SkillOwnersAvailabilitiesUnit
          v-for="owner in sortedOwners"
          :key="owner.id"
          :skill="skill"
          :unit="owner"
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
const owners = computed(() =>
  compact(
    (availability.value.owner_ids || []).map(
      (id) => storeDataUnits.unitsById[id],
    ),
  ),
)
const sortedOwners = computed(() =>
  sortBy(owners.value, [
    (unit) =>
      storeGlobals.sortedByAvailability
        ? storeDataUnitsAvailabilities.availabilitySortingValue(unit)
        : 0,
    'nameForSorting',
  ]),
)
</script>
