<template>
  <div>
    <v-menu location="top">
      <template #activator="{ props }">
        <AppMjolnirImageSeasonCircle
          v-bind="props"
          :element="major"
          :height="HEIGHT"
        />
      </template>

      <v-card>
        <v-btn-group
          density="compact"
          variant="outlined"
        >
          <v-btn
            v-for="element in SORTED_MYTHIC_ELEMENTS"
            :key="element"
            size="x-small"
            @click="major = element"
          >
            <AppMjolnirImageSeasonColumn
              :element="element"
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
  SORTED_MYTHIC_ELEMENTS,
  type ElementMythic,
} from '~/utils/types/elements'

const HEIGHT = 50
const WIDTH = 30

const major = defineModel<ElementMythic>()
</script>
