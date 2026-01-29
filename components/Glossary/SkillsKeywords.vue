<template>
  <div>
    <p class="mb-3">{{ t('misc.glossary.skillsKeywords.note') }}</p>
    <v-table>
      <thead>
        <tr>
          <th class="text-left pt-3">
            <v-text-field
              v-model="searchText"
              variant="underlined"
              label="Name"
              clearable
              density="compact"
              :error-messages="errorMessages"
            />
          </th>
          <th
            v-show="!mobile"
            class="text-left pa-3"
          >
            {{ t('misc.glossary.skillsKeywords.headers.text') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <GlossarySkillsKeywordsItem
          v-for="(line, index) in lines"
          :key="index"
          :text="line"
          :regexp="regexp"
        />
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { mobile } = useDisplay()
const storeDataConstants = useStoreDataConstants()
const lines = computed(() => storeDataConstants.constants?.keywords || [])

const searchText = ref('')
const { regexp, errorMessages } = useSearch(searchText)
</script>
