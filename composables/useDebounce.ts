import debounce from 'lodash-es/debounce'
import type { WatchSource, WatchOptions } from 'vue'

const DEBOUNCE_TIME = 500

export default function (
  cb: () => void,
  sourcesAndOptions: Array<[WatchSource, WatchOptions?]>,
) {
  const isUpdating = ref(false)

  const update = debounce(() => {
    if (isUpdating.value) return

    isUpdating.value = true
    nextTick(() => {
      cb()
      isUpdating.value = false
    })
  }, DEBOUNCE_TIME)

  onMounted(update)
  sourcesAndOptions.forEach(([source, options]) => {
    watch(source, update, options)
  })

  return {
    isUpdating,
    update,
  }
}
