<template>
  <v-container
    fluid
    class="pa-2"
  >
    <v-row>
      <v-col
        :cols="oneList || xs ? 12 : 6"
        :class="{ 'pb-0': oneList || xs }"
      >
        <i18n-t
          keypath="home.misc.allDataFrom"
          tag="span"
          scope="global"
        >
          <template #link>
            <a
              :href="FANDOM_URL"
              target="_blank"
            >
              {{ t('home.misc.fandom') }}
            </a>
          </template>
        </i18n-t>

        <br />

        <i18n-t
          keypath="home.misc.allRatingsFrom"
          tag="span"
          scope="global"
        >
          <template #link>
            <a
              :href="GAME8_URL"
              target="_blank"
            >
              {{ t('home.misc.game8') }}
            </a>
          </template>
        </i18n-t>
      </v-col>
      <v-col
        v-show="storeDataUnits.isLoaded"
        :cols="oneList || xs ? 12 : 6"
        :class="{ 'pt-0': oneList || xs, 'text-end': !oneList && !xs }"
      >
        {{ t('home.misc.lastUnit') }}:

        <NuxtLink
          v-if="storeDataUnits.lastUnit"
          href="#"
          @click.prevent="storeGlobals.showUnit(storeDataUnits.lastUnit.id)"
        >
          {{ storeDataUnits.lastUnit.abbreviated_name }}
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { BASE_URL as GAME8_URL } from '~/utils/types/game8'
import { BASE_URL as FANDOM_URL } from '~/utils/types/fandom'

withDefaults(
  defineProps<{
    oneList?: boolean
  }>(),
  {
    oneList: false,
  },
)

const { t } = useI18n()
const { xs } = useDisplay()
const storeGlobals = useStoreGlobals()
const storeDataUnits = useStoreDataUnits()
</script>
