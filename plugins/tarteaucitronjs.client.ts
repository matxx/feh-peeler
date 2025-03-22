import {
  // PRIVACY_POLICY_URL,
  // READ_MORE_URL,
  URL_HASH_FOR_COOKIE_MANAGEMENT,
} from '@/utils/constants'
import getGtagUA from '@/utils/runtime/gtag-ua'

export default defineNuxtPlugin(async () => {
  // @ts-expect-error global var
  if (typeof tarteaucitron === 'undefined') return

  // @ts-expect-error tarteaucitron has no types
  tarteaucitron.init({
    // privacyUrl: PRIVACY_POLICY_URL /* Privacy policy url */,

    showDetailsOnClick: false,

    hashtag:
      URL_HASH_FOR_COOKIE_MANAGEMENT /* Open the panel with this hashtag */,
    cookieName: 'cookie-management' /* Cookie name */,

    bodyPosition:
      'bottom' /* or top to bring it as first element for accessibility */,
    orientation: 'middle' /* Banner position (top - bottom) */,
    showAlertSmall: false /* Show the small banner on bottom right */,
    cookieslist: false /* Show the cookie list */,

    adblocker: false /* Show a Warning if an adblocker is detected */,
    DenyAllCta: true /* Show the deny all button */,
    AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
    highPrivacy: true /* Disable auto consent */,
    handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,
    removeCredit: true /* Remove credit link */,
    moreInfoLink: true /* Show more info link */,
    useExternalCss:
      false /* If false, the tarteaucitron.css file will be loaded */,
    // "cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

    // readmoreLink: READ_MORE_URL /* Change the default readmore link pointing to tarteaucitron.io */,

    mandatory: true /* Show a message about mandatory cookies */,

    closePopup: false /* Show a close X on the banner */,

    showIcon: false /* Show cookie icon to manage cookies */,
    // iconSrc: '/images/cookie.png' /* Optionnal: URL or base64 encoded image */,
    // iconPosition:
    //   'BottomRight' /* BottomRight, BottomLeft, TopRight and TopLeft */,

    googleConsentMode: true,
  })

  const gtagUa = getGtagUA()
  if (gtagUa) {
    // @ts-expect-error tarteaucitron has no types
    tarteaucitron.user.gtagUa = getGtagUA()
    // @ts-expect-error tarteaucitron has no types
    ;(tarteaucitron.job = tarteaucitron.job || []).push('gtag')
    // @ts-expect-error tarteaucitron has no types
    ;(tarteaucitron.job = tarteaucitron.job || []).push('gcmanalyticsstorage')
  }

  // @ts-expect-error tarteaucitron has no types
  // MOKEYPATCH :
  // tarteaucitron script is supposed to be
  // loaded synchronously at the top of the DOM
  // it adds a listener on the window "load" event to launch itself
  // but in nuxt, the execution of this plugin
  // can happen after the "load" event
  // so we need to launch it manually here
  tarteaucitron.load()
})
