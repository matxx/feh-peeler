import { SITE_TITLE } from '~/utils/constants'
import getBaseUrl from '~/utils/runtime/base-url'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error bad job on types from i18n
  const t = nuxtApp.$i18n.t

  const route = useRoute()
  const baseUrl = getBaseUrl()
  const getRouteBaseName = useRouteBaseName()
  const url = computed(() => `${baseUrl}${route.path}`)
  const title = computed(() =>
    t(`home.title.${getRouteBaseName(route)}`, route.params),
  )
  const titleComplete = computed(() => `${title.value} - ${SITE_TITLE}`)

  useHead({
    title: () => titleComplete.value,
  })
  useSeoMeta({
    title: () => titleComplete.value,
    ogUrl: url,
  })
})
