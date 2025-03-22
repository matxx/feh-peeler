<template>
  <v-alert
    v-if="HALL_OF_FORMS_RESOURCES"
    type="info"
    border="start"
    variant="tonal"
  >
    <p>{{ t('hallOfForms.resources.usefullResources') }}:</p>
    <ul>
      <li v-if="HALL_OF_FORMS_RESOURCES.PM1">
        <a
          :href="HALL_OF_FORMS_RESOURCES.PM1"
          target="_blank"
        >
          @Pheonixmaster1 Youtube {{ t('global.video') }}
        </a>
      </li>
      <li v-if="HALL_OF_FORMS_RESOURCES.FEHOLOGY">
        <a
          :href="HALL_OF_FORMS_RESOURCES.FEHOLOGY"
          target="_blank"
        >
          @Fehology Youtube {{ t('global.video') }}
        </a>
      </li>
      <li v-if="HALL_OF_FORMS_RESOURCES.COOLEST_MAGICAL_CAT">
        <a
          :href="HALL_OF_FORMS_RESOURCES.COOLEST_MAGICAL_CAT"
          target="_blank"
        >
          @CoolestMagicalCat Reddit {{ t('global.post') }}
        </a>
      </li>
    </ul>
  </v-alert>

  <v-alert
    v-else
    type="info"
    border="start"
    variant="tonal"
  >
    <p>
      {{ t('hallOfForms.resources.line1') }}
    </p>
    <ul>
      <li>
        <a
          href="https://www.youtube.com/@Pheonixmaster1"
          target="_blank"
          >@Pheonixmaster1</a
        >
      </li>
      <li>
        <a
          href="https://www.youtube.com/@FEH"
          target="_blank"
          >@Fehology</a
        >
      </li>
    </ul>
    <p>
      {{ t('hallOfForms.resources.line2') }}
    </p>

    <p class="mt-3">
      {{ t('hallOfForms.resources.line3') }}

      <a
        href="https://www.reddit.com/user/CoolestMagicalCat/"
        target="_blank"
        >@CoolestMagicalCat</a
      >
      Reddit
      <a
        href="https://www.reddit.com/user/CoolestMagicalCat/submitted/"
        target="_blank"
        >{{ t('global.post', 2) }}</a
      >.

      {{ t('hallOfForms.resources.line4') }}
    </p>
  </v-alert>
</template>

<script setup lang="ts">
import { HALL_OF_FORMS_RESOURCES } from '~/utils/constants'
const { t } = useI18n()
</script>
