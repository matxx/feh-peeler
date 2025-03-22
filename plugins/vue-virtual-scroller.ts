import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import {
  DynamicScroller,
  DynamicScrollerItem,
  RecycleScroller,
} from 'vue-virtual-scroller'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error not sure why
  nuxtApp.vueApp.component('RecycleScroller', RecycleScroller)
  // @ts-expect-error not sure why
  nuxtApp.vueApp.component('DynamicScroller', DynamicScroller)
  // @ts-expect-error not sure why
  nuxtApp.vueApp.component('DynamicScrollerItem', DynamicScrollerItem)
})
