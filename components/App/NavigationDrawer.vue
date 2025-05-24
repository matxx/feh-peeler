<template>
  <v-navigation-drawer
    v-if="mounted"
    disable-resize-watcher
    disable-route-watcher
    :model-value="route.path === '/' ? mobile && isOpen : isOpen"
    :temporary="!mobile"
    @update:model-value="isOpen = $event"
  >
    <AppPages v-show="route.path !== '/'" />

    <v-divider v-show="mobile" />

    <v-list
      v-show="mobile"
      lines="one"
    >
      <v-list-subheader>
        {{ t(`layout.drawer.subheader.parameters`) }}
      </v-list-subheader>

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
    </v-list>

    <v-divider v-show="mobile" />

    <v-list
      v-show="mobile"
      lines="one"
    >
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
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const { mounted } = useMounted()
const storeTheme = useStoreTheme()
const storeSearches = useStoreSearches()

router.afterEach(() => {
  if (!mobile) return

  isOpen.value = false
})
</script>
