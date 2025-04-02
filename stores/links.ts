import * as Sentry from '@sentry/nuxt'

import LogoFehPeeler from '~/assets/images/feh-peeler-logo.png'
import LogoFandom from '~/assets/images/fandom-logo.png'
import LogoGame8 from '~/assets/images/game8-logo-square.png'

import {
  TARGET_FEH_PEELER,
  TARGET_FANDOM,
  TARGET_GAME8,
  DEFAULT_TARGET,
  type Target,
} from '~/utils/types/links'
import type { ISkill } from '~/utils/types/skills'
import type { IUnit } from '~/utils/types/units'

export const useStoreLinks = defineStore('links', () => {
  const { l: lFandom } = useFandom()
  const { l: lGame8 } = useGame8()

  const target = ref<Target>(DEFAULT_TARGET)

  const imageToUse = computed(() => imageFor(target.value))
  const htmlTarget = computed(() =>
    target.value === TARGET_FEH_PEELER ? '_self' : '_blank',
  )

  function imageFor(target: Target) {
    switch (target) {
      case TARGET_FEH_PEELER:
        return LogoFehPeeler
      case TARGET_FANDOM:
        return LogoFandom
      case TARGET_GAME8:
        return LogoGame8
    }
  }

  function setTarget(value: Target) {
    target.value = value
  }
  async function asyncSetTarget(value: Target) {
    setTarget(value)
  }

  function cycle() {
    switch (target.value) {
      case TARGET_FEH_PEELER:
        setTarget(TARGET_FANDOM)
        break
      case TARGET_FANDOM:
        setTarget(TARGET_GAME8)
        break
      case TARGET_GAME8:
        setTarget(TARGET_FEH_PEELER)
    }
  }

  function skillTo(skill?: ISkill) {
    if (!skill) return
    if (target.value === TARGET_FEH_PEELER)
      return `/skills-fodders?name=${encodeURIComponent(skill.name)}`
  }
  function unitTo(unit?: IUnit) {
    if (!unit) return
    if (target.value === TARGET_FEH_PEELER)
      return `/units-fodder?name=${encodeURIComponent(unit.full_name)}`
  }

  function skillHref(skill?: ISkill) {
    if (!skill) return

    switch (target.value) {
      case TARGET_FEH_PEELER:
        return
      case TARGET_FANDOM:
        return lFandom(skill.group_name)
      case TARGET_GAME8:
        return skill.game8_id ? lGame8(skill.game8_id) : undefined
    }
  }
  function unitHref(unit?: IUnit) {
    if (!unit) return

    switch (target.value) {
      case TARGET_FEH_PEELER:
        return
      case TARGET_FANDOM:
        return lFandom(unit.full_name)
      case TARGET_GAME8:
        return unit.game8_id ? lGame8(unit.game8_id) : undefined
    }
  }

  function storeInSession() {
    return $fetch('/api/update-links', {
      method: 'PUT',
      body: {
        target: target.value,
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
  watch(target, storeInSession)

  return {
    target,
    setTarget,
    asyncSetTarget,
    cycle,

    imageToUse,
    imageFor,
    htmlTarget,

    skillTo,
    unitTo,
    skillHref,
    unitHref,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreLinks, import.meta.hot))
}
