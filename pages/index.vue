<template>
  <div class="fill-height d-flex flex-column justify-space-around align-center">
    <v-list lines="two">
      <DevOnly>
        <v-list-subheader>
          {{ t(`home.subheader.devOnly`) }}
        </v-list-subheader>
        <v-list-item :to="localPath('/assets')">
          <v-list-item-title class="pl-5 text-primary">
            {{ t('home.title./assets') }}
          </v-list-item-title>
        </v-list-item>
      </DevOnly>

      <template
        v-for="(item, index) in ITEMS"
        :key="index"
      >
        <v-list-subheader v-if="item.subheader">
          {{ item.text }}
        </v-list-subheader>
        <v-list-item
          v-if="item.item"
          :to="localPath(item.link)"
        >
          <v-list-item-title class="pl-5 text-primary">
            {{ t(`home.title.${item.link}`) }}
          </v-list-item-title>
          <v-list-item-subtitle class="pl-5">
            {{ t(`home.subtitle.${item.link}`) }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localPath = useLocalePath()

const ITEMS = [
  { subheader: true, text: t('home.subheader.unitsAndSkills') },
  { item: true, link: '/units-maximum-scores' },
  { item: true, link: '/units-fodder' },
  { item: true, link: '/skills-fodders' },
  { item: true, link: '/skills-lists' },
  { subheader: true, text: t('home.subheader.events') },
  { item: true, link: '/events/hall-of-forms' },
  { item: true, link: '/events/binding-worlds' },
]
</script>

<style lang="scss" scoped>
$color-light: #f2f2f7;

.bg-light {
  background-color: $color-light;
}
.bg-dark {
  background-color: #333a73;
}

.linear-bg {
  padding-top: 50px !important;
  background: linear-gradient(
    to bottom,
    transparent 0,
    $color-light 100px
  ) !important;
}

.page {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
.section {
  height: 100vh;
  scroll-snap-stop: always;
  scroll-snap-align: center;
}

.page--sm-and-up {
  .section__background {
    max-width: 500px;
    margin: auto;
  }
  .section__top__img {
    max-width: 500px;
    margin: auto;
  }
  .section__bottom {
    flex-grow: 1;
    max-width: 500px;
    margin: auto;
  }
}

.section {
  display: flex;
  flex-direction: column;
}
.section__top {
  flex-grow: 1;
}
.section__bottom {
  flex-grow: 0;
}

.section__top,
.section__bottom {
  margin: 20px;
}
.section__bottom__title {
  margin-bottom: 12px;

  font-size: 32px;
  font-weight: 600;
  line-height: 34px;
}
.section__bottom__p {
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
}

.section__bottom__link {
  margin-top: 30px;
  text-align: center;
}

.section__top {
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-2 {
  font-size: 96px;
  line-height: 80px;
}
.line-3 {
  line-height: 28px;
}
</style>
