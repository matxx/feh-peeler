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
      <v-list-subheader v-if="item.subheader">
        {{ item.text }}
      </v-list-subheader>
      <v-list-item
        v-if="item.item"
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
  { subheader: true, text: t('home.subheader.unitsAndSkills') },
  { item: true, link: 'units' },
  { item: true, link: 'units-maximum-scores' },
  { item: true, link: 'catalog-of-heroes' },
  // { item: true, link: 'skills' },
  { item: true, link: 'skills-fodders' },
  { item: true, link: 'skills-lists' },
  { subheader: true, text: t('home.subheader.events') },
  { item: true, link: 'events-hall-of-forms' },
  { item: true, link: 'events-binding-worlds' },
]
</script>
