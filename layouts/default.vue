<template>
  <v-app>
    <AppHeader
      v-model:is-drawer-open="isDrawerOpen"
      :class="{ 'v-head--before-mounted': !mounted }"
    />
    <AppNavigationDrawer v-model:is-open="isDrawerOpen" />

    <v-main :class="{ 'v-main--before-mounted': !mounted }">
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
const { mounted } = useMounted()
const isDrawerOpen = ref(false)
useDataStores([useStoreDataAccents()])
useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    class: [
      `theme-${storeTheme.appliedTheme}`,
      `highcharts-${storeTheme.appliedTheme}`,
    ],
  },
}))
onMounted(useStoreGlobals().updateScrollbarSizes)
</script>

<style lang="scss" scoped>
/* MONKEY PATCH: before mounted, padding for header is not set causing some UI shifting to the bottom at mount time */
.v-main--before-mounted {
  padding-top: 64px;
}

.v-head--before-mounted {
  z-index: 1006;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;

  &::v-deep .v-toolbar__content {
    align-items: center;
    display: flex;
  }
}
</style>
