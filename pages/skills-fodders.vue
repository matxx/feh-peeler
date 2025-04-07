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
              storeDataUnitsAvailabilities.isLoading ||
              storeDataSkills.isLoading ||
              storeDataSkillsAvailabilities.isLoading ||
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
              <NuxtLink
                :to="storeLinks.skillTo(item)"
                :href="storeLinks.skillHref(item)"
                :target="storeLinks.htmlTarget"
              >
                {{ item.name }}
              </NuxtLink>
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

import type { ISkill } from '@/utils/types/skills'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { mobile } = useDisplay()
const storeLinks = useStoreLinks()
const localePath = useLocalePath()

const storeUnits = useStoreUnits()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const storeDataSkills = useStoreDataSkills()
const storeDataSkillsAvailabilities = useStoreDataSkillsAvailabilities()

onMounted(() => {
  storeUnits.load()
  storeDataUnitsAvailabilities.load()
  storeDataSkills.load()
  storeDataSkillsAvailabilities.load()
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
const itemsPerPage = ref(10)

const search = ref<string>()
watch(search, updateRouteWithSearch)
function updateRouteWithSearch() {
  router.replace({
    path: localePath('/skills-fodders'),
    query: search.value ? { name: search.value } : undefined,
  })
}

watch(route, updateSearchFromRoute, { immediate: true })
function updateSearchFromRoute() {
  if (!route.query.name) return

  search.value = String(route.query.name)
}

const searchLength = computed(() => (search.value ? search.value.length : 0))
const counter = computed(() =>
  searchLength.value <= MINIMAL_TEXT_SEARCH_LENGTH ? 3 : undefined,
)
const searchIsActive = computed(
  () => searchLength.value >= MINIMAL_TEXT_SEARCH_LENGTH,
)
const { regexp, errorMessages } = useSearch(search)

const sortedByAvailability = ref(true)

const skills = ref<ISkill[]>([])
const updateSkillsFiltered = () => {
  if (
    !regexp.value ||
    !search.value ||
    search.value.length < MINIMAL_TEXT_SEARCH_LENGTH
  ) {
    skills.value = storeDataSkills.skills
  } else {
    skills.value = filter(
      storeDataSkills.skills,
      (s) => !!s.filterableName.match(regexp.value!),
    )
  }
}
const { isUpdating } = useDebounce(updateSkillsFiltered, [
  [regexp],
  [() => storeDataSkills.skills],
])
</script>
