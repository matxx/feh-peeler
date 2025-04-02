<template>
  <v-navigation-drawer
    v-if="mounted && mobile"
    v-model="isOpen"
    :location="mobile ? 'bottom' : undefined"
  >
    <v-list lines="one">
      <v-list-subheader>
        {{ t(`layout.drawer.subheader.parameters`) }}
      </v-list-subheader>

      <v-list-item @click="storeLinks.cycle">
        <template #prepend>
          <v-img
            :src="storeLinks.imageToUse"
            :width="SIZE"
            class="mr-8"
          />
        </template>
        <v-list-item-title>
          {{ t(`layout.header.target.${storeLinks.target}`) }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="storeTheme.cycle">
        <template #prepend>
          <v-icon :size="SIZE">{{ storeTheme.selectedThemeIcon }}</v-icon>
        </template>
        <v-list-item-title>
          {{ t(`layout.header.theme.${storeTheme.selectedTheme}`) }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="storeSearches.toggle">
        <template #prepend>
          <v-icon :size="SIZE">{{ storeSearches.iconToUse }}</v-icon>
        </template>
        <v-list-item-title>
          {{ t(storeSearches.textKeyToUse) }}
        </v-list-item-title>
      </v-list-item>

      <v-list-subheader>
        {{ t(`layout.drawer.subheader.misc`) }}
      </v-list-subheader>

      <v-list-item :href="URL_HASH_FOR_COOKIE_MANAGEMENT">
        <template #prepend>
          <v-icon :size="SIZE">mdi-cookie</v-icon>
        </template>
        <v-list-item-title>
          {{ t('layout.drawer.header.cookieManagement') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        :href="GITHUB_LINK"
        target="_blank"
      >
        <template #prepend>
          <v-icon :size="SIZE">mdi-github</v-icon>
        </template>
        <v-list-item-title>
          {{ t('layout.drawer.header.sourceCode') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { GITHUB_LINK } from '@/utils/constants'

const SIZE = 24
const isOpen = defineModel<boolean>('is-open')

const { t } = useI18n()
const { mobile } = useDisplay()
const { mounted } = useMounted()
const storeLinks = useStoreLinks()
const storeTheme = useStoreTheme()
const storeSearches = useStoreSearches()
</script>
