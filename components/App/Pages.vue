<template>
  <div>
    <div
      class="d-flex"
      :class="{ 'flex-column': oneList || xs }"
    >
      <v-list :lines="showSubtitles ? 'two' : 'one'">
        <DevOnly>
          <v-list-subheader>
            {{ t(`home.subheader.devOnly`) }}
          </v-list-subheader>
          <v-list-item
            v-for="item in devLinks"
            :key="item.link"
            :to="localePath(item.link)"
          >
            <v-list-item-title class="pl-5 text-primary">
              {{ t(`home.title.${item.link}`) }}
            </v-list-item-title>
          </v-list-item>
        </DevOnly>
      </v-list>

      <v-list
        v-for="(column, idx) in COLUMNS"
        :key="idx"
        :lines="showSubtitles ? 'two' : 'one'"
      >
        <template
          v-for="(item, index) in column"
          :key="index"
        >
          <v-list-subheader v-if="item.isSubheader">
            {{ item.text }}
          </v-list-subheader>
          <v-list-item
            v-if="item.isItem"
            :to="localePath(item.link)"
          >
            <v-list-item-title class="pl-5 text-primary">
              {{ t(`home.title.${item.link}`) }}
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="te(`home.subtitle.${item.link}`)"
              v-show="showSubtitles"
              class="pl-5"
            >
              {{ t(`home.subtitle.${item.link}`) }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-list>
    </div>

    <AppCredits />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    oneList?: boolean
    showSubtitles?: boolean
  }>(),
  {
    oneList: false,
    showSubtitles: false,
  },
)

const { t, te } = useI18n()
const localePath = useLocalePath()
const { xs } = useDisplay()

const devLinks = [
  { link: 'assets' },
  { link: 'sprite-sheets' },
  { link: 'skills-tree' },
]

const COLUMNS = [
  [
    { isSubheader: true, text: t('home.subheader.skillsAndUnits') },
    { isItem: true, link: 'skills' },
    // { isItem: true, link: 'skills-lists' },
    { isItem: true, link: 'units' },
    { isItem: true, link: 'units-maximum-scores' },
    { isItem: true, link: 'score-calc' },
    { isItem: true, link: 'catalog-of-heroes' },
  ],
  [
    { isSubheader: true, text: t('home.subheader.events') },
    { isItem: true, link: 'events-hall-of-forms' },
    { isItem: true, link: 'events-binding-worlds' },
    { isSubheader: true, text: t('home.subheader.misc') },
    { isItem: true, link: 'misc-glossary' },
    { isItem: true, link: 'misc-stats-evolution' },
  ],
]
</script>
