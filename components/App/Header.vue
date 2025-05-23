<template>
  <v-app-bar
    dark
    color="primary"
  >
    <v-btn
      v-show="mobile || route.path !== '/'"
      icon
      @click="isDrawerOpen = !isDrawerOpen"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-app-bar-title v-if="route.path === '/'">
      {{ SITE_TITLE }}
    </v-app-bar-title>
    <v-app-bar-title v-else>
      <AppLink
        to="/"
        class="text-white"
      >
        {{ SITE_TITLE }}
      </AppLink>
      <span v-show="!mobile">
        -
        {{ title }}
      </span>
    </v-app-bar-title>

    <v-spacer v-show="!mobile" />

    <v-menu>
      <template #activator="{ props: menuProps }">
        <v-btn
          v-show="!mobile"
          v-tooltip:bottom="
            t(`layout.header.theme.${storeTheme.selectedTheme}`)
          "
          v-bind="menuProps"
          icon
        >
          <v-icon>{{ storeTheme.selectedThemeIcon }}</v-icon>
        </v-btn>
      </template>
      <v-list
        :selected="[storeTheme.selectedTheme]"
        color="primary"
      >
        <v-list-item
          v-for="item in themes"
          :key="item.key"
          :value="item.key"
          @click="storeTheme.selectTheme(item.key)"
        >
          <template #prepend>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      v-show="!mobile"
      v-tooltip:bottom="t(storeSearches.textKeyToUse)"
      icon
      @click="storeSearches.toggle"
    >
      <v-icon :height="24">
        {{ storeSearches.iconToUse }}
      </v-icon>
    </v-btn>

    <v-btn
      v-show="!mobile"
      v-tooltip:bottom="t('layout.drawer.header.cookieManagement')"
      icon
      :href="URL_HASH_FOR_COOKIE_MANAGEMENT"
    >
      <v-icon>mdi-cookie</v-icon>
    </v-btn>

    <v-btn
      v-show="!mobile"
      v-tooltip:bottom="t('layout.drawer.header.sourceCode')"
      icon
      :href="GITHUB_LINK"
      target="_blank"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import {
  SITE_TITLE,
  GITHUB_LINK,
  URL_HASH_FOR_COOKIE_MANAGEMENT,
} from '@/utils/constants'
import { THEMES } from '~/utils/types/themes'

const isDrawerOpen = defineModel<boolean>('is-drawer-open')

const { mobile } = useDisplay()
const { t } = useI18n()
const route = useRoute()
const storeTheme = useStoreTheme()
const storeSearches = useStoreSearches()
const getRouteBaseName = useRouteBaseName()

const title = computed(() =>
  t(`home.title.${getRouteBaseName(route)}`, route.params),
)

const themes = THEMES.map((theme) => ({
  key: theme,
  text: t(`layout.header.theme.${theme}`),
  icon: storeTheme.iconFor(theme),
}))

const theme = useTheme()
storeTheme.setupVuetifyTheme(theme)

onMounted(() => {
  if (window && window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    colorSchemeQuery.addEventListener('change', storeTheme.browserThemeChanged)
  }
  storeTheme.browserThemeChanged()
})
</script>

<style lang="scss" scoped>
.width-200px {
  width: 200px;
}
</style>
