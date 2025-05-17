<template>
  <div v-if="skill.is_prf">
    <v-icon
      v-tooltip="t('global.exclusiveSkill')"
      :size="size"
      class="text-error"
    >
      mdi-cancel
    </v-icon>
  </div>
  <div
    v-else-if="skill.restrictions.moves.none && skill.restrictions.weapons.none"
  >
    {{ t('global.all') }}
  </div>
  <div
    v-else
    class="d-flex"
  >
    <div
      v-if="!skill.restrictions.moves.none"
      class="res__moves d-flex"
    >
      <div
        v-if="skill.restrictions.moves.can_use"
        class="d-flex"
      >
        <CompoRestrictionMove
          v-for="moveType in skill.restrictions.moves.can_use"
          :key="moveType"
          :move-type="moveType"
          :size="size"
          can-use
        />
      </div>
      <div
        v-if="skill.restrictions.moves.can_not_use"
        class="d-flex"
      >
        <CompoRestrictionMove
          v-for="moveType in skill.restrictions.moves.can_not_use"
          :key="moveType"
          :move-type="moveType"
          :size="size"
        />
      </div>
    </div>

    <div
      v-if="!skill.restrictions.weapons.none"
      class="res__weapons d-flex"
    >
      <div
        v-if="skill.restrictions.weapons.can_use"
        class="d-flex"
      >
        <CompoRestrictionWeapon
          v-for="weaponType in skill.restrictions.weapons.can_use"
          :key="weaponType"
          :weapon-type="weaponType"
          :size="size"
          can-use
        />
      </div>
      <div
        v-if="skill.restrictions.weapons.can_not_use"
        class="d-flex"
      >
        <CompoRestrictionWeapon
          v-for="weaponType in skill.restrictions.weapons.can_not_use"
          :key="weaponType"
          :weapon-type="weaponType"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISkill } from '@/utils/types/skills'
const { t } = useI18n()
defineProps<{
  skill: ISkill
  size: number
}>()
</script>
