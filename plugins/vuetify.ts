import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
      const storeTheme = useStoreTheme()
      vuetifyOptions.theme = {
        defaultTheme: storeTheme.appliedTheme,
      }
    })
  }
})
