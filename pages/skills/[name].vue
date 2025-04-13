<template>
  <div class="ma-3">
    <div class="mb-5">
      <AppSelectSkill
        v-model="skillId"
        :loading="isLoading"
        :placeholder="t('global.skillName')"
        clearable
        thumbnail-at-end
        hide-link
      />
    </div>

    <!-- TODO: find out why modal always open up -->
    <!-- <template v-if="selectedSkill">
      <div
        class="mb-3 d-flex justify-space-between align-center"
        :class="{ 'flex-column-reverse': mobile }"
      >
        <div class="d-flex align-center">
          <div class="mx-3">
            {{ t('global.availability') }}
          </div>
          <SkillAvailability
            :skill="selectedSkill"
            :tile-size="SIZE"
            show-all
          />
        </div>

        <div class="d-flex">
          <v-btn
            icon
            flat
            color="primary"
            :href="lFandom(selectedSkill.group_name)"
            target="_blank"
            class="mr-3"
          >
            <img
              src="~/assets/images/fandom-logo.png"
              :height="TOOLBAR_ICON_SIZE"
            />
          </v-btn>
          <v-btn
            v-if="selectedSkill.game8_id"
            icon
            flat
            color="primary"
            :href="lGame8(selectedSkill.game8_id)"
            target="_blank"
          >
            <img
              src="~/assets/images/game8-logo-square.png"
              :height="TOOLBAR_ICON_SIZE"
            />
          </v-btn>
        </div>
      </div>

      <div>
        <v-card>
          <v-tabs
            v-model="tabSelected"
            bg-color="primary"
          >
            <v-tab
              v-for="tab in SHOW_TABS"
              :key="tab"
              :value="tab"
            >
              {{ t(`skills.show.tabs.${tab}`) }}
            </v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tabSelected">
              <v-tabs-window-item :value="TAB_DETAILS">
                <SkillShowDetails :skill="selectedSkill" />
              </v-tabs-window-item>
              <v-tabs-window-item :value="TAB_FODDERS">
                <SkillShowFodders
                  :skill="selectedSkill"
                  :tile-size="FODDERS_TILE_SIZE"
                />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </div>
    </template> -->
  </div>
</template>

<script setup lang="ts">
import type { SkillId } from '~/utils/types/skills'
// import {
//   TAB_DETAILS,
//   TAB_FODDERS,
//   SHOW_TABS,
//   SHOW_DEFAULT_TAB,
//   type SkillId,
// } from '~/utils/types/skills'

// const SIZE = 40
// const FODDERS_TILE_SIZE = 40
// const TOOLBAR_ICON_SIZE = 20

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
// const { mobile } = useDisplay()
// const { l: lGame8 } = useGame8()
// const { l: lFandom } = useFandom()
const localePath = useLocalePath()

// const tabSelected = ref<string>(
//   route.params.tab ? String(route.params.tab) : SHOW_DEFAULT_TAB,
// )

const storeDataSkills = useStoreDataSkills()
const { isLoading } = useDataStores([
  storeDataSkills,
  useStoreDataSkillsAvailabilities(),
  useStoreDataSkillsDescriptions(),
  useStoreDataUnits(),
  useStoreDataUnitsAvailabilities(),
  useStoreDataSkillsUnits(),
])

const skillId = ref<SkillId>()
const selectedSkill = computed(() =>
  skillId.value ? storeDataSkills.skillsById[skillId.value] : undefined,
)
watch(selectedSkill, () => {
  if (!selectedSkill.value) {
    router.push(
      localePath({
        name: 'skills',
      }),
    )
    return
  }

  if (route.params.name === selectedSkill.value.nameForLink) return

  router.push(
    localePath({
      name: 'skills-name',
      params: { name: selectedSkill.value.nameForLink },
    }),
  )
})

watch(
  [() => storeDataSkills.isLoaded, route],
  () => {
    if (!storeDataSkills.isLoaded) return
    if (!route.params.name) return
    if (route.params.name instanceof Array) return

    const skill = storeDataSkills.skillsByNameForLink[route.params.name]
    if (!skill) return

    skillId.value = skill.id
  },
  { immediate: true },
)
</script>
