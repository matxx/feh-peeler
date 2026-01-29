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
              :counter="counter"
              :color="searchIsActive ? 'success' : 'primary'"
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
          :regexp="searchIsActive ? regexp : undefined"
        />
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { MINIMAL_TEXT_SEARCH_LENGTH } from '~/utils/constants'

const { t } = useI18n()
const { mobile } = useDisplay()
const storeDataConstants = useStoreDataConstants()
const lines = computed(() => storeDataConstants.constants?.keywords || [])

const searchText = ref('')
const searchLength = computed(() =>
  searchText.value ? searchText.value.length : 0,
)
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH
    ? MINIMAL_TEXT_SEARCH_LENGTH
    : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, errorMessages } = useSearch(searchText)
</script>
