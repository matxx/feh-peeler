<template>
  <div>
    <div>
      <v-chip-group
        variant="outlined"
        direction="vertical"
        class="v-chip-group--full-width"
      >
        <HallOfFormsChip
          v-for="category in SKILL_CATEGORIES_FOR_HALL_OF_FORMS"
          :key="category"
          :category="category"
          :skill-id="unitInstance.skillIds[category]"
          :show-sp="false"
          class="mx-0"
          @click="$emit('select-skill-category', category)"
          @unequip="$emit('unequip', category)"
        />
      </v-chip-group>
    </div>

    <div v-show="showSp">
      <v-chip-group
        variant="outlined"
        direction="vertical"
        class="v-chip-group--full-width"
      >
        <v-chip class="mx-0">
          {{ t('bindingWorlds.totalSP') }}
          <v-spacer />
          {{ totalSP }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SKILL_CATEGORIES_FOR_HALL_OF_FORMS } from '~/utils/types/skills'
import type { IUnitInstance } from '~/utils/types/units'

defineEmits(['unequip', 'select-skill-category'])
const props = withDefaults(
  defineProps<{
    unitInstance: IUnitInstance
    withSkillS?: boolean
    withSkillX?: boolean
    showSp?: boolean
  }>(),
  {
    withSkillS: false,
    withSkillX: false,
    showSp: false,
  },
)

const { t } = useI18n()
const storeDataSkills = useStoreDataSkills()
const totalSP = computed(() => storeDataSkills.sumSP(props.unitInstance))
</script>

<style lang="css" scoped>
.v-chip-group--full-width:deep(.v-chip__content) {
  flex-grow: 1;
}
</style>
