export default function () {
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })
  return { mounted }
}
