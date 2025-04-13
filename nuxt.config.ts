import { fromPairs } from 'lodash-es'

import { env, ENV_PRODUCTION } from './utils/env'
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_IMAGE_URL,
  SITE_IMAGE_SIZE,
} from './utils/constants'
import { dsn } from './utils/sentry'
import { DEFAULT_THEME } from './utils/types/themes'

const DEFAULT_LOCALE = 'en'

const publicEnvVariablesToPass = fromPairs(
  [
    'GTAG_UA',
    'FEH_PEELER_DEVELOPMENT_GTAG_UA',
    'FEH_PEELER_PRODUCTION_GTAG_UA',
  ].map((x) => [x, process.env[x]]),
)

const secretEnvVariablesToPass = fromPairs([].map((x) => [x, process.env[x]]))

const users = []
if (process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD) {
  users.push({
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  })
}
if (
  process.env.BASIC_AUTH_EXTERNAL_USERNAME &&
  process.env.BASIC_AUTH_EXTERNAL_PASSWORD
) {
  users.push({
    username: process.env.BASIC_AUTH_EXTERNAL_USERNAME,
    password: process.env.BASIC_AUTH_EXTERNAL_PASSWORD,
  })
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  sourcemap: {
    server: true,
    client: 'hidden',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: DEFAULT_LOCALE,
      },
      title: SITE_TITLE,
      meta: [
        { name: 'description', content: SITE_DESCRIPTION },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },

        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:site:name', content: SITE_TITLE },
        { property: 'og:site_name', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:locale', content: 'fr_FR' },
        {
          property: 'og:image',
          content: SITE_IMAGE_URL,
        },
        {
          property: 'og:image:secure_url',
          content: SITE_IMAGE_URL,
        },
        { property: 'og:image:width', content: SITE_IMAGE_SIZE },
        { property: 'og:image:height', content: SITE_IMAGE_SIZE },
        { property: 'og:image:alt', content: SITE_TITLE },
        { property: 'og:image:type', content: 'image/png' },

        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: SITE_IMAGE_URL },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@feh-peeler' },
        { name: 'twitter:creator', content: '@feh-peeler' },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/tarteaucitronjs/1.19.0/tarteaucitron.js',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  pages: true,

  modules: [
    '@kgierke/nuxt-basic-auth',
    ['@nuxtjs/eslint-module', { lintOnStart: false }],
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxt/eslint',
    '@sentry/nuxt/module',
    'nuxt-pages-plus',
    'vuetify-nuxt-module',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  basicAuth: {
    enabled: env === ENV_PRODUCTION,
    users: users,
    // Optional: Whitelist routes
    // allowedRoutes: ["/api/.*"],
  },

  css: [
    '~/assets/styles/global.scss',
    // '~/assets/styles/vuetify/main.scss'
  ],

  // Required when customizing Vuetify sass variables via configFile with SSR enabled - https://vuetify-nuxt-module.netlify.app/guide/server-side-rendering.html#vuetify-sass-variables
  // features: {
  //   inlineStyles: false,
  // },

  vuetify: {
    moduleOptions: {
      /* If customizing sass variables of vuetify components */
      /* If enabling this, set features.inlineStyles to false */
      // styles: {
      //   configFile: 'assets/styles/vuetify/settings.scss',
      // },
    },
    vuetifyOptions: {
      labComponents: ['VTreeview'],
      display: {
        mobileBreakpoint: 'sm',
      },
      theme: {
        defaultTheme: DEFAULT_THEME,
      },
    },
  },

  veeValidate: {
    // disable or enable auto imports
    // autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  runtimeConfig: {
    ...secretEnvVariablesToPass,
    public: {
      ...publicEnvVariablesToPass,
      env,
      sentry: {
        dsn,
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.mts',
      },
      // {
      //   code: 'fr',
      //   file: 'fr.mts',
      // },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: DEFAULT_LOCALE,
    customRoutes: 'config',
    pages: {
      assets: {
        // fr: '/assets',
        en: '/assets',
      },

      units: {
        // fr: '/unites',
        en: '/units',
      },
      'units/[name]': {
        // fr: '/unites/[name]',
        en: '/units/[name]',
      },
      'units/[name]/[tab]': {
        // fr: '/unites/[name]/[tab]',
        en: '/units/[name]/[tab]',
      },
      'units-maximum-scores': {
        // fr: '/scores-maximum-en-arene',
        en: '/units-maximum-scores',
      },

      'skills-lists': {
        // fr: '/listes-de-competences',
        en: '/skills-lists',
      },
      'skills-fodders': {
        // fr: '/listes-des-possesseurs-de-competences',
        en: '/skills-fodders',
      },

      skills: {
        // fr: '/competences',
        en: '/skills',
      },
      'skills/[name]': {
        // fr: '/competences/[name]',
        en: '/skills/[name]',
      },
      'skills/[name]/[tab]': {
        // fr: '/competences/[name]/[tab]',
        en: '/skills/[name]/[tab]',
      },

      'events/hall-of-forms': {
        // fr: '/evenements/hall-of-forms',
        en: '/events/hall-of-forms',
      },
      'events/binding-worlds': {
        // fr: '/evenements/binding-worlds',
        en: '/events/binding-worlds',
      },
    },
  },

  compatibilityDate: '2024-10-21',

  sentry: {
    sourceMapsUploadOptions: {
      org: 'me-g7',
      project: 'feh-peeler',
      sourcemaps: {
        filesToDeleteAfterUpload: ['.*/**/public/**/*.map'],
      },
    },
  },

  nitro: {
    rollupConfig: {
      output: {
        sourcemap: 'hidden',
        sourcemapExcludeSources: true,
      },
    },
  },
})
