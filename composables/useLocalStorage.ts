import debounce from 'lodash-es/debounce'

interface Options {
  debounceTime?: number
  debug?: boolean
}

const DEFAULT_OPTIONS: Options = {
  debounceTime: 500,
  debug: false,
}

export default function (localStorageKey: string, localOptions: Options = {}) {
  const localStorageKeyData = `${localStorageKey}:data`
  const options = { ...DEFAULT_OPTIONS, ...localOptions }

  const isLoading = ref(false)
  const isLoaded = ref(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function storeOnUpdate(payload: any) {
    watch(
      () => payload.value,
      debounce(() => {
        if (!isLoaded.value) return

        if (options.debug) console.log('storing data')
        localStorage.setItem(localStorageKeyData, JSON.stringify(payload.value))
      }, options.debounceTime),
      { deep: true },
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function update(cb: Function) {
    isLoading.value = true
    if (options.debug) console.log('retrieving data')
    const dataAsString = localStorage.getItem(localStorageKeyData)
    if (dataAsString) {
      const data = JSON.parse(dataAsString)
      if (options.debug) console.log('data retrieved')
      cb(data)
    }
    isLoaded.value = true
    isLoading.value = false
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function updateOnMounted(cb: Function) {
    onMounted(() => {
      update(cb)
    })
  }

  return {
    isLoading,
    isLoaded,
    storeOnUpdate,
    update,
    updateOnMounted,
  }
}
