import { defineVitestConfig } from '@nuxt/test-utils/config'

// Pins test/support/loadProdData.ts to a fixed, immutable data snapshot,
// independent of whatever commit is live in production. NUXT_PUBLIC_ prefix
// required: this is Nitro's runtime override for runtimeConfig.public.COMMIT_HASH.
// Set directly on process.env (rather than test.env below) since
// @nuxt/test-utils boots the Nuxt app in a process test.env doesn't reach.
process.env.NUXT_PUBLIC_COMMIT_HASH ||=
  '3bcaf4c1ac150a5da03f1ab35bda7048fd9efad4'

export default defineVitestConfig({
  test: {
    hookTimeout: 120000,
    testTimeout: 60000,
  },
})
