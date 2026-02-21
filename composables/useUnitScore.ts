import max from 'lodash-es/max'
import sum from 'lodash-es/sum'
import filter from 'lodash-es/filter'
import compact from 'lodash-es/compact'

import { objectEntries, objectFromEntries } from '~/utils/functions/typeSafe'
import {
  SCORE_RARITY_CONSTANTS,
  DUEL_SKILL_SCORES,
  DUEL_SKILL_SCORES_TIER4,
  DUEL_SKILL_IDS,
  TEAM_BASE_SCORE,
  MAX_LEVEL,
  MAX_RARITY,
  // MAX_MERGES,
  GROWTH_RATE_DIFF,
  getEmptyUnitInstanceSkillSPs,
  type IUnitInstanceInScoreCalc,
  type ScoreContext,
} from '~/utils/types/score-calc'
import { SKILL_PASSIVE_A } from '~/utils/types/skills'
import { BANE, BOON, STATS } from '~/utils/types/units-stats'
import { MOVE_A } from '~/utils/types/moves'
import { getEmptyUnitInstanceSkillIds } from '~/utils/types/units'

// https://feheroes.fandom.com/wiki/Stat_growth#General_level_up_formula
const statAtLevel = (
  statLevel1: number,
  level: number,
  rarity: number,
  growthRate: number,
) => {
  const appliedGrowthRate = Math.floor(growthRate * (0.79 + 0.07 * rarity))
  return statLevel1 + Math.floor(((level - 1) * appliedGrowthRate) / 100)
}

