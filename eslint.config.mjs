// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    // extends: [
    //   'plugin:nuxt/recommended',
    //   'plugin:vue/vue3-recommended',
    //   '@nuxt/eslint-config',
    //   'prettier',
    // ],
    rules: {
      // rules conflicting with prettier
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            normal: 'always', // HTML elements. E.g. <div></div>
            void: 'always', // HTML void elements. E.g. <img>
            component: 'always', // Vue.js components.
          },
          svg: 'always',
          math: 'always',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
    // globals: {
    //   // monkey patch :
    //   // writing "find" in a component without importing it from lodash
    //   // would not display an error because "window.find" exists
    //   // find: 'off'
    // },
  },
])
