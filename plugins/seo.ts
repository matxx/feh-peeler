import { SITE_URL } from '~/utils/constants'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error bad job on types from i18n
  const t = nuxtApp.$i18n.t

  const req = useRequestURL()
  const route = useRoute()
  const ogUrl = computed(() => `${req.origin}${route.path}`)
  const canonicalUrl = computed(() => `${SITE_URL}${route.path}`)

  const { titleComplete } = usePageTitle(t)

  useHead({
    title: () => titleComplete.value,
    link: () => [{ rel: 'canonical', href: canonicalUrl.value }],
  })
  useSeoMeta({
    title: () => titleComplete.value,
    ogUrl,
  })
})
