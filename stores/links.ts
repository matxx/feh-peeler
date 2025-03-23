import * as Sentry from '@sentry/nuxt'

import LogoFandom from '~/assets/images/fandom-logo.png'
import LogoGame8 from '~/assets/images/game8-logo-square.png'

import type { ISkill } from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

export const useStoreLinks = defineStore('links', () => {
  const { l: lFandom } = useFandom()
  const { l: lGame8 } = useGame8()

  const shoudLinkToFandom = ref(false)

  const imageToUse = computed(() =>
    shoudLinkToFandom.value ? LogoFandom : LogoGame8,
  )

  const websiteToUse = computed(() =>
    shoudLinkToFandom.value ? WEBSITE_NAME_FANDOM : WEBSITE_NAME_GAME8,
  )

  function setShoudLinkToFandom(value: boolean) {
    shoudLinkToFandom.value = !!value
  }
  async function asyncSetShoudLinkToFandom(value: boolean) {
    setShoudLinkToFandom(value)
  }
  function toggle() {
    shoudLinkToFandom.value = !shoudLinkToFandom.value
  }

  function skill(skill?: ISkill) {
    if (!skill) return

    if (shoudLinkToFandom.value) {
      return lFandom(skill.group_name)
    } else {
      return skill.game8_id ? lGame8(skill.game8_id) : undefined
    }
  }
  function unit(unit?: IUnit) {
    if (!unit) return

    if (shoudLinkToFandom.value) {
      return lFandom(unit.full_name)
    } else {
      return unit.game8_id ? lGame8(unit.game8_id) : undefined
    }
  }

  function storeInSession() {
    return $fetch('/api/update-links', {
      method: 'PUT',
      body: {
        shoudLinkToFandom: shoudLinkToFandom.value,
      },
    }).then(
      async () => {},
      (error) => {
        Sentry.captureException(error, {
          tags: { locator: 'stores/links/storeInSession' },
        })
      },
    )
  }
  watch(shoudLinkToFandom, storeInSession)

  return {
    shoudLinkToFandom,
    setShoudLinkToFandom,
    asyncSetShoudLinkToFandom,
    toggle,

    imageToUse,
    websiteToUse,

    skill,
    unit,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreLinks, import.meta.hot))
}
