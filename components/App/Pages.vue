<template>
  <v-list :lines="showSubtitles ? 'two' : 'one'">
    <DevOnly>
      <v-list-subheader>
        {{ t(`home.subheader.devOnly`) }}
      </v-list-subheader>
      <v-list-item :to="localePath('/assets')">
        <v-list-item-title class="pl-5 text-primary">
          {{ t('home.title.assets') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item :to="localePath('/skills-tree')">
        <v-list-item-title class="pl-5 text-primary">
          {{ t('home.title.skills-tree') }}
        </v-list-item-title>
      </v-list-item>
    </DevOnly>

    <template
      v-for="(item, index) in ITEMS"
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
          v-show="showSubtitles"
          class="pl-5"
        >
          {{ t(`home.subtitle.${item.link}`) }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
  </v-list>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    showSubtitles?: boolean
  }>(),
  {
    showSubtitles: false,
  },
)

const { t } = useI18n()
const localePath = useLocalePath()

const ITEMS = [
  { isSubheader: true, text: t('home.subheader.unitsAndSkills') },
  { isItem: true, link: 'units' },
  { isItem: true, link: 'units-maximum-scores' },
  { isItem: true, link: 'catalog-of-heroes' },
  { isItem: true, link: 'skills' },
  // { isItem: true, link: 'skills-fodders' },
  { isItem: true, link: 'skills-lists' },
  { isSubheader: true, text: t('home.subheader.events') },
  { isItem: true, link: 'events-hall-of-forms' },
  { isItem: true, link: 'events-binding-worlds' },
]
</script>
