<template>
  <div
    v-if="seasons"
    class="seasons"
  >
    <v-menu
      v-for="i in 4"
      :key="i"
      location="top"
    >
      <template #activator="{ props }">
        <AppIconSeason
          v-bind="props"
          :element="seasons[i - 1]"
          class="season"
          :class="`season--${i - 1}`"
          :width="WIDTH"
        />
      </template>

      <v-card>
        <v-btn-group
          v-if="i <= 2"
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="element in SORTED_LEGENDARY_ELEMENTS"
            :key="element"
            size="x-small"
            @click="select(i - 1, element)"
          >
            <AppIconSeason
              :element="element"
              :height="SIZE_IN_BUTTON"
            />
          </v-btn>
        </v-btn-group>

        <v-btn-group
          v-else
          variant="outlined"
        >
          <v-btn
            size="small"
            @click="selectMythic(ELEMENT_LIGHT, ELEMENT_DARK)"
          >
            <AppIconSeasonColumnMythic
              :element-top="ELEMENT_LIGHT"
              :width="WIDTH"
            />
          </v-btn>
          <v-btn
            size="small"
            @click="selectMythic(ELEMENT_ASTRA, ELEMENT_ANIMA)"
          >
            <AppIconSeasonColumnMythic
              :element-top="ELEMENT_ASTRA"
              :width="WIDTH"
            />
          </v-btn>
          <v-btn
            size="small"
            @click="selectMythic(ELEMENT_CHAOS, ELEMENT_CHAOS)"
          >
            <AppIconSeasonColumnMythic
              :element-top="ELEMENT_CHAOS"
              :width="WIDTH"
            />
          </v-btn>
        </v-btn-group>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {
  SORTED_LEGENDARY_ELEMENTS,
  type ElementOrChaos,
  ELEMENT_LIGHT,
  ELEMENT_DARK,
  ELEMENT_ASTRA,
  ELEMENT_ANIMA,
  ELEMENT_CHAOS,
} from '~/utils/types/elements'
import { numberToPx } from '~/utils/functions/numberToPx'

const WIDTH = 20
const SIZE_IN_BUTTON = 30

const emit = defineEmits(['update:model-value'])
const seasons = defineModel<ElementOrChaos[]>()

function select(slot: number, element: ElementOrChaos) {
  const newSeasons = seasons.value ? [...seasons.value] : []
  newSeasons[slot] = element
  emit('update:model-value', newSeasons)
}
function selectMythic(
  elementTop: ElementOrChaos,
  elementBottom: ElementOrChaos,
) {
  const newSeasons = seasons.value ? [...seasons.value] : []
  newSeasons[2] = elementTop
  newSeasons[3] = elementBottom
  emit('update:model-value', newSeasons)
}

const totalWidth = computed(() => 2.5 * WIDTH)
const totalWidthPx = computed(() => numberToPx(totalWidth.value))
</script>

<style lang="scss" scoped>
.seasons {
  position: relative;
  width: v-bind('totalWidthPx');
  height: 40px;
}
.season {
  position: absolute;
}
.season--0 {
  top: 4px;
  left: 9px;
}
.season--1 {
  top: 20px;
  left: 0;
}
.season--2 {
  top: 4px;
  left: 27px;
}
.season--3 {
  top: 20px;
  left: 18px;
}
</style>
