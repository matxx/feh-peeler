export default function (t: ReturnType<typeof useI18n>['t']) {
  const route = useRoute()
  const getRouteBaseName = useRouteBaseName()
  const routebaseName = computed(() => getRouteBaseName(route))
  const title = computed(() =>
    routebaseName.value
      ? t(`home.title.${String(getRouteBaseName(route))}`, route.params)
      : null,
  )
  const titleComplete = computed(() =>
    title.value ? `${title.value} - ${SITE_TITLE}` : SITE_TITLE,
  )

  return { title, titleComplete }
}
