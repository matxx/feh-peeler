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
  const modalSkillIsOpen = ref(false)
  const shownSkillId = ref<SkillId>()
  const shownSkillTab = ref<SkillTab>()
  const modalUnitIsOpen = ref(false)
  const shownUnitId = ref<UnitId>()
  const shownUnitTab = ref<UnitTab>()
  function showSkill(skillId?: SkillId, tab: SkillTab = SKILL_DEFAULT_TAB) {
    if (!skillId) return

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

  const mobileUnitFilterElem = ref<HTMLElement | null>()
  function setMobileUnitFilterElem(val?: HTMLElement | null) {
    mobileUnitFilterElem.value = val
  }

  const mobileSkillFilterElem = ref<HTMLElement | null>()
  function setMobileSkillFilterElem(val?: HTMLElement | null) {
    mobileSkillFilterElem.value = val
  }

  return {
    modalSkillIsOpen,
    shownSkillId,
    shownSkillTab,
    modalUnitIsOpen,
    shownUnitId,
    shownUnitTab,
    showSkill,
    showUnit,
    hideSkill,
    hideUnit,

    sortedByAvailability,
    setSortedByAvailability,
    toggleSortedByAvailability,

    mobileUnitFilterElem,
    setMobileUnitFilterElem,

    mobileSkillFilterElem,
    setMobileSkillFilterElem,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreGlobals, import.meta.hot))
}
