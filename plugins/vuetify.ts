import '@mdi/font/css/materialdesignicons.css'

import colors from 'vuetify/lib/util/colors'

// https://stackoverflow.com/q/63758550/5032734
export const hexColor = (name: string) => {
  const baseColors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange',
    'brown',
    'blue-grey',
    'grey',
  ]
  const shades = ['black', 'white', 'transparent']
  const match =
    [...baseColors, ...shades].find((c) => name.startsWith(c)) || null
  if (!match) return null

  const remainder = match ? name.slice(match.length) : null
  const base = match.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
  const variety = remainder ? remainder.replaceAll('-', '') : 'base'
  const nameStructured = shades.find((shade) => match === shade)
    ? { base: 'shades', variety: base }
    : { base: base, variety: variety }
  return colors[nameStructured.base][nameStructured.variety]
}

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
