<template>
  <p class="pa-2">
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
  </p>
</template>

<script setup lang="ts">
import { BASE_URL as GAME8_URL } from '~/utils/types/game8'
import { BASE_URL as FANDOM_URL } from '~/utils/types/fandom'

const { t } = useI18n()
</script>
