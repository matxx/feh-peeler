// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  sourcemap: {
    server: true,
    client: 'hidden',
  },

  pages: true,

  modules: [
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    '@nuxt/eslint',
    'nuxt-pages-plus',
    'vuetify-nuxt-module',
  ],

  compatibilityDate: '2024-10-21',
})
