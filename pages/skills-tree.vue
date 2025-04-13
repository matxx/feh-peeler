<template>
  <v-container fluid>
    <v-text-field
      v-model="search"
      :loading="isLoading || isUpdating"
      label="Name"
      clearable
      density="compact"
      :counter="counter"
      :color="searchIsActive ? 'success' : 'primary'"
      :error-messages="errorMessages"
    />
    <v-treeview
      :items="skills"
      :opened="storeDataSkills.allSkillIds"
    />
  </v-container>
</template>

<script setup lang="ts">
import some from 'lodash-es/some'
import take from 'lodash-es/take'
import filter from 'lodash-es/filter'

import type { ISkillTree } from '@/utils/types/skills'
import { MINIMAL_TEXT_SEARCH_LENGTH } from '@/utils/constants'

const route = useRoute()
const router = useRouter()

const storeDataSkills = useStoreDataSkills()

const { isLoading } = useDataStores([
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
  useStoreDataSkillsUnits(),
])

const search = ref<string>()
watch(search, updateRouteWithSearch)
function updateRouteWithSearch() {
  router.replace({
    ...route,
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

function isNodeMatching(node: ISkillTree): boolean {
  if (node.skill.nameForFilters.match(regexp.value!)) return true
  if (!node.children) return false

  return some(node.children, (child) => isNodeMatching(child))
}
const skills = ref<ISkillTree[]>([])
const updateSkillsFiltered = () => {
  if (
    !regexp.value ||
    !search.value ||
    search.value.length < MINIMAL_TEXT_SEARCH_LENGTH
  ) {
    skills.value = take(storeDataSkills.skillsTree, 10)
  } else {
    skills.value = filter(storeDataSkills.skillsTree, (s) => isNodeMatching(s))
  }
}
const { isUpdating } = useDebounce(updateSkillsFiltered, [
  [regexp],
  [() => storeDataSkills.skills],
])
</script>
