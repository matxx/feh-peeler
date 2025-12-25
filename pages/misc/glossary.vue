<template>
  <div class="pa-3">
    <h3>{{ t('misc.glossary.abbreviations.header') }}</h3>
    <p>
      {{ t('misc.glossary.abbreviations.description') }}<br />
      {{ t('misc.glossary.abbreviations.example') }}<br />
    </p>
    <p class="mt-3">
      {{ t('misc.glossary.abbreviations.prefix.introduction') }}<br />
    </p>

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
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

// TODO: something cleaner than these
// in order to make sure that
// changes here and in translations files are synced
const byTheme = [
  'NY',
  'HSp',
  'De',
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
  'T',
  'Da',
  'FT',
  'WT',
  'IT',
  'H',
  'N',
  'W',
]
const byTrait = ['Ai', 'As', 'At', 'E', 'Et', 'R', 'F', 'C', 'L', 'M', 'D', 'H']
const other = ['35', 'B']

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
</script>

<style lang="scss" scoped>
.prefix {
  flex: 0 0 50px;
}
</style>
