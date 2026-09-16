<template>
  <v-alert
    v-if="HALL_OF_FORMS_DETAILS.resources"
    type="info"
    border="start"
    variant="tonal"
  >
    <p>{{ t('hallOfForms.resources.usefullResources') }}:</p>
    <ul>
      <li v-if="HALL_OF_FORMS_DETAILS.resources.PM1">
        <a
          :href="HALL_OF_FORMS_DETAILS.resources.PM1"
          target="_blank"
        >
          @Pheonixmaster1 Youtube {{ t('global.video') }}
        </a>
      </li>
      <li v-if="HALL_OF_FORMS_DETAILS.resources.FEHOLOGY">
        <a
          :href="HALL_OF_FORMS_DETAILS.resources.FEHOLOGY"
          target="_blank"
        >
          @Fehology Youtube {{ t('global.video') }}
        </a>
      </li>
      <li v-if="HALL_OF_FORMS_DETAILS.resources.SATACHI">
        <a
          :href="HALL_OF_FORMS_DETAILS.resources.SATACHI"
          target="_blank"
        >
          @SatachiFEH Youtube {{ t('global.video') }}
        </a>
      </li>
      <li v-if="HALL_OF_FORMS_DETAILS.resources.TACHO">
        <a
          :href="HALL_OF_FORMS_DETAILS.resources.TACHO"
          target="_blank"
        >
          @TACHO Youtube {{ t('global.video') }}
        </a>
      </li>

      <li v-if="HALL_OF_FORMS_DETAILS.resources.COOLEST_MAGICAL_CAT">
        <a
          :href="HALL_OF_FORMS_DETAILS.resources.COOLEST_MAGICAL_CAT"
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
const { t } = useI18n()

const HALL_OF_FORMS_DETAILS = {
  number: 53,
  is_revival: true,
  resources: {
    PM1: 'https://www.youtube.com/watch?v=JkwJEE-vNUQ',
    FEHOLOGY: 'https://www.youtube.com/watch?v=4uwH4KvJyA8',
    TACHO: null,
    SATACHI: null,
    // COOLEST_MAGICAL_CAT:
    //   'https://www.reddit.com/r/FireEmblemHeroes/comments/1vvd8tt/recommended_forma_skills_infographic_hall_of/',
  },
}
</script>
