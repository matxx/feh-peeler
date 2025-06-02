# FEH Peeler

## TODO

### Features

1. (PAGE) list all rearmed/attuned, and a skill of skills, when you select a skill, show which rearmed/attuned can inherit it
1. (PAGE) event "see's snare" (skill pool, recommendations, ...)
1. (PAGE) complex pre-inheritance planner/helper

### QoL

1. modal skill : fix when tons of downgrades/upgrades (ex: "Distant Counter" upgrades)
1. units: filter on ratings/grades
1. skills: filter on ratings/grades
1. how does tarteaucitron work when changing locale ? [this](https://github.com/AmauriC/tarteaucitron.js/issues/353#issuecomment-536913252) suggests you have to reload the page
1. missing translations in `pages/units-maximum-scores.vue` (alerts on each score)
1. replace all assets with spritesheets

### Fixes

1. properly type all the `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
1. properly type all the `// @ts-expect-error unsafe typings`

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
