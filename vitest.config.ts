import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    hookTimeout: 120000,
    testTimeout: 60000,
  },
})