export default function useUnitScore(
  unitInstance: Ref<IUnitInstanceInScoreCalc>,
  scoreContext: Ref<ScoreContext>,
) {
  const storeDataUnits = useStoreDataUnits()
  const storeDataUnitsStats = useStoreDataUnitsStats()
  const storeDataSkills = useStoreDataSkills()

  const unit = computed(() => {
    return unitInstance.value.id
      ? storeDataUnits.unitsById[unitInstance.value.id]
      : undefined
  })
  const chosenHero = computed(() => {
    return unitInstance.value.chosenHeroId
      ? storeDataUnits.unitsById[unitInstance.value.chosenHeroId]
      : undefined
  })

  const unitStat = computed(() =>
    unitInstance.value.id
      ? storeDataUnitsStats.statsById[unitInstance.value.id]
      : undefined,
  )

  const isChosenInSeason = computed(() => {
    if (!unit.value) return false
    if (!unit.value.is_chosen) return false

    const element = unit.value.element
    if (!element) return false

    // @ts-expect-error ElementMythic handled here
    return scoreContext.value.seasonElements.includes(element)
  })

  const rarityConstants = computed(
    () => SCORE_RARITY_CONSTANTS[unitInstance.value.rarity - 1],
  )
  const rarityBaseValue = computed(() => rarityConstants.value.baseValue)
  const rarityLevelFactor = computed(() => rarityConstants.value.levelFactor)

  const totalSkillSPs = computed(() =>
    sum(objectEntries(unitInstance.value.skillSPs).map(([_, sp]) => sp || 0)),
  )
  const visibleSkillSPs = computed(() =>
    isChosenInSeason.value
      ? unit.value?.skills_max_sp || 0
      : totalSkillSPs.value,
  )

  const superBoons = computed(() =>
    unitStat.value
      ? filter(STATS, (stat) => unitStat.value![`iv_${stat}`] === BOON)
      : [],
  )
  const superBanes = computed(() =>
    unitStat.value
      ? filter(STATS, (stat) => unitStat.value![`iv_${stat}`] === BANE)
      : [],
  )
  const hasSuperBoon = computed(() => superBoons.value.length > 0)

  const maxBst = computed(() =>
    unit.value ? unit.value.bst + (hasSuperBoon ? 4 : 3) : 0,
  )

  // TODO: stats are only correct at level40...
  // implement the correct formulas, available at
  // https://feheroes.fandom.com/wiki/module:StatTable?action=edit
  // but needs to have BVIDs in the data...
  // https://feheroes.fandom.com/wiki/Special:CargoTables/HeroBVIDs
  const stats = computed(() =>
    objectFromEntries(
      STATS.map((stat) => {
        if (!unitStat.value) return [stat, 0]

        let level1 = unitStat.value[`level1_${stat}`]
        let growthRate = unitStat.value[`growth_rate_${stat}`]
        if (unitInstance.value.boon === stat) {
          level1 += 1
          growthRate += GROWTH_RATE_DIFF
        }
        if (
          unitInstance.value.bane === stat &&
          unitInstance.value.merges === 0
        ) {
          level1 -= 1
          growthRate -= GROWTH_RATE_DIFF
        }

        return [
          stat,
          statAtLevel(
            level1,
            unitInstance.value.level,
            unitInstance.value.rarity,
            growthRate,
          ),
        ]
      }),
    ),
  )
  const bst = computed(() => sum(objectEntries(stats.value).map(([, v]) => v)))

  const isMaxLevelRarity = computed(
    () =>
      unitInstance.value.level === MAX_LEVEL &&
      unitInstance.value.rarity === MAX_RARITY,
  )
  const duelEffectVisibleBst = computed(() => {
    if (!isMaxLevelRarity.value) return

    return unit.value?.duel_score
  })
  const clashEffectVisibleBst = computed(() =>
    isChosenInSeason.value ? unit.value?.clash_score : undefined,
  )
  const duelSkillVisibleBst = computed(() => {
    if (!isMaxLevelRarity.value) return

    const skillId = unitInstance.value.skillIds[SKILL_PASSIVE_A]
    if (!skillId) return
    if (!DUEL_SKILL_IDS.includes(skillId)) return

    const skill = storeDataSkills.skillsById[skillId]
    if (!skill) return

    if (skill.tier < 4) return DUEL_SKILL_SCORES[skill.tier - 1]
    if (!unit.value) return

    return unit.value.is_legendary || unit.value.is_mythic
      ? DUEL_SKILL_SCORES_TIER4.min
      : DUEL_SKILL_SCORES_TIER4.max
  })

  const visibleBst = computed(() => {
    const possibleBsts = compact([
      bst.value,
      duelEffectVisibleBst.value,
      clashEffectVisibleBst.value,
      duelSkillVisibleBst.value,
    ])
    return max(possibleBsts) || 0
  })

  const hasAccessToDuelSkill = computed(() => {
    if (!unit.value) return false

    return unit.value.move_type !== MOVE_A
  })
  const needsDuelSkill = computed(() => {
    if (!unit.value) return false
    if (unit.value.is_legendary) {
      return unit.value.duel_score < DUEL_SKILL_SCORES_TIER4.min
    }
    if (unit.value.is_duo) {
      return unit.value.duel_score < DUEL_SKILL_SCORES_TIER4.max
    }

    return maxBst.value < DUEL_SKILL_SCORES_TIER4.max
  })

  const bonusMergesCount = computed(() => {
    if (!unit.value) return 0
    if (!unit.value.is_mythic) return 0
    if (!scoreContext.value.mjolnirStrike.isActive) return 0

    if (unit.value.element === scoreContext.value.mjolnirStrike.major) return 10
    if (unit.value.element === scoreContext.value.mjolnirStrike.minor) return 5

    return 0
  })

  const blessingScore = computed(() => {
    if (!unit.value) return 0
    if (unit.value.is_legendary) return 0

    const element = chosenHeroIsInSeason.value
      ? chosenHero.value?.element
      : unit.value.element || unitInstance.value.blessing
    if (!element) return 0

    // @ts-expect-error ElementMythic handled here
    if (!scoreContext.value.seasonElements.includes(element)) {
      return 0
    }

    // @ts-expect-error ElementMythic handled here
    return (scoreContext.value.legendaryCounts[element] || 0) * 4
  })

  const scorePartRarity = computed(() => rarityBaseValue.value)
  const scorePartLevel = computed(() =>
    Math.floor(rarityLevelFactor.value * unitInstance.value.level),
  )
  const scorePartMerges = computed(
    () => (unitInstance.value.merges + bonusMergesCount.value) * 2,
  )
  const scorePartSPs = computed(() => Math.floor(visibleSkillSPs.value / 100))
  const scorePartBST = computed(() => Math.floor(visibleBst.value / 5))
  const scorePartBlessing = computed(() => blessingScore.value)
  const baseScore = computed(() =>
    unit.value
      ? sum([
          scorePartRarity.value,
          scorePartLevel.value,
          scorePartMerges.value,
          scorePartSPs.value,
          scorePartBST.value,
          scorePartBlessing.value,
        ])
      : 0,
  )
  const finalScore = computed(() =>
    unit.value
      ? (TEAM_BASE_SCORE + baseScore.value) * scoreContext.value.bonusFactor
      : 0,
  )

  const chosenHeroScoreData = computed(() => {
    if (!unitInstance.value.chosenHeroId) return

    const chosenHeroInstance: IUnitInstanceInScoreCalc = {
      id: unitInstance.value.chosenHeroId,

      skillIds: getEmptyUnitInstanceSkillIds(),
      skillSPs: getEmptyUnitInstanceSkillSPs(),

      level: MAX_LEVEL,
      rarity: MAX_RARITY,
      merges: unitInstance.value.chosenHeroMerges,
      boon: null,
      bane: null,
      blessing: chosenHero.value?.element || null,

      chosenHeroId: null,
      chosenHeroMerges: 0,
    }
    const data = useUnitScore(ref(chosenHeroInstance), scoreContext)

    // MONKEY PATCH :
    // recursive use of `useUnitScore` does not work correctly
    // so we need to type cast those values
    const baseScore = data.baseScore.value as number
    const finalScore = data.finalScore.value as number
    const inSeason = data.isChosenInSeason.value as boolean

    return {
      baseScore,
      finalScore,
      inSeason,
    }
  })
  const chosenHeroBaseScore = computed(
    () => chosenHeroScoreData.value?.baseScore,
  )
  const chosenHeroFinalScore = computed(
    () => chosenHeroScoreData.value?.finalScore,
  )
  const chosenHeroIsInSeason = computed(
    () => !!chosenHeroScoreData.value?.inSeason,
  )

  const visibleBaseScore = computed(
    () => max(compact([baseScore.value, chosenHeroBaseScore.value])) || 0,
  )
  const visibleFinalScore = computed(
    () => max(compact([finalScore.value, chosenHeroFinalScore.value])) || 0,
  )

  return {
    unit,
    superBoons,
    superBanes,

    stats,
    bst,
    visibleBst,
    totalSkillSPs,
    visibleSkillSPs,
    bonusMergesCount,

    isChosenInSeason,

    scorePartRarity,
    scorePartLevel,
    scorePartMerges,
    scorePartSPs,
    scorePartBST,
    scorePartBlessing,

    chosenHero,
    chosenHeroBaseScore,
    chosenHeroFinalScore,
    chosenHeroIsInSeason,

    baseScore,
    finalScore,
    visibleBaseScore,
    visibleFinalScore,

    hasAccessToDuelSkill,
    needsDuelSkill,
  }
}
