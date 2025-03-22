import { GENERIC_ERROR_TEXT, type IOptions } from '~/utils/types/snackbar'

export const useStoreSnackbar = defineStore('snackbar', {
  state: () => ({
    active: false,
    options: {
      text: '',
      color: undefined,
      mode: undefined,
      timeout: undefined,
    },
  }),
  actions: {
    addToastWithGenericError() {
      this.addToast({ text: GENERIC_ERROR_TEXT })
    },
    addToast(options: IOptions) {
      this.active = true
      Object.assign(this.options, { timeout: 4000, ...options })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreSnackbar, import.meta.hot))
}
