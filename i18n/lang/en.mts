import * as availability from '~/utils/types/units-availabilities'
import * as grades from '~/utils/types/grades'
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
import * as unitThemes from '~/utils/types/units-themes'

export default {
  global: {
    NA: 'N/A',
    total: 'Total',

    here: 'here',
    other: 'other',

    headers: {
      settings: 'Settings',
    },
    cta: {
      cancel: 'cancel',
      submit: 'submit',
    },

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

    skillsKeywordsShown: "Skills' keywords shown",
    skillsKeywordsHidden: "Skills' keywords hidden",

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

    stats: {
      [UnitsStats.HP]: 'HP',
      [UnitsStats.ATK]: 'Atk',
      [UnitsStats.SPD]: 'Spd',
      [UnitsStats.DEF]: 'Def',
      [UnitsStats.RES]: 'Res',
      [UnitsStats.BST]: 'BST',
    },

    elements: {
      [unitsFilters.ELEMENT_FIRE]: 'Fire',
      [unitsFilters.ELEMENT_WATER]: 'Water',
      [unitsFilters.ELEMENT_WIND]: 'Wind',
      [unitsFilters.ELEMENT_EARTH]: 'Earth',
      [unitsFilters.ELEMENT_LIGHT]: 'Light',
      [unitsFilters.ELEMENT_DARK]: 'Dark',
      [unitsFilters.ELEMENT_ASTRA]: 'Astra',
      [unitsFilters.ELEMENT_ANIMA]: 'Anima',
    },

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
            [skills.SKILL_DUO]: 'Icon Duo Skill',
            [skills.SKILL_HARMONIZED]: 'Icon Harmonized Skill',
            [skills.SKILL_EMBLEM]: 'Icon Emblem Skill',
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
    alertAboutBPremiumSkills: {
      line1: `
        All units can now inherit 400SP B passives
        (Conjuring Breath, Execution Breath, Preempt Amplify, ...)
      `,
      line2: `
        But those are premium, rare skills. Not using them will just reduce your score by 2.
      `,
    },
  },

  home: {
    subheader: {
      devOnly: 'Dev only',
      skillsAndUnits: 'Skills & Units',
      events: 'Events',
      misc: 'Misc',
    },
    title: {
      index: 'Home',
      assets: 'Assets',
      'skills-tree': 'Skills Tree',

      units: 'Units',
      'units-maximum-scores': 'Units By Max Scores',
      'score-calc': 'Score Calculator',
      'catalog-of-heroes': 'Catalog of Heroes',

      skills: 'Skills',
      'skills-lists': 'Skills Ratings',

      'events-hall-of-forms': 'Hall of Forms',
      'events-binding-worlds': 'Binding Worlds',

      'misc-glossary': 'Glossary',
      'misc-stats-evolution': 'Evolution of stats',
    },
    subtitle: {
      units: 'compare/filter/sort units',
      'units-maximum-scores': '(for arena and other modes)',
      'score-calc': '(for arena and other modes)',
      'catalog-of-heroes': 'check which heroes you are missing',

      skills: 'compare/filter/sort skills',
      'skills-lists': 'compare skills ratings, restrictions, effects',

      'events-hall-of-forms': 'keep track of your progress',
      'events-binding-worlds': 'compare units you can redeem',

      'misc-stats-evolution': 'over the years',
    },
    misc: {
      allDataFrom: '* All data comes from {link}.',
      fandom: 'Fandom',
      allRatingsFrom: '* All ratings comes from {link}.',
      game8: 'Game8',
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
    chooseTheOrderOfTheBridgeFodderConsidered:
      'Choose the order of the bridge fodder considered',
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
      statsDisplayedAre5starLevel40plus0:
        'Stats displayed correspond to the 5★ at level 40+0',
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
        [unitsColumns.COLUMN_STAT_HP]: 'HP',
        [unitsColumns.COLUMN_STAT_ATK]: 'Atk',
        [unitsColumns.COLUMN_STAT_SPD]: 'Spd',
        [unitsColumns.COLUMN_STAT_DEF]: 'Def',
        [unitsColumns.COLUMN_STAT_RES]: 'Res',
        [unitsColumns.COLUMN_BST]: 'BST',
        [unitsColumns.COLUMN_MAX_DRAGONFLOWERS]: 'Max DF',
        [unitsColumns.COLUMN_ELEMENT]: 'Element',
        [unitsColumns.COLUMN_ARTIST]: 'Artist',
        [unitsColumns.COLUMN_VA]: 'VA',
        [unitsColumns.COLUMN_RATING]: 'Rating',
        [unitsColumns.COLUMN_ORIGIN]: 'Origin',
        [unitsColumns.COLUMN_ID_INT]: 'ID',
        [unitsColumns.COLUMN_MAX_SCORE]: 'Max Score',
        [unitsColumns.COLUMN_THEME]: 'Theme',
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
        [units.TAB_BASE_KIT]: 'Base Kit',
        [units.TAB_ARTS]: 'Arts',
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
      arts: {
        classicArts: 'Classic Arts',
        resplendentArts: 'Resplendent Arts',
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
      selects: {
        books: 'Books',
        themes: 'Themes',
        games: 'Games',
        genders: 'Genders',
      },
      tooltips: {
        isGHB: 'Grand Hero Battle',
        isTT: 'Tempest Trial',
      },
    },
    themes: {
      [unitThemes.THEME_NEW_YEAR]: 'New Year',
      [unitThemes.THEME_DESERT]: 'Desert',
      [unitThemes.THEME_DOD]: 'Day of Devotion (Valentine)',
      [unitThemes.THEME_SPRING]: 'Spring',
      [unitThemes.THEME_KIDS]: 'Kids',
      [unitThemes.THEME_WEDDING]: 'Wedding',
      [unitThemes.THEME_SUMMER]: 'Summer',
      [unitThemes.THEME_HALLOWEEN]: 'Halloween',
      [unitThemes.THEME_NINJAS]: 'Ninjas',
      [unitThemes.THEME_WINTER]: 'Winter',
      [unitThemes.THEME_DANCE]: 'Dance',
      [unitThemes.THEME_HOSHIDAN_SUMMER]: 'Hoshidan Summer',
      [unitThemes.THEME_HOSTILE_SPRING]: 'Hostile Spring',
      [unitThemes.THEME_PICNIC]: 'Picnic',
      [unitThemes.THEME_PIRATES]: 'Pirates',
      [unitThemes.THEME_TEA]: 'Tea',
      [unitThemes.THEME_THIEVES]: 'Thieves',
      [unitThemes.THEME_S12]: 'S12',
      [unitThemes.THEME_NATIONS]: 'Nations',
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
        [skillsColumns.COLUMN_RESTRICTIONS]: 'Can use',
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
        sortByAvailability: 'Owners sorted by Availability',
        sortByName: 'Owners sorted by Name',
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
        whoCanInheritOrEquip: 'Who can inherit/equip ?',
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
        tooltip:
          'filters skills based on version and SP thresholds (it does not take into account the short period after release where a skill is not yet available in HoF)',
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
    glossary: {
      tabs: {
        unitsNames: "Units' Names",
        skillsKeywords: "Skills' Keywords",
      },
      unitsNames: {
        description:
          'The same character can have multiple titles in game and can be difficult to remember. So the FEH commmunity uses abbreviated names to refer to them.',

        exampleHeader: 'Examples:',
        exampleWithPrefix:
          'B!Lucina : the prefix "B" means "Brave" (check below the list of prefixes)',
        exampleWithSuffix:
          'Corrin(M) : the suffix "M" means "Male" (check below the list of suffixes)',

        prefix: {
          header: 'Prefixes',
          introduction:
            'Here is the list of prefixes used on this website (generally the lower case letters are omitted by the community)',
          headers: {
            byTrait: 'By trait',
            byTheme: 'By theme',
            other: 'Other',
          },
          byTheme: {
            NY: 'New Year (banners at the beginning of the year)',
            HSp: 'Hostile Spring (january 2019)',
            De: 'Desert (banners in january from 2021 to 2025) (names on game8 : Plegian, Hatari, Sage, Nabata, Jehanna)',
            I: 'Ilia (january 2026)',
            V: 'Valentine (can also be called "DoD", Day of Devotion) (banners in february)',
            Sp: 'Spring (banners in march)',
            Y: 'Young (banners in april)',
            Pic: 'Picnic (april 2019)',
            Gr: 'Groom (males in wedding banners) (banners in mai)',
            Br: 'Bride (females in wedding banners) (banners in mai)',
            // We: 'Wedding (non binary in wedding banners) (banners in mai)',
            Su: 'Summer (banners in july & august)',
            HSu: 'Hoshidan Summer (august 2018 & 2024)',
            P: 'Pirate (august 2020 & 2021)',
            Th: 'Thieves (august 2022)',
            T: 'Tea (august 2023 & 2025)',
            Da: 'Dance (september 2017, 2019 & 2020 ; only composed of refreshers) (names on game8 : Performing, Soiree, Masquerade)',
            S12: 'Scions of Twelve (september 2021)',
            FT: 'Fire Tribe (september 2022)',
            WT: 'Wind Tribe (september 2023)',
            IT: 'Ice Tribe (september 2024)',
            Fe: 'Ferox (also called Arena or Gladiator) (september 2025)',
            H: 'Halloween (banners in october)',
            N: 'Ninja (banners in november)',
            W: 'Winter (banners in december)',
          },
          byTrait: {
            Ai: 'Aided',
            As: 'Ascended',
            At: 'Attuned',
            E: 'Emblem',
            Et: 'Entwined',
            R: 'Rearmed',
            F: 'Fallen',
            C: 'Chosen',
            L: 'Legendary',
            M: 'Mythic',
            D: 'Duo',
            H: 'Harmonized',
          },
          other: {
            '35': '35th anniversary (only used for 35!Marth, a new duo Marth released for the 35th anniversary of the Fire Emblem franchise)',
            B: 'Brave (heroes chosen by the community in the CYL events)',
            Ad: 'Adrift (name of Paralogue 27)',
          },
        },
        suffix: {
          header: 'Suffixes',
          introduction: 'Here is the list of suffixes used on this website.',

          other: {
            M: 'Male',
            F: 'Female',

            A: 'Adult',
            Y: 'Young',

            SoV: 'Shadow of Valentia (refers to the Fire Emblem game released in 2017)',
            'FE{N}': "Refers to the {'{N}'}-th Fire Emblem game",
          },

          listOfFEGames: 'The list of Fire Emblem games be found {link}.',
          asPrefix:
            'The suffix can also be used as prefix by the community (ex: F!F!Corrin ; meaning Fallen Female Corrin)',
        },
      },
      skillsKeywords: {
        note: 'NB : a same keyword can appear multiple times, it is generally due to a little difference in the wording across different skills (a problem inherent to Fandom).',
        headers: {
          name: 'Name',
          text: 'Text',
        },
      },
    },

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

  scoreCalc: {
    headers: {
      score: 'Score',
      offenseRange: 'Offense Range',
      defenseScore: 'Defense Score',

      bst: 'BST',
      totalSP: 'Total SP',
    },
    tooltips: {
      scoreExact:
        'Score not rounded (in order to see how close you are from the next step)',
      visibleBst:
        'Visible BST : adjusted BST based on "Duel" A skill or duo/legendary unit standard effect "Duel"',
    },
    labels: {
      hasBonusUnit: 'Bonus unit ?',
      arena: 'Arena',
      mjolnirStrike: 'MjolnirStrike',
      seasonElements: 'Season element #{index}',
      majorBlessing: 'Major Blessing',
      minorBlessing: 'Minor Blessing',

      unit: 'Unit #{index}',
      rarity: 'Rarity',
      level: 'Level',
      merges: 'Merges',
      boon: 'Boon',
      bane: 'Bane',
      blessing: 'Blessing',
    },
    cta: {
      loadMaxScore: 'Load Max Score',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
    },
    tips: {
      header: 'Tips to increase your score:',

      useFourUnitsRarity5Level40: 'Use four 5* units at level 40.',
      useUnitsWithMaxMerges: 'Use units with maximum merges.',
      useMaxSpSkills: 'Use maximum SP skills.',
      useABonusLegendaryUnit:
        'Use a bonus unit (preferably a bonus legendary).',
      useUpToTwoLegendaries:
        'Use up to 2 legendaries of the same in-season element.',
      blessYourUnits:
        'Bless all your non-legendary units with the element of those legendaries.',

      chooseHighestBstUnits:
        'Choose units with the highest BST or legendary/duo units with the highest "Duel" effect.',
      findTierlist: 'You can find a tierlist of the best scoring units {link}.',

      completeFormulae: 'Complete formulae to calculate score.',
    },
  },
}
