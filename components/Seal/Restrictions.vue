<template>
  <div v-if="seal.restrictions.moves.none && seal.restrictions.weapons.none">
    {{ t('global.all') }}
  </div>
  <div
    v-else
    class="d-flex"
  >
    <div
      v-if="!seal.restrictions.moves.none"
      class="res__moves d-flex"
    >
      <div
        v-if="seal.restrictions.moves.can_use"
        class="d-flex"
      >
        <CompoRestrictionMove
          v-for="moveType in seal.restrictions.moves.can_use"
          :key="moveType"
          :move-type="moveType"
          :size="size"
          can-use
        />
      </div>
      <div
        v-if="seal.restrictions.moves.can_not_use"
        class="d-flex"
      >
        <CompoRestrictionMove
          v-for="moveType in seal.restrictions.moves.can_not_use"
          :key="moveType"
          :move-type="moveType"
          :size="size"
        />
      </div>
    </div>

    <div
      v-if="!seal.restrictions.weapons.none"
      class="res__weapons d-flex"
    >
      <div
        v-if="seal.restrictions.weapons.can_use"
        class="d-flex"
      >
        <CompoRestrictionWeapon
          v-for="weaponType in seal.restrictions.weapons.can_use"
          :key="weaponType"
          :weapon-type="weaponType"
          :size="size"
          can-use
        />
      </div>
      <div
        v-if="seal.restrictions.weapons.can_not_use"
        class="d-flex"
      >
        <CompoRestrictionWeapon
          v-for="weaponType in seal.restrictions.weapons.can_not_use"
          :key="weaponType"
          :weapon-type="weaponType"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISeal } from '@/utils/types/seals'
const { t } = useI18n()
defineProps<{
  seal: ISeal
  size: number
}>()
</script>
