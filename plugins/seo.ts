export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error bad job on types from i18n
  const t = nuxtApp.$i18n.t

  const route = useRoute()
  const baseUrl = useRuntimeConfig().public.BASE_URL
  const url = computed(() => `${baseUrl}${route.path}`)

  const { titleComplete } = usePageTitle(t)

  useHead({
    title: () => titleComplete.value,
  })
  useSeoMeta({
    title: () => titleComplete.value,
    ogUrl: url,
  })
})
