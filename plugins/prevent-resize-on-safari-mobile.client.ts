// https://weblog.west-wind.com/posts/2023/Apr/17/Preventing-iOS-Safari-Textbox-Zooming
export default defineNuxtPlugin(async () => {
  if (navigator.userAgent.indexOf('iPhone') > -1) {
    const meta = document.querySelector('[name=viewport]')
    if (!meta) return

    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1',
    )
  }
})
