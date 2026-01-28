<template>
  <div class="pa-3">
    <h3>{{ t('misc.glossary.abbreviations.header') }}</h3>

    <p>
      {{ t('misc.glossary.abbreviations.description') }}<br />
      {{ t('misc.glossary.abbreviations.exampleHeader') }}<br />
    </p>
    <ul class="pl-4">
      <li>
        {{ t('misc.glossary.abbreviations.exampleWithPrefix') }}
      </li>
      <li>
        {{ t('misc.glossary.abbreviations.exampleWithSuffix') }}
      </li>
    </ul>

    <h3 class="mt-5">{{ t('misc.glossary.abbreviations.prefix.header') }}</h3>
    <p>{{ t('misc.glossary.abbreviations.prefix.introduction') }}</p>

    <h4 class="mt-3">
      {{ t('misc.glossary.abbreviations.prefix.headers.byTheme') }}
    </h4>
    <ul class="pl-4">
      <li
        v-for="data in prefixesByTheme"
        :key="data.key"
      >
        <div class="d-flex">
          <div class="prefix mr-3">{{ data.prefix }}!</div>
          <div>
            {{ data.text }}
          </div>
        </div>
      </li>
    </ul>

    <h4 class="mt-3">
      {{ t('misc.glossary.abbreviations.prefix.headers.byTrait') }}
    </h4>
    <ul class="pl-4">
      <li
        v-for="data in prefixesByTrait"
        :key="data.key"
      >
        <div class="d-flex">
          <div class="prefix mr-3">{{ data.prefix }}!</div>
          <div>
            {{ data.text }}
          </div>
        </div>
      </li>
    </ul>

    <h4 class="mt-3">
      {{ t('misc.glossary.abbreviations.prefix.headers.other') }}
    </h4>
    <ul class="pl-4">
      <li
        v-for="data in prefixesOther"
        :key="data.key"
      >
        <div class="d-flex">
          <div class="prefix mr-3">{{ data.prefix }}!</div>
          <div>
            {{ data.text }}
          </div>
        </div>
      </li>
    </ul>

    <h3 class="mt-5">{{ t('misc.glossary.abbreviations.suffix.header') }}</h3>
    <p>{{ t('misc.glossary.abbreviations.suffix.introduction') }}</p>

    <ul class="pl-4">
      <li
        v-for="data in suffixesItems"
        :key="data.key"
      >
        <div class="d-flex">
          <div class="suffix mr-3">({{ data.suffix }})</div>
          <div>
            {{ data.text }}
          </div>
        </div>
      </li>
    </ul>

    <i18n-t
      keypath="misc.glossary.abbreviations.suffix.listOfFEGames"
      tag="p"
      scope="global"
    >
      <template #link>
        <a
          :href="LINK"
          target="_blank"
        >
          {{ t('global.here') }}
        </a>
      </template>
    </i18n-t>

    <p>{{ t('misc.glossary.abbreviations.suffix.asPrefix') }}</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const LINK =
  'https://www.reddit.com/r/fireemblem/comments/1grmnmx/comment/lx79upq/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'

// TODO: something cleaner than these
// in order to make sure that
// changes here and in translations files are synced
const byTheme = [
  'NY',
  'HSp',
  'De',
  'I',
  'V',
  'Sp',
  'Y',
  'Pic',
  'Gr',
  'Br',
  // 'We',
  'Su',
  'HSu',
  'P',
  'Th',
  'T',
  'Da',
  'S12',
  'FT',
  'WT',
  'IT',
  'Fe',
  'H',
  'N',
  'W',
]
const byTrait = ['Ai', 'As', 'At', 'E', 'Et', 'R', 'F', 'C', 'L', 'M', 'D', 'H']
const other = ['35', 'B', 'Ad']

const prefixesByTheme = byTheme.map((prefix) => ({
  key: prefix,
  prefix,
  text: t(`misc.glossary.abbreviations.prefix.byTheme.${prefix}`),
}))
const prefixesByTrait = byTrait.map((prefix) => ({
  key: prefix,
  prefix,
  text: t(`misc.glossary.abbreviations.prefix.byTrait.${prefix}`),
}))
const prefixesOther = other.map((prefix) => ({
  key: prefix,
  prefix,
  text: t(`misc.glossary.abbreviations.prefix.other.${prefix}`),
}))

const suffixes = ['M', 'F', 'A', 'Y', 'SoV', 'FE{N}']

const suffixesItems = suffixes.map((suffix) => ({
  key: suffix,
  suffix,
  text: t(`misc.glossary.abbreviations.suffix.other.${suffix}`),
}))
</script>

<style lang="scss" scoped>
.prefix {
  flex: 0 0 50px;
}
.suffix {
  flex: 0 0 75px;
}
</style>
