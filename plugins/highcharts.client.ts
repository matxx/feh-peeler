import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'

import initAccessibility from 'highcharts/modules/accessibility'
import initExporting from 'highcharts/modules/exporting'
import initExportData from 'highcharts/modules/export-data'

export default defineNuxtPlugin({
  name: 'highcharts-vue',
  parallel: true,
  setup(nuxtApp) {
    if (typeof Highcharts === 'object') {
      initAccessibility(Highcharts)
      initExporting(Highcharts)
      initExportData(Highcharts)
    }
    nuxtApp.vueApp.use(HighchartsVue)
  },
})
