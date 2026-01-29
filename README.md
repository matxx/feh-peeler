# FEH Peeler

## Introduction

This is the code source for the website [feh-peeler.com](https://feh-peeler.com).

All the necessary data for this website is extracted from [Fandom](https://feheroes.fandom.com/) and all ratings (for units, skills and seals) are extracted from [Game8](https://game8.co/games/fire-emblem-heroes). [This repo](https://github.com/matxx/feh-scrapper) is responsible for the extraction, it then calculates a bunch of additional data and stores everything in [this repo](https://github.com/matxx/feh-data).

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## TODO

### Features

1. display/sort/filter on skills range/might
1. get any level correct stats

1. (PAGE) unit score calculator (like https://arcticsilverfox.com/score_calc/)
1. (PAGE) add units as "owned" : add skills on owned unit as inherited skills
1. (PAGE) list all rearmed/attuned, and a skill of skills, when you select a skill, show which rearmed/attuned can inherit it
1. (PAGE) event "see's snare" (skill pool, recommendations, ...)
1. (PAGE) complex pre-inheritance planner/helper

### QoL

1. modal unit->base kit: add emblem/duo/harmonized special effects
1. modal unit/skill : update URL on open/close
1. units: filter on ratings/grades/version
1. skills: filter on ratings/grades/version/book
1. how does tarteaucitron work when changing locale ? [this](https://github.com/AmauriC/tarteaucitron.js/issues/353#issuecomment-536913252) suggests you have to reload the page
1. missing translations in `pages/units-maximum-scores.vue` (alerts on each score)
1. replaces links to fandom in `pages/units-maximum-scores.vue` (alerts on each score) to the skills page with filters directly activated for 400SP B skills / 300SP seals
1. replace all assets with spritesheets

### Fixes

1. staff refines appear as exclusive skills (ex: "In The Fold+")
1. do not count assist skills not 5\* locked (exemple : E!Micaiah with Swap...)
1. properly type all the `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
1. properly type all the `// @ts-expect-error unsafe typings`
