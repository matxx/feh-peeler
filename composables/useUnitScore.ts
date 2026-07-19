import max from 'lodash-es/max'
import sum from 'lodash-es/sum'
import uniq from 'lodash-es/uniq'
import filter from 'lodash-es/filter'
import compact from 'lodash-es/compact'
import intersection from 'lodash-es/intersection'

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
import { SORTED_LEGENDARY_ELEMENTS } from '~/utils/types/elements'

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
  isAttachedChosenHero: boolean = false,
) {
  const storeDataUnits = useStoreDataUnits()
  const storeDataUnitsStats = useStoreDataUnitsStats()
  const storeDataSkills = useStoreDataSkills()

  function baseToFinalScore(baseScore: number) {
    return (TEAM_BASE_SCORE + baseScore) * scoreContext.value.bonusFactor
  }

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
    unit.value ? unit.value.bst + (hasSuperBoon.value ? 4 : 3) : 0,
  )

  // TODO: stats are only correct at level40...
  // implement the correct formulas, available at
  // https://feheroes.fandom.com/wiki/module:StatTable?action=edit
  // but needs to have BVIDs in the data...
  // https://feheroes.fandom.com/wiki/Special:CargoTables/HeroBVIDs
  const rawStats = computed(() =>
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

  // neutral (no boon, no bane) units merged at least once
  // get +1 on their 3 highest stats
  // https://feheroes.fandom.com/wiki/Merge_Allies
  const isNeutralAndMerged = computed(
    () =>
      unitInstance.value.merges >= 1 &&
      !unitInstance.value.boon &&
      !unitInstance.value.bane,
  )
  const stats = computed(() => {
    if (!isNeutralAndMerged.value) return rawStats.value

    const top3Stats = [...STATS]
      .sort((a, b) => rawStats.value[b] - rawStats.value[a])
      .slice(0, 3)

    return objectFromEntries(
      STATS.map((stat) => [
        stat,
        rawStats.value[stat] + (top3Stats.includes(stat) ? 1 : 0),
      ]),
    )
  })

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

    if (unit.value.duel_score) {
      if (unit.value.is_legendary) {
        return unit.value.duel_score < DUEL_SKILL_SCORES_TIER4.min
      }
      if (unit.value.is_duo) {
        return unit.value.duel_score < DUEL_SKILL_SCORES_TIER4.max
      }
    }

    return unit.value.is_mythic
      ? maxBst.value < DUEL_SKILL_SCORES_TIER4.min
      : maxBst.value < DUEL_SKILL_SCORES_TIER4.max
  })

  const bonusMergesCount = computed(() => {
    if (!unit.value) return 0
    if (!unit.value.is_mythic) return 0
    if (!scoreContext.value.mjolnirStrike.isActive) return 0

    if (unit.value.element === scoreContext.value.mjolnirStrike.major) return 10
    if (unit.value.element === scoreContext.value.mjolnirStrike.minor) return 5

    return 0
  })

  // both blessings (normal blessing and chosen hero blessing)
  // can increase score with resp. legendary units
  const blessingScore = computed(() => {
    if (!unit.value) return 0
    // legendaries do not get bonuses from other legendaries
    if (unit.value.is_legendary) return 0
    // attached chosen heroes do not get bonuses from legendaries
    if (isAttachedChosenHero) return 0

    if (unit.value.is_mythic) return mythicBlessingScore.value

    return (
      sum(
        uniq(
          compact([
            unit.value.is_chosen
              ? unit.value.element
              : unitInstance.value.blessing,
            chosenHeroIsInSeason.value ? chosenHero.value?.element : null,
          ]),
        ).map((element) => {
          if (!scoreContext.value.seasonElements.includes(element)) {
            return 0
          }

          // @ts-expect-error ElementMythic handled here
          return scoreContext.value.legendaryCounts[element] || 0
        }),
      ) * 4
    )
  })
  const mythicBlessingScore = computed(() => {
    if (!unit.value) return 0
    if (!unit.value.is_mythic) return 0
    if (!unit.value.element) return 0

    const relevantElements = scoreContext.value.seasonElements.includes(
      unit.value.element,
    )
      ? // an in-season mythic unit receives bonuses from all in season legendaries
        intersection(
          scoreContext.value.seasonElements,
          SORTED_LEGENDARY_ELEMENTS,
        )
      : chosenHero.value && chosenHeroIsInSeason.value
        ? // an out-of-season mythic w/ in-season chosen hero receives bonuses from that season only
          [chosenHero.value.element]
        : // an out-of-season mythic w/o in-season chosen hero receives no bonuses
          []

    return (
      sum(
        compact(
          relevantElements.map(
            // @ts-expect-error ElementMythic handled here
            (element) => scoreContext.value.legendaryCounts[element],
          ),
        ),
      ) * 4
    )
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
  const baseScoreBeforeBlessing = computed(() =>
    unit.value
      ? sum([
          scorePartRarity.value,
          scorePartLevel.value,
          scorePartMerges.value,
          scorePartSPs.value,
          scorePartBST.value,
        ])
      : 0,
  )
  const baseScore = computed(
    () => baseScoreBeforeBlessing.value + scorePartBlessing.value,
  )
  const finalScoreBeforeBlessing = computed(() =>
    unit.value ? baseToFinalScore(baseScoreBeforeBlessing.value) : 0,
  )
  const finalScore = computed(() =>
    unit.value ? baseToFinalScore(baseScore.value) : 0,
  )

  // a chosen hero attached onto a legendary only has its score used/compared
  // if it shares the same element as that legendary
  const chosenHeroElementMismatch = computed(() => {
    if (!unitInstance.value.chosenHeroId) return false
    if (!unit.value?.is_legendary) return false
    if (!chosenHero.value) return false

    return chosenHero.value.element !== unit.value.element
  })

  const chosenHeroScoreData = computed(() => {
    if (!unitInstance.value.chosenHeroId) return
    if (chosenHeroElementMismatch.value) return

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
    // a chosen hero attached onto a legendary
    // will not have score boost from that legendary
    let adjustedScoreContext
    if (unit.value?.is_legendary) {
      adjustedScoreContext = ref(JSON.parse(JSON.stringify(scoreContext.value)))
      adjustedScoreContext.value.legendaryCounts[unit.value.element!] -= 1
    } else {
      adjustedScoreContext = scoreContext
    }
    const data = useUnitScore(
      ref(chosenHeroInstance),
      adjustedScoreContext,
      true,
    )

    // MONKEY PATCH :
    // typings do not seem to work with recursive use of `useUnitScore`
    // so we need to type cast those values
    const baseScore = data.baseScore.value as number
    const baseScoreBeforeBlessing = data.baseScoreBeforeBlessing.value as number
    const finalScoreBeforeBlessing = data.finalScoreBeforeBlessing
      .value as number
    const finalScore = data.finalScore.value as number
    const inSeason = data.isChosenInSeason.value as boolean

    return {
      baseScore,
      baseScoreBeforeBlessing,
      finalScoreBeforeBlessing,
      finalScore,
      inSeason,
    }
  })
  const chosenHeroBaseScore = computed(
    () => chosenHeroScoreData.value?.baseScore,
  )
  const chosenHeroBaseScoreBeforeBlessing = computed(
    () => chosenHeroScoreData.value?.baseScoreBeforeBlessing,
  )
  const chosenHeroFinalScoreBeforeBlessing = computed(
    () => chosenHeroScoreData.value?.finalScoreBeforeBlessing,
  )
  const chosenHeroFinalScore = computed(
    () => chosenHeroScoreData.value?.finalScore,
  )
  const chosenHeroIsInSeason = computed(
    () => !!chosenHeroScoreData.value?.inSeason,
  )

  // the unit's own score and its attached chosen hero's score are compared
  // *without* the blessing bonus, which is then added on top of whichever of
  // the two wins - a blessing shouldn't let a lower base score win the
  // comparison against a higher one it wouldn't otherwise have beaten
  const visibleBaseScoreBeforeBlessing = computed(
    () =>
      max(
        compact([
          baseScoreBeforeBlessing.value,
          chosenHeroBaseScoreBeforeBlessing.value,
        ]),
      ) || 0,
  )
  const visibleBaseScore = computed(
    () => visibleBaseScoreBeforeBlessing.value + scorePartBlessing.value,
  )
  const visibleFinalScore = computed(() =>
    unit.value ? baseToFinalScore(visibleBaseScore.value) : 0,
  )

  return {
    unit,
    superBoons,
    superBanes,

    stats,
    bst,
    duelEffectVisibleBst,
    clashEffectVisibleBst,
    duelSkillVisibleBst,
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
    chosenHeroBaseScoreBeforeBlessing,
    chosenHeroFinalScoreBeforeBlessing,
    chosenHeroFinalScore,
    chosenHeroIsInSeason,
    chosenHeroElementMismatch,

    baseScore,
    baseScoreBeforeBlessing,
    finalScoreBeforeBlessing,
    finalScore,
    visibleBaseScore,
    visibleFinalScore,

    hasAccessToDuelSkill,
    needsDuelSkill,
  }
}
