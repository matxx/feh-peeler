import throttle from 'lodash-es/throttle'
import { useResizeObserver } from '@vueuse/core'

const THROTTLE_TIME = 250

export default function (container: Ref<HTMLElement | undefined>) {
  const storeGlobals = useStoreGlobals()

  const scrollWidth = ref<number>(0)
  const clientWidth = ref<number>(0)
  const scrollHeight = ref<number>(0)
  const clientHeight = ref<number>(0)

  const hasHorizontalScroll = computed(
    () => !!container.value && scrollWidth.value > clientWidth.value,
  )
  const hasVerticalScroll = computed(
    () => !!container.value && scrollHeight.value > clientHeight.value,
  )

  const scrollbarHeight = computed(() =>
    hasHorizontalScroll.value ? storeGlobals.scrollbarHeight : 0,
  )
  const scrollbarWidth = computed(() =>
    hasVerticalScroll.value ? storeGlobals.scrollbarWidth : 0,
  )

  const updateSizes = throttle(
    () => {
      if (container.value) {
        scrollWidth.value = container.value.scrollWidth
        clientWidth.value = container.value.clientWidth
        scrollHeight.value = container.value.scrollHeight
        clientHeight.value = container.value.clientHeight
      }
    },
    THROTTLE_TIME,
    { leading: true, trailing: true },
  )
  useResizeObserver(container, updateSizes)
  updateSizes()

  return {
    hasHorizontalScroll,
    hasVerticalScroll,
    scrollbarHeight,
    scrollbarWidth,
  }
}
