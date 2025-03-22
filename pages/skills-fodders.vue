<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex align-center">
        <div
          v-show="mobile"
          class="mr-3"
        >
          <SkillFodderSortingMobile
            v-model:sorted-by-availability="sortedByAvailability"
          />
        </div>
        <div>
          {{ t('global.inpiredBy') }}
          <a
            href="https://kannadb.up.railway.app/feh/skills/all/"
            target="_blank"
            class="text-decoration-none"
          >
            KannaDB
          </a>
        </div>
      </v-col>
      <v-col v-show="!mobile">
        <SkillFodderSortingDesktop
          v-model:sorted-by-availability="sortedByAvailability"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Name"
          clearable
          density="compact"
          :counter="counter"
          :color="searchIsActive ? 'success' : 'primary'"
          :error-messages="errorMessages"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="skills"
            :loading="
              storeUnits.isLoading ||
              storeUnitsAvailabilities.isLoading ||
              storeSkills.isLoading ||
              storeSkillsAvailabilities.isLoading ||
              isUpdating
            "
            class="text-no-wrap"
          >
            <template #[`item.image`]="{ item }">
              <div class="fill-height d-flex justify-space-around align-center">
                <SkillImg
                  :skill="item"
                  :size="iconSize"
                />
              </div>
            </template>
            <template #[`item.name`]="{ item }">
              <a
                :href="storeLinks.skill(item)"
                target="_blank"
              >
                {{ item.name }}
              </a>
            </template>
            <template #[`item.availability`]="{ item }">
              <SkillFodderAvailabilities
                :skill="item"
                :tile-size="size"
                :skill-icon-size="iconSize"
                :sorted-by-availability="sortedByAvailability"
              />
            </template>
            <template #[`item.pre-inheritance`]="{ item }">
              <SkillFodderPreInheritances
                :skill="item"
                :tile-size="size"
                :skill-icon-size="iconSize"
                :sorted-by-availability="sortedByAvailability"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import filter from 'lodash-es/filter'
import debounce from 'lodash-es/debounce'

import type { ISkill } from '@/utils/types/skills'
import { DEBOUNCE_TIME, MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const { t } = useI18n()
const { mobile } = useDisplay()
const storeLinks = useStoreLinks()
const storeSearches = useStoreSearches()

const storeUnits = useStoreUnits()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()
const storeSkills = useStoreSkills()
const storeSkillsAvailabilities = useStoreSkillsAvailabilities()

onMounted(() => {
  storeUnits.load()
  storeUnitsAvailabilities.load()
  storeSkills.load()
  storeSkillsAvailabilities.load()
})

const keys = ['image', 'name', 'availability', 'pre-inheritance']
const headers = computed(() =>
  keys.map((key) => ({
    key,
    title: t(`skillsFodders.columns.${key}`),
    sortable: key === 'name',
  })),
)

const iconSize = 30
const size = 40

const search = ref<string | null>(null)
const searchLength = computed(() => (search.value ? search.value.length : 0))
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, errorMessages } = useSearch(search)

const sortedByAvailability = ref(true)

const isUpdating = ref(false)
const skills = ref<ISkill[]>([])
const itemsPerPage = ref(10)
const update = debounce(() => {
  if (isUpdating.value) return

  isUpdating.value = true
  nextTick(() => {
    if (!search.value || search.value.length < MINIMAL_TEXT_SEARCH_LENGTH) {
      skills.value = storeSkills.skills
    } else if (regexp.value) {
      skills.value = filter(
        storeSkills.skills,
        (s) => !!s.filterableName.match(regexp.value!),
      )
    }
    isUpdating.value = false
  })
}, DEBOUNCE_TIME)
onMounted(update)
watch(search, update)
watch(() => storeSkills.skills, update)
watch(() => storeSearches.useRegExp, update)
</script>
