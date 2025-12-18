import * as availability from '~/utils/types/units-availabilities'
import * as grades from '~/utils/types/grades'
import { IVS_HASH } from '~/utils/types/IVs'
import * as skills from '~/utils/types/skills'
import * as skillsColumns from '~/utils/types/skills-columns'
import * as skillsFilters from '~/utils/types/skills-filters'
import * as units from '~/utils/types/units'
import * as unitsColumns from '~/utils/types/units-columns'
import * as unitsFilters from '~/utils/types/units-filters'
import * as bindingWorlds from '~/utils/events/binding-worlds'
import * as obfuscatedKeys from '~/utils/types/obfuscated-keys'
import * as themes from '~/utils/types/themes'
import * as UnitsStats from '~/utils/types/units-stats'
import * as hgs from '~/utils/types/units-heroicGrails'
import * as moves from '~/utils/types/moves'

export default {
  global: {
    NA: 'N/A',
    total: 'Total',

    inpiredBy: 'Inspired by',
    post: 'post | post | posts',
    video: 'video',

    availability: 'Availability',
    skillName: 'Skill Name',
    unitName: 'Unit Name',

    noSkillIsMatchingYourRequest: 'No skill is matching your request',
    noUnitIsMatchingYourRequest: 'No unit is matching your request',
    nothingIsMatchingYourRequest: 'Nothing is matching your request',
    invalidRegExp: 'Invalid regular expression',

    useRegexInSearches: 'Use RegExp in searches',
    useTextInSearches: 'Use Text in searches',
    typeAtLeastThreeCharacters: 'Type at least three characters',

    warningAboutMobile:
      'This page is hard to use at the moment on mobile, you should try it on a desktop',

    name: 'Name',

    details: 'Details',
    sp: 'SP',
    exclusiveSkill: 'Exclusive Skill',
    all: 'All',

    reset: 'Reset',
    confirmReset: 'Units and skills will be lost, are you sure ?',

    game8: {
      allRatingsAreFrom: 'All ratings are from',
      ratingsMention: `All ratings are from [url={url}][img height="{height}" title="{title}" alt="{alt}"]{imageUrl}[/img][/url]`,
      logo: {
        title: 'Game8',
        alt: 'Logo Game8',
      },
    },

    copiedToClipboard: 'copied to clipboard',
    add: 'add',
    update: 'update',
    download: 'Download',
    upload: 'Upload',
    loadSave: 'Load / Save',

    IVs: IVS_HASH,

    assets: {
      icons: {
        alt: {
          rarity: {
            '1': 'Rarity 1 stars',
            '2': 'Rarity 2 stars',
            '3': 'Rarity 3 stars',
            '4': 'Rarity 4 stars',
            '5': 'Rarity 5 stars',
            '4.5': 'Rarity 4.5 stars',
          },
          skills: {
            [skills.SKILL_WEAPON]: 'Icon Weapon',
            [skills.SKILL_ASSIST]: 'Icon Assist',
            [skills.SKILL_SPECIAL]: 'Icon Special',
            [skills.SKILL_PASSIVE_A]: 'Icon A Passive',
            [skills.SKILL_PASSIVE_B]: 'Icon B Passive',
            [skills.SKILL_PASSIVE_C]: 'Icon C Passive',
            [skills.SKILL_PASSIVE_S]: 'Icon S Passive',
            [skills.SKILL_PASSIVE_X]: 'Icon X Passive',
          },
          grades: {
            [grades.GRADE_SS]: 'Icon Grade SS',
            [grades.GRADE_S]: 'Icon Grade S',
            [grades.GRADE_A]: 'Icon Grade A',
            [grades.GRADE_B]: 'Icon Grade B',
            [grades.GRADE_C]: 'Icon Grade C',
          },
          dragonflowers: {
            [moves.MOVE_I]: 'Icon dragonflowers red (infantry)',
            [moves.MOVE_A]: 'Icon dragonflowers green (armored)',
            [moves.MOVE_C]: 'Icon dragonflowers yellow (cavalry)',
            [moves.MOVE_F]: 'Icon dragonflowers blue (flying)',
          },
          elements: {
            [unitsFilters.ELEMENT_FIRE]: 'Icon Fire',
            [unitsFilters.ELEMENT_WATER]: 'Icon Water',
            [unitsFilters.ELEMENT_WIND]: 'Icon Wind',
            [unitsFilters.ELEMENT_EARTH]: 'Icon Earth',
            [unitsFilters.ELEMENT_LIGHT]: 'Icon Light',
            [unitsFilters.ELEMENT_DARK]: 'Icon Dark',
            [unitsFilters.ELEMENT_ASTRA]: 'Icon Astra',
            [unitsFilters.ELEMENT_ANIMA]: 'Icon Anima',
          },
        },
      },
    },

    listSkills: {
      select: 'Copy skill name in filter',
      equip: 'Equip skill',
    },

    warningLocalStorage: {
      isNotAvailable: 'is not available !',
      changesWillNotBeSaved: 'Changes will not be saved.',
      youShouldTryToMakeItAvailableForABetterExperience:
        'You should try to make it available for a better experience.',
    },
  },

  saves: {
    saveAs: 'Save as',
    availableSaves: 'Available Saves',
    load: 'Load',
    update: 'Update',
    delete: 'Delete',
  },

  skillsOwners: {
    labels: {
      name: 'Name',
    },
    order: {
      title: 'Availability order',

      [availability.AV_SCORE_GENERIC_POOL_3_4]: '3★ / 4★',
      [availability.AV_SCORE_GENERIC_POOL_45]: '4★ SR',
      [availability.AV_SCORE_GENERIC_POOL_5]: '5★',
      [availability.AV_SCORE_HEROIC_GRAILS]: 'Heroic Grails',
      // [availability.AV_SCORE_LIMITED_DIVINE_CODES]: 'Limited Divine Codes',
      // [availability.AV_SCORE_NORMAL_DIVINE_CODES]: 'Divine Codes',
      [availability.AV_SCORE_SPECIAL_POOL_4]: '4★ SH',
      [availability.AV_SCORE_SPECIAL_POOL_45]: '4★ SHSR',
      [availability.AV_SCORE_SPECIAL_POOL_5]: '5★ SH',
      [availability.AV_SCORE_LIMITED_HEROES]: '5★ Limited Heroes',

      legends: {
        sh: 'SH: Special Heroes',
        sr: 'SR: Special Rate',
      },
    },
    columns: {
      image: 'Image',
      name: 'Name',
      availability: 'Availability',
      'pre-inheritance': 'Pre inheritance',
    },
    availability: {
      genericSummonPool: 'Generic Summon Pool',
      limitedHeroes: 'Limited Heroes',
      limitedHeroesList:
        'Legendaries, Mythics, Chosen, Emblems, Aided, Attuned, Entwined, Rearmed',
      specialHeroes: 'Sperial Heroes',

      heroicGrails: 'Heroic Grails',

      divineCode: 'Divine Code',
      part: 'Part',

      limitedDivineCode: 'Limited Divine Code',
    },
    owners: {
      unit: 'Unit',
      availability: 'Availability',
      equippedAt: 'Equipped at',
      unlockAt: 'Unlock at',
    },
  },

  skillsList: {
    labels: {
      filtersCount: 'number of filters',
      highlightedFiltersIndexes: 'indexes of highlighted filters',
      showRestrictions: 'show restrictions',
      showDescriptions: 'show descriptions',
      choice: 'choice {number}',
    },
    tooltips: {
      emptyFilters: 'empty filters',
    },
    tabs: {
      [skills.SKILL_WEAPON]: 'Weapon',
      [skills.SKILL_ASSIST]: 'Assist',
      [skills.SKILL_SPECIAL]: 'Special',
      [skills.SKILL_PASSIVE_A]: 'A Passive',
      [skills.SKILL_PASSIVE_B]: 'B Passive',
      [skills.SKILL_PASSIVE_C]: 'C Passive',
      [skills.SKILL_PASSIVE_S]: 'S Passive',
      [skills.SKILL_PASSIVE_X]: 'X Passive',
    },
    columns: {
      actions: '',

      name: 'Name',
      image: 'Image',
      title: 'Title',
      // game8_id: 'Game8 ID',
      game8_grade: 'Grade',
      game8_rating: 'Rating',
      restrictions: 'Restrictions',
      kind: 'Type',
      description: 'Description',
      how_to_obtain: 'How to obtain',
      sp: 'SP',
      recommended_boon: 'Recommended (no merge) Boon',
      recommended_bane: 'Recommended (no merge) Bane',
      recommended_plus10: 'Recommended (+10) Boon',
    },
  },

  hallOfForms: {
    resources: {
      usefullResources: 'Usefull resources',
      line1:
        'You should check out those two youtube channels when a Hall Of Forms is on the horizon :',
      line2:
        'They generally post really well made videos about it, with tons of usefull information and recommended builds.',
      line3: 'You can also check',
      line4:
        'They generally publish beautiful and helpful infographics on Hall Of Forms.',
    },
    showSP: 'show SPs',
    showDescriptions: 'show descriptions',
    linkTo: 'Link to',
    selectUnit: 'Select unit',
    unitName: 'Unit Name',
  },

  bindingWorlds: {
    showAll: 'Show All',

    addUnit: 'Add Unit',
    totalSP: 'Total SP',
    game8Rating: 'Game8 rating',

    confirmUnitDeletion: 'Unit will be removed, are you sure ?',

    labels: {
      enclosureLevel: 'Enclosure Level',
      hidingReason: 'Reason for hiding',
      rating: 'Your Rating',
      notes: 'Notes',

      unitName: 'Unit Name',

      boon: 'Boon',
      boonAscended: 'Ascended Boon',
      bane: 'Bane',
    },

    hidingReasons: {
      [bindingWorlds.HIDING_REASON_GENERIC_SUMMON]: 'Generic Summon',
      [bindingWorlds.HIDING_REASON_TEMPEST_TRIALS]: 'Tempest Trials',
      [bindingWorlds.HIDING_REASON_GRAND_HERO_BATTLE]: 'Grand Hero Battle',
      [bindingWorlds.HIDING_REASON_BAD_UNIT]: 'Bad Unit',
      [bindingWorlds.HIDING_REASON_GOT_IT]: 'Already Got It',
      [bindingWorlds.HIDING_REASON_DUPLICATE]: 'Duplicate',
      [bindingWorlds.HIDING_REASON_NO_SKILL_X]: 'No Skill X',
      [bindingWorlds.HIDING_REASON_BAD_SKILL]: 'Bad Skill(s)',
      [bindingWorlds.HIDING_REASON_MALE]: 'Male',
      [bindingWorlds.HIDING_REASON_FEMALE]: 'Female',
      [bindingWorlds.HIDING_REASON_NOT_CUTE_ENOUGH]: 'Not Cute Enough',
      [bindingWorlds.HIDING_REASON_NOT_GOOD_ENOUGH]: 'Not Good Enough',
      [bindingWorlds.HIDING_REASON_NOT_REDEEMABLE]: 'Not Redeemable',
    },
  },

  scores: {
    headers: {
      sort: 'Order',
      filters: 'Filters',
      score: 'Score',
      units: 'Units',
    },
    labels: {
      unitName: "Unit's name",
    },
    doNotUseBPremiumSkills: 'Do not use 400SP B Passives',
    tooltipAboutBPremiumSkills: {
      line1: `
        All units (except staff units) can now inherit 400SP B passives
        (Conjuring Breath, Execution Breath, High Dragon Wall, Patience)
      `,
      line2: `
        But those are premium, rare skills.
        Turn this on to see scores without using those premium skills.
      `,
    },
  },

  home: {
    subheader: {
      devOnly: 'Dev only',
      unitsAndSkills: 'Units & Skills',
      events: 'Events',
      misc: 'Misc',
    },
    title: {
      index: 'Home',
      assets: 'Assets',
      'skills-tree': 'Skills Tree',

      units: 'Units',
      'units-maximum-scores': 'Units By Max Scores',
      'catalog-of-heroes': 'FEHdex / Catalog of Heroes',

      skills: 'Skills',
      'skills-lists': 'Skills Ratings',

      'events-hall-of-forms': 'Hall of Forms',
      'events-binding-worlds': 'Binding Worlds',

      'misc-stats-evolution': 'Evolution of stats',
    },
    subtitle: {
      units: 'compare/filter/sort units',
      'units-maximum-scores':
        'compare units scores (for arena and other modes)',
      'catalog-of-heroes': 'check which heroes you are missing',

      skills: 'compare/filter/sort skills',
      'skills-lists': 'compare skills ratings, restrictions, effects',

      'events-hall-of-forms': 'keep track of your progress',
      'events-binding-worlds': 'compare units you can redeem',

      'misc-stats-evolution': 'over the years',
    },
  },

  layout: {
    header: {
      theme: {
        [themes.DEVICE]: 'Use device theme',
        [themes.DARK]: 'Dark theme',
        [themes.LIGHT]: 'Light theme',
      },
    },
    drawer: {
      subheader: {
        parameters: 'Parameters',
        misc: 'Misc',
      },
      header: {
        cookieManagement: 'Cookie management',
        sourceCode: 'Source code',
      },
    },
  },

  unitsFodder: {
    numberOfSlotsRequiredToInherit: 'Number of slots required to inherit',
    skillKind: 'Skill kind',
    skillName: 'Skill name',
    availability: 'Availability',
    preInheritance: 'Pre-Inheritance',
    totals: 'Totals',
    explanationOnSpecial:
      'Not counted in totals : this special is not 5★ locked',
    explanationOnMultipleSkills:
      'Not counted in totals : for skills in the same slot, only the skill released the latest is used',
    allSkillsCanBeInheritedInOneGo: 'All skills can be inherited in one go',
    notAllSkillsCanBeInheritedInOneGo:
      'Not all skills can be inherited in one go',
    usingBridgeFodderFrom: 'Using bridge fodder from',
    availabilities: {
      [obfuscatedKeys.AV_GENERIC_POOL_34]: '3★/4★ Generic Summon Pool',
      [obfuscatedKeys.AV_HEROIC_GRAILS]: 'Heroic Grails',
      [obfuscatedKeys.AV_DIVINE_CODES]: 'Divine Codes',
      [obfuscatedKeys.AV_SPECIAL_POOL_4]: '4★ Sperial Heroes',
      [obfuscatedKeys.AV_GENERIC_POOL_45]: '4★ SR Generic Summon Pool',
      [obfuscatedKeys.AV_SPECIAL_POOL_45]: '4★ SHSR',
    },
  },

  units: {
    index: {
      columnsDisplayed: 'Displayed columns',
      resetSorting: 'Reset sorting',
      headers: {
        [unitsColumns.COLUMN_THUMBNAIL]: 'Thumbnail',
        [unitsColumns.COLUMN_NAME]: 'Name',
        [unitsColumns.COLUMN_GENDER]: 'Gender',
        [unitsColumns.COLUMN_HAS_RESPLENDENT]: 'Resplendent',
        [unitsColumns.COLUMN_AVAILABILITY]: 'Availability',
        [unitsColumns.COLUMN_WEAPON]: 'Weapon',
        [unitsColumns.COLUMN_MOVE]: 'Move',
        [unitsColumns.COLUMN_VERSION]: 'Version',
        [unitsColumns.COLUMN_GENERATION]: 'Generation',
        [unitsColumns.COLUMN_BOOK]: 'Book',
        [unitsColumns.COLUMN_RELEASE_DATE]: 'Release Date',
        [unitsColumns.COLUMN_GAME]: 'Game',
        [unitsColumns.COLUMN_IV_HP]: 'HP',
        [unitsColumns.COLUMN_IV_ATK]: 'Atk',
        [unitsColumns.COLUMN_IV_SPD]: 'Spd',
        [unitsColumns.COLUMN_IV_DEF]: 'Def',
        [unitsColumns.COLUMN_IV_RES]: 'Res',
        [unitsColumns.COLUMN_BST]: 'BST',
        [unitsColumns.COLUMN_MAX_DRAGONFLOWERS]: 'Max DF',
        [unitsColumns.COLUMN_ELEMENT]: 'Element',
        [unitsColumns.COLUMN_ARTIST]: 'Artist',
        [unitsColumns.COLUMN_VA]: 'VA',
        [unitsColumns.COLUMN_RATING]: 'Rating',
        [unitsColumns.COLUMN_ORIGIN]: 'Origin',
        [unitsColumns.COLUMN_MAX_SCORE]: 'Max Score',
      },
    },
    show: {
      tabs: {
        [units.TAB_BASE_KIT]: 'Base Kit',
        [units.TAB_ARTS]: 'Arts',
        [units.TAB_STATS]: 'Stats',
        [units.TAB_SKILLS]: 'All Skills',
        [units.TAB_FODDER]: 'Fodder',
        [units.TAB_FODDER_VALUE]: 'Fodder Value',
      },
      tooltips: {
        [units.TAB_STATS]: 'Stats',
        [units.TAB_SKILLS]: 'Skills',
        [units.TAB_FODDER]: 'Can I inherit all skills in one go ?',
        [units.TAB_FODDER_VALUE]:
          'Are all skills present in generic summon pool ?',
      },
      stats: {
        headers: {
          stat: 'Stat',
          rank: 'Rank',
          unit: 'Unit',
          max: 'Max',
          total: 'Total',
          bst: 'BST',
        },
      },
    },
    filters: {
      resetFilters: 'Reset filters',
      headers: {
        stats: 'Stats',
      },
      buttons: {
        isGHB: 'GHB',
        isTT: 'TT',
      },
      tooltips: {
        hasPrfWeapon: 'PRF Weapon',
        hasPrfSkill: 'PRF Skill',
        isGHB: 'Grand Hero Battle',
        isTT: 'Tempest Trial',
      },
      stats: {
        [UnitsStats.HP]: 'HP',
        [UnitsStats.ATK]: 'Atk',
        [UnitsStats.SPD]: 'Spd',
        [UnitsStats.DEF]: 'Def',
        [UnitsStats.RES]: 'Res',
        [UnitsStats.BST]: 'BST',
      },
    },
  },

  skills: {
    index: {
      columnsDisplayed: 'Displayed columns',
      resetSorting: 'Reset sorting',
      headers: {
        [skillsColumns.COLUMN_THUMBNAIL]: 'Thumbnail',
        [skillsColumns.COLUMN_NAME]: 'Name',
        [skillsColumns.COLUMN_SLOT]: 'Slot',
        [skillsColumns.COLUMN_PRF]: 'PRF ?',
        [skillsColumns.COLUMN_SP]: 'SP',
        [skillsColumns.COLUMN_CD]: 'CD',
        [skillsColumns.COLUMN_TIER]: 'Tier',
        [skillsColumns.COLUMN_EFFECTIVENESS]: 'Effectiveness',
        [skillsColumns.COLUMN_RATING]: 'Rating',
        [skillsColumns.COLUMN_GRADE]: 'Grade',
        [skillsColumns.COLUMN_DESCRIPTION]: 'Description',
        [skillsColumns.COLUMN_RESTRICTIONS]: 'Restrictions',
        [skillsColumns.COLUMN_OWNERS]: 'Owners',
        [skillsColumns.COLUMN_AVAILABILITY]: 'Availability',
        [skillsColumns.COLUMN_PRE_INHERITANCE]: 'PreInheritance',
        [skillsColumns.COLUMN_MAX]: 'MAX ?',
        [skillsColumns.COLUMN_RELEASE_DATE]: 'Release Date',
        [skillsColumns.COLUMN_VERSION]: 'Version',
      },
    },
    show: {
      tabs: {
        [skills.TAB_DETAILS]: 'Details',
        [skills.TAB_OWNERS]: 'Owners',
        [skills.TAB_DOWNGRADES]: 'Downgrades',
        [skills.TAB_UPGRADES]: 'Upgrades',
      },
      tier: 'Tier',
      cd: 'CD',
      effectiveness: 'Effectiveness',
      sp: 'SP',
      canUse: 'Can use',
      effect: 'Effect',
      owners: {
        sortByAvailability: 'Sorted by Availability',
        sortByName: 'Sorted by Name',
      },
    },
    filters: {
      skillName: 'Skill name',
      skillDescription: 'Skill description',
      resetFilters: 'Reset filters',
      isPrf: 'PRF ?',
      isMax: 'MAX ?',
      headers: {
        type: 'Type',
        whoCanInherit: 'Who can inherit ?',
        stats: 'Stats',
        availability: 'Availability',
        preInheritance: 'Pre-Inheritance',
      },
      stats: {
        [skillsFilters.TIER]: 'Tier',
        [skillsFilters.SP]: 'SP',
        [skillsFilters.CD]: 'CD',
      },
      hof: {
        name: 'Hall of Forms',
        title: {
          [skillsFilters.HOF_13_20]: 'Chambers 13 to 20',
          [skillsFilters.HOF_21_24]: 'Chambers 21 to 24',
          [skillsFilters.HOF_25]: 'Chamber 25',
        },
        prepend: {
          [skillsFilters.HOF_DISABLED]: '0',
          [skillsFilters.HOF_13_20]: '13',
          [skillsFilters.HOF_21_24]: '21',
          [skillsFilters.HOF_25]: '25',
        },
      },
    },
  },

  catalogOfHeroes: {
    confirmReset: 'Owned units will be lost, are you sure ?',
    headers: {
      catalog: 'Catalog Of Heroes (click on heroes you own)',
      recap: 'Heroes',
      banners: 'Banners',
      heroicGrailsShop: 'Heroic Grails Shop',
    },
    order: {
      [hgs.SORT_BY_NEWEST]: 'Newest',
      [hgs.SORT_BY_ADDED]: 'Added',
      [hgs.SORT_BY_ORIGIN]: 'Origin',
      [hgs.SORT_BY_TYPE]: 'Type',
      [hgs.SORT_BY_WEAPON_TYPE]: 'Weapon Type',
      [hgs.SORT_BY_MOVE_TYPE]: 'Move Type',
    },
    other: 'Askr Trio & New Heroes not yet in generic summon pool',
  },

  misc: {
    stats: {
      considerUnits: 'Consider units',
      consideredUnits: {
        [UnitsStats.UNITS_RELEASED_UP_TO_THAT_MONTH]:
          'released up to that month',
        [UnitsStats.UNITS_RELEASED_ONLY_THAT_MONTH]: 'released only that month',
      },

      operator: 'Operator',
      operators: {
        [UnitsStats.OPERATOR_AVERAGE]: 'average',
        [UnitsStats.OPERATOR_MEDIAN]: 'median',
        [UnitsStats.OPERATOR_MIN]: 'min',
        [UnitsStats.OPERATOR_MAX]: 'max',
        [UnitsStats.OPERATOR_MODE]: 'mode',
        [UnitsStats.OPERATOR_RANGE]: 'range',
      },

      evolutionOfBST: 'Evolution of BST',
      evolutionOfStats: {
        all: 'Evolution of Stats (all move types)',
        byMoves: {
          [moves.MOVE_I]: 'Evolution of Stats (Infantry)',
          [moves.MOVE_A]: 'Evolution of Stats (Armored)',
          [moves.MOVE_C]: 'Evolution of Stats (Cavalry)',
          [moves.MOVE_F]: 'Evolution of Stats (Flying)',
        },
        byStats: {
          [UnitsStats.HP]: 'Evolution of Stats (HP)',
          [UnitsStats.ATK]: 'Evolution of Stats (Atk)',
          [UnitsStats.SPD]: 'Evolution of Stats (Spd)',
          [UnitsStats.DEF]: 'Evolution of Stats (Def)',
          [UnitsStats.RES]: 'Evolution of Stats (Res)',
        },
      },

      moves: {
        [moves.MOVE_I]: 'Infantry',
        [moves.MOVE_A]: 'Armored',
        [moves.MOVE_C]: 'Cavalry',
        [moves.MOVE_F]: 'Flying',
      },
    },
  },
}
