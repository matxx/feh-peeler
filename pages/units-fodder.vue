<template>
  <div class="ma-3">
    <div class="mb-3">
      {{ t('global.inpiredBy') }}
      <!-- eslint-disable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/user/JabPerson/"
        target="_blank"
        class="text-decoration-none"
      >
        @JabPerson</a
      >
      Reddit
      <!-- eslint-enable vue/html-closing-bracket-newline -->
      <a
        href="https://www.reddit.com/r/FireEmblemHeroes/comments/1gumcdt/can_you_inherit_all_their_fodder_in_one_go/"
        target="_blank"
        class="text-decoration-none"
      >
        {{ t('global.post') }}
      </a>
    </div>

    <div class="mb-5">
      <AppSelectUnit
        v-model="unitId"
        :label="t('bindingWorlds.labels.unitName')"
        clearable
        thumbnail-at-end
      />
    </div>
    <div
      v-if="selectedUnit"
      class="mb-5 d-flex align-center"
    >
      <div class="mr-3">
        {{ t('unitsFodder.availability') }}
      </div>
      <UnitAvailability
        :unit="selectedUnit"
        :tile-size="SIZE"
        show-all
      />
    </div>
    <div v-if="selectedUnit">
      <UnitFodder
        :unit="selectedUnit"
        :size="SIZE"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnitId } from '~/utils/types/units'

const SIZE = 40

const { t } = useI18n()
const route = useRoute()
const storeUnits = useStoreUnits()
const storeUnitsAvailabilities = useStoreUnitsAvailabilities()
const storeSkills = useStoreSkills()
const storeSkillsAvailabilities = useStoreSkillsAvailabilities()

const unitId = ref<UnitId>()
const selectedUnit = computed(() =>
  unitId.value ? storeUnits.unitsById[unitId.value] : undefined,
)

onMounted(() => {
  storeUnits.load().then(() => {
    if (!route.query.name) return

    const unit = storeUnits.unitsByFullName[String(route.query.name)]
    if (!unit) return

    unitId.value = unit.id
  })
  storeUnitsAvailabilities.load()
  storeSkills.load()
  storeSkillsAvailabilities.load()
})
</script>
