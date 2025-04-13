<template>
  <div class="flex-grow-1 d-flex align-center">
    <AppRenderOncePresent :item="unitDetails">
      <template #default="{ item }">
        <div class="width-400px d-flex justify-space-between align-center mr-5">
          <div class="d-flex align-center">
            <div class="width-40px">
              {{ unit.enclosure }}
              >
            </div>
            <CompoUnitThumbnail
              :unit="item"
              :size="30"
              :size-corner="15"
              :margin="10"
              :margin-icon="-5"
            />
            <div>
              <div>
                <span
                  v-if="ratings"
                  v-tooltip:bottom="t('bindingWorlds.game8Rating')"
                  class="position-relative"
                >
                  ({{ ratings.game8_rating }})
                </span>

                <v-tooltip
                  v-if="unit.notes"
                  location="bottom"
                >
                  <template #activator="{ props: tooltipProps }">
                    <v-icon
                      v-bind="tooltipProps"
                      size="xsmall"
                    >
                      mdi-comment-text-outline
                    </v-icon>
                  </template>

                  <pre>{{ unit.notes }}</pre>
                </v-tooltip>
              </div>
              <div
                v-if="
                  unit.dragonflowers ||
                  unit.boon ||
                  unit.boonAscended ||
                  unit.bane
                "
                class="d-flex mt-1"
              >
                <div
                  v-if="unit.dragonflowers"
                  class="mr-2 d-flex align-center"
                >
                  <AppIconDragonflowers
                    :type="item.move_type"
                    :size="14"
                  />
                  +{{ unit.dragonflowers }}
                </div>
                <div
                  v-show="unit.boon"
                  class="mr-2 font-weight-bold text-blue"
                >
                  +{{ unit.boon }}
                </div>
                <!-- <div
                  v-show="unit.boonAscended"
                  class="mr-2 font-weight-bold text-blue"
                >
                  +{{ unit.boonAscended }}
                </div> -->
                <div
                  v-show="unit.bane"
                  class="mr-2 font-weight-bold text-red"
                >
                  -{{ unit.bane }}
                </div>
              </div>
            </div>
          </div>

          <v-chip
            v-if="unit.rating"
            variant="outlined"
            :model-value="true"
            color="red-accent-3"
            class="px-2"
          >
            <v-icon color="red-accent-3">mdi-fire</v-icon>
            <span class="width-20px mx-1">{{ unit.rating }}</span>
          </v-chip>
        </div>
      </template>
    </AppRenderOncePresent>

    <div class="d-flex flex-nowrap flex-grow-1">
      <v-chip-group
        variant="outlined"
        divided
        class="mr-2"
      >
        <BindingWorldsChip
          v-for="(skillId, category) in props.unit.skillIds"
          v-show="SKILL_CATEGORIES_FOR_BINDING_WORLDS.includes(category)"
          :key="category"
          :category="category"
          :skill-id="skillId"
          class="px-2"
        />
      </v-chip-group>

      <v-spacer />

      <v-chip-group
        variant="outlined"
        divided
      >
        <v-chip class="px-2">
          {{ t('bindingWorlds.totalSP') }}:
          {{ totalSP }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnitInBindingWorlds } from '~/utils/events/binding-worlds'
import { SKILL_CATEGORIES_FOR_BINDING_WORLDS } from '~/utils/types/skills'

const props = defineProps<{
  unit: UnitInBindingWorlds
}>()

const { t } = useI18n()
const storeDataUnits = useStoreDataUnits()
const storeDataUnitsRatingsGame8 = useStoreDataUnitsRatingsGame8()
const storeDataSkills = useStoreDataSkills()

const unitDetails = computed(() =>
  props.unit.id ? storeDataUnits.unitsById[props.unit.id] : undefined,
)
const ratings = computed(() =>
  props.unit.id
    ? storeDataUnitsRatingsGame8.unitsRatingsGame8ById[props.unit.id]
    : undefined,
)

const totalSP = computed(() => storeDataSkills.sumSP(props.unit))
</script>

<style lang="css" scoped>
.width-400px {
  width: 400px;
}
.width-40px {
  width: 40px;
}
.width-20px {
  width: 20px;
}
</style>
