import {
  SEAL_DEFAULT_TAB,
  type SealId,
  type SealTab,
} from '~/utils/types/seals'
import {
  SKILL_DEFAULT_TAB,
  type SkillId,
  type SkillTab,
} from '~/utils/types/skills'
import {
  UNIT_DEFAULT_TAB,
  type UnitId,
  type UnitTab,
} from '~/utils/types/units'

export const useStoreGlobals = defineStore('globals', () => {
  const modalSealIsOpen = ref(false)
  const shownSealId = ref<SealId>()
  const shownSealTab = ref<SealTab>()

  const modalSkillIsOpen = ref(false)
  const shownSkillId = ref<SkillId>()
  const shownSkillTab = ref<SkillTab>()

  const modalUnitIsOpen = ref(false)
  const shownUnitId = ref<UnitId>()
  const shownUnitTab = ref<UnitTab>()

  function showSeal(sealId?: SealId, tab: SealTab = SEAL_DEFAULT_TAB) {
    if (!sealId) return

    hideSkill()
    hideUnit()

    shownSealTab.value = tab
    shownSealId.value = sealId
    modalSealIsOpen.value = true
  }
  function hideSeal() {
    shownSealId.value = undefined
    shownSealTab.value = undefined
    modalSealIsOpen.value = false
  }

  function showSkill(skillId?: SkillId, tab: SkillTab = SKILL_DEFAULT_TAB) {
    if (!skillId) return

    hideSeal()
    hideUnit()

    shownSkillTab.value = tab
    shownSkillId.value = skillId
    modalSkillIsOpen.value = true
  }
  function hideSkill() {
    shownSkillId.value = undefined
    shownSkillTab.value = undefined
    modalSkillIsOpen.value = false
  }

  function showUnit(unitId?: UnitId, tab: UnitTab = UNIT_DEFAULT_TAB) {
    if (!unitId) return

    hideSeal()
    hideSkill()

    shownUnitTab.value = tab
    shownUnitId.value = unitId
    modalUnitIsOpen.value = true
  }
  function hideUnit() {
    shownUnitId.value = undefined
    shownUnitTab.value = undefined
    modalUnitIsOpen.value = false
  }

  const sortedByAvailability = ref(true)
  function setSortedByAvailability(value: boolean) {
    sortedByAvailability.value = value
  }
  async function toggleSortedByAvailability() {
    sortedByAvailability.value = !sortedByAvailability.value
  }

  const mobileSealFilterElem = ref<HTMLElement | null>()
  function setMobileSealFilterElem(val?: HTMLElement | null) {
    mobileSealFilterElem.value = val
  }

  const mobileUnitFilterElem = ref<HTMLElement | null>()
  function setMobileUnitFilterElem(val?: HTMLElement | null) {
    mobileUnitFilterElem.value = val
  }

  const mobileSkillFilterElem = ref<HTMLElement | null>()
  function setMobileSkillFilterElem(val?: HTMLElement | null) {
    mobileSkillFilterElem.value = val
  }

  return {
    shownSealTab,
    shownSealId,
    modalSealIsOpen,

    modalSkillIsOpen,
    shownSkillId,
    shownSkillTab,

    modalUnitIsOpen,
    shownUnitId,
    shownUnitTab,

    showSeal,
    hideSeal,

    showSkill,
    hideSkill,

    showUnit,
    hideUnit,

    sortedByAvailability,
    setSortedByAvailability,
    toggleSortedByAvailability,

    mobileSealFilterElem,
    setMobileSealFilterElem,

    mobileUnitFilterElem,
    setMobileUnitFilterElem,

    mobileSkillFilterElem,
    setMobileSkillFilterElem,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGlobals, import.meta.hot))
}
