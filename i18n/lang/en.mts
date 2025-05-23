import * as availability from '~/utils/types/units-availabilities'
import * as grades from '~/utils/types/grades'
import { IVS_HASH } from '~/utils/types/IVs'
import * as skills from '~/utils/types/skills'
import * as units from '~/utils/types/units'
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
            [moves.MOVE_I]: 'Icon dragonflowers green (armored)',
            [moves.MOVE_A]: 'Icon dragonflowers yellow (cavalry)',
            [moves.MOVE_C]: 'Icon dragonflowers blue (flying)',
            [moves.MOVE_F]: 'Icon dragonflowers red (infantry)',
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

  skillsFodders: {
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
        'Mythics, Legendaries, Emblems, Attuned, Rearmed, Aided',
      specialHeroes: 'Sperial Heroes',

      heroicGrails: 'Heroic Grails',

      divineCode: 'Divine Code',
      part: 'Part',

      limitedDivineCode: 'Limited Divine Code',
    },
    fodders: {
      unitName: 'Unit Name',
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
      // game8_link: 'Game8 Link',
      // game8_name: 'Game8 Name',
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

    labels: {
      enclosureLevel: 'Enclosure Level',
      hidingReason: 'Reason for hiding',
      rating: 'Your Rating',
      notes: 'Notes',

      unitName: 'Unit Name',

      boon: 'Boon',
      boonAscended: 'Ascended Boon',
      bane: 'Bane',
      dragonflowers: 'Dragonflowers',
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
  },

  home: {
    subheader: {
      devOnly: 'Dev only',
      unitsAndSkills: 'Units & Skills',
      events: 'Events',
    },
    title: {
      index: 'Home',
      assets: 'Assets',
      'skills-tree': 'Skills Tree',

      units: 'Units',
      'units-name': 'Units Details',
      'units-name-tab': 'Units Details',
      'units-maximum-scores': 'Units By Max Scores',
      'catalog-of-heroes': 'FEHdex / Catalog of Heroes',

      skills: 'Skills Details',
      'skills-name': 'Skills - Details',
      'skills-name-tab': 'Skills Details',
      'skills-fodders': 'Skills Fodders',
      'skills-lists': 'Skills Ratings',

      'events-hall-of-forms': 'Hall of Forms',
      'events-binding-worlds': 'Binding Worlds',
    },
    subtitle: {
      units: 'compare/filter/sort units by name, stats and more',
      'units-maximum-scores':
        'compare units scores (for arena and other modes)',
      'catalog-of-heroes': 'check which heroes you are missing',

      skills: 'availability, effects, restrictions, fodders',
      'skills-fodders':
        'check if a skill is available in the 3★/4★ pool, grails shop, divine codes, ...',
      'skills-lists': 'compare skills ratings, restrictions, effects',

      'events-hall-of-forms': 'keep track of your progress',
      'events-binding-worlds': 'compare units you can redeem',
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
    totals: 'Totals',
    explanationOnSpecial:
      'Not counted in totals : this Special is not 5★ locked',
    explanationOnMultipleSkills:
      'Not counted in totals : for skills in the same slot, only the skill with highest tier and number of required inherit slot is used',
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
      headers: {
        [units.COLUMN_NAME]: 'Name',
        [units.COLUMN_GENDER]: 'Gender',
        [units.COLUMN_HAS_RESPLENDENT]: 'Resplendent',
        [units.COLUMN_AVAILABILITY]: 'Availability',
        [units.COLUMN_WEAPON]: 'Weapon',
        [units.COLUMN_MOVE]: 'Move',
        [units.COLUMN_VERSION]: 'Version',
        [units.COLUMN_GENERATION]: 'Generation',
        [units.COLUMN_BOOK]: 'Book',
        [units.COLUMN_RELEASE_DATE]: 'Release Date',
        [units.COLUMN_GAME]: 'Game',
        [units.COLUMN_IV_HP]: 'HP',
        [units.COLUMN_IV_ATK]: 'Atk',
        [units.COLUMN_IV_SPD]: 'Spd',
        [units.COLUMN_IV_DEF]: 'Def',
        [units.COLUMN_IV_RES]: 'Res',
        [units.COLUMN_BST]: 'BST',
        [units.COLUMN_ELEMENT]: 'Element',
        [units.COLUMN_ARTIST]: 'Artist',
        [units.COLUMN_VA]: 'VA',
        [units.COLUMN_DRAGONFLOWERS]: 'DragonFlowers',
        [units.COLUMN_RATING]: 'Rating',
      },
    },
    show: {
      tabs: {
        [units.TAB_STATS]: 'Stats',
        [units.TAB_SKILLS]: 'Skills',
        [units.TAB_FODDER]: 'Fodder',
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
      headers: {
        stats: 'Stats',
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
    show: {
      tabs: {
        [skills.TAB_DETAILS]: 'Details',
        [skills.TAB_FODDERS]: 'Fodders',
        [skills.TAB_DOWNGRADES]: 'Downgrades',
        [skills.TAB_UPGRADES]: 'Upgrades',
      },
      tier: 'Tier',
      cd: 'CD',
      effectiveness: 'Effectiveness',
      sp: 'SP',
      canUse: 'Can use',
      effect: 'Effect',
      fodders: {
        sortByAvailability: 'Sorted by Availability',
        sortByName: 'Sorted by Name',
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
}
