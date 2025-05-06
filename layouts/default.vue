<template>
  <v-app>
    <AppHeader v-model:is-drawer-open="isDrawerOpen" />
    <AppNavigationDrawer v-model:is-open="isDrawerOpen" />

    <v-main>
      <slot />
    </v-main>

    <TheSnackbar />
    <TheModalForSkill />
    <TheModalForUnit />
  </v-app>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const storeTheme = useStoreTheme()
const isDrawerOpen = ref(false)
useDataStores([useStoreDataAccents()])
useHead({
  htmlAttrs: {
    lang: locale.value,
    class: `theme-${storeTheme.appliedTheme}`,
  },
})
</script>
