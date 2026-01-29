<template>
  <div class="pa-3">
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab :value="TAB_UNITS_NAMES">
        {{ t('misc.glossary.tabs.unitsNames') }}
      </v-tab>
      <v-tab :value="TAB_SKILLS_KEYWORDS">
        {{ t('misc.glossary.tabs.skillsKeywords') }}
      </v-tab>
    </v-tabs>

    <v-divider class="mb-3" />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="TAB_UNITS_NAMES">
        <GlossaryUnitsNames />
      </v-tabs-window-item>
      <v-tabs-window-item :value="TAB_SKILLS_KEYWORDS">
        <GlossarySkillsKeywords />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const TAB_UNITS_NAMES = 'units-names'
const TAB_SKILLS_KEYWORDS = 'skills-keywords'
const tab = ref(TAB_UNITS_NAMES)

const route = useRoute()
const router = useRouter()
watch(
  route,
  () => {
    if (route.hash) {
      const hashTab = route.hash.substring(1)
      if (hashTab === TAB_UNITS_NAMES || hashTab === TAB_SKILLS_KEYWORDS) {
        tab.value = hashTab
      }
    }
  },
  { immediate: true },
)
watch(
  tab,
  (newTab) => {
    router.replace({ hash: `#${newTab}` })
  },
  { immediate: true },
)
</script>
