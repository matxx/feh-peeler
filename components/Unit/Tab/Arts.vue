<template>
  <AppRenderOnceWhileActive :active="storeDataUnitsArts.isLoaded">
    <v-fab
      v-if="unit.has_respl"
      color="primary"
      variant="text"
      absolute
      location="top end"
      :icon="sync ? 'mdi-lock' : 'mdi-lock-open-variant'"
      size="small"
      @click="sync = !sync"
    />

    <v-container fluid>
      <v-row>
        <v-col :cols="unit.has_respl && onTwoColumns ? 6 : 12">
          <v-carousel
            v-model="left"
            :transition-duration="700"
            crossfade
          >
            <h3 v-if="unit.has_respl && onTwoColumns">
              {{ t('units.show.arts.classicArts') }}
            </h3>
            <v-carousel-item
              v-for="(item, i) in carousel1"
              :key="i"
              :src="item"
            />
          </v-carousel>
        </v-col>
        <v-col
          v-if="unit.has_respl"
          :cols="onTwoColumns ? 6 : 12"
        >
          <v-carousel
            v-model="right"
            :transition-duration="700"
            crossfade
          >
            <h3>
              {{ t('units.show.arts.resplendentArts') }}
            </h3>
            <v-carousel-item
              v-for="(item, i) in carousel2"
              :key="i"
              :src="item"
            />
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </AppRenderOnceWhileActive>
</template>

<script setup lang="ts">
import type { IUnit } from '~/utils/types/units'

const props = defineProps<{
  unit: IUnit
}>()

const { t } = useI18n()
const { smAndUp } = useDisplay()
const storeDataUnitsArts = useStoreDataUnitsArts()

const left = ref()
const right = ref()
const sync = ref(true)

watch(left, () => {
  if (!sync.value) return

  right.value = left.value
})
watch(right, () => {
  if (!sync.value) return

  left.value = right.value
})

const arts = computed(() => storeDataUnitsArts.artsById[props.unit.id])

const carousel1 = computed(() => [
  arts.value.art_a,
  arts.value.art_b,
  arts.value.art_c,
  arts.value.art_d,
])

const carousel2 = computed(() =>
  props.unit.has_respl
    ? [
        arts.value.art_resp_a,
        arts.value.art_resp_b,
        arts.value.art_resp_c,
        arts.value.art_resp_d,
      ]
    : [],
)

const onTwoColumns = computed(() => smAndUp.value)
</script>
