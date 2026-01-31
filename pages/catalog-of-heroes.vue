<!-- https://feheroes.fandom.com/wiki/Catalog_of_Heroes -->
<template>
  <div class="pa-3 d-flex flex-column">
    <v-overlay
      :model-value="isLoading"
      class="d-flex justify-space-around align-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-overlay>

    <div>
      <TheWarningAboutLocalStorage class="mb-3" />

      <div class="d-flex align-center mb-3">
        <v-btn
          v-tooltip="t('global.reset')"
          icon
          size="x-small"
          class="mr-3"
          @click="confirmReset"
        >
          <v-icon>mdi-restart</v-icon>
        </v-btn>

        <v-spacer />

        <AppDownloadUpload
          :payload="payloadToSave"
          file-name="Catalog of Heroes.json"
          @uploaded="updateData"
        />

        <AppLocalstorageSaveStates
          :local-storage-key="LOCAL_STORAGE_KEY"
          :payload="payloadToSave"
          @loaded="updateData"
        />
      </div>
    </div>

    <v-container
      fluid
      class="flex-grow-1 pa-0"
    >
      <v-row>
        <!-- CATALOG OF HEROES -->
        <v-col
          cols="12"
          md="6"
          xl="3"
          xxl="2"
        >
          <h4>
            {{ t('catalogOfHeroes.headers.catalog') }}

            <v-tooltip
              location="bottom"
              :max-width="400"
            >
              <template #activator="{ props: tooltipProps }">
                <sup v-bind="tooltipProps">
                  <v-icon color="info"> mdi-information-outline </v-icon>
                </sup>
              </template>

              <div>
                <h4>
                  {{ t('catalogOfHeroes.tipForNewPlayers.title') }}
                </h4>
                <p>
                  {{ t('catalogOfHeroes.tipForNewPlayers.text') }}
                </p>
              </div>
            </v-tooltip>
          </h4>

          <RecycleScroller
            v-slot="{ item }"
            ref="catalogScroller"
            class="scroller scroller--catalog"
            :class="{ 'scroller--centered': mdAndDown }"
            :items="catalogLines"
            :item-size="frameSize"
          >
            <div class="d-flex">
              <!-- prettier-ignore -->
              <CompoUnitThumbnailCatalog
                v-for="unit in (item.units as IUnit[])"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :blackened="!ownedUnitIds.has(unit.id)"
                class="cursor-pointer"
                @click="
                  ownedUnitIds.has(unit.id)
                    ? ownedUnitIds.delete(unit.id)
                    : ownedUnitIds.add(unit.id)
                "
              />
            </div>
          </RecycleScroller>
        </v-col>

        <!-- RECAP BY COLOR & AVAILABILITY -->
        <v-col
          cols="12"
          md="6"
          xl="3"
          xxl="3"
          class="pl-xxl-16"
        >
          <h4>
            {{ t('catalogOfHeroes.headers.recap') }} : {{ ownedCount }} /
            {{ storeDataUnits.unitsCount }}
          </h4>

          <v-table class="text-no-wrap">
            <thead>
              <tr>
                <th />
                <th
                  v-for="color in SORTED_WEAPON_COLORS"
                  :key="color"
                  class="text-end"
                >
                  <AppIconOrb
                    :weapon-type="color"
                    :size="tileSize"
                  />
                </th>
                <th class="text-end">
                  {{ t('global.total') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="availability in SORTED_AVAILABILITIES"
                :key="availability"
              >
                <th>
                  <div v-if="availability === AV_OTHER">
                    Other
                    <sup v-tooltip="t('catalogOfHeroes.other')">
                      <v-icon color="info"> mdi-information-outline </v-icon>
                    </sup>
                  </div>
                  <UnitSource
                    v-else
                    :tile-size="tileSize"
                    :availability="availability"
                  />
                </th>
                <td
                  v-for="color in SORTED_WEAPON_COLORS"
                  :key="color"
                  class="text-end"
                >
                  <AppLink
                    :disabled="
                      isLoading ||
                      !allUnitsCountByWeaponColorByAvailability[availability][
                        color
                      ]
                    "
                    href="#"
                    @click.prevent="show(availability, color)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByWeaponColorByAvailability[
                            availability
                          ][color] || 0
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByWeaponColorByAvailability[
                            availability
                          ][color] || 0
                    }}
                  </AppLink>
                </td>
                <th class="text-end">
                  <AppLink
                    :disabled="!allUnitsCountByAvailability[availability]"
                    href="#"
                    @click.prevent="show(availability, undefined)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByAvailability[availability] || 0
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByAvailability[availability] || 0
                    }}
                  </AppLink>
                </th>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th>
                  {{ t('global.total') }}
                </th>
                <th
                  v-for="color in SORTED_WEAPON_COLORS"
                  :key="color"
                  class="text-end"
                >
                  <AppLink
                    :disabled="!allUnitsCountByWeaponColor[color]"
                    href="#"
                    @click.prevent="show(undefined, color)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByWeaponColor[color] || 0
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByWeaponColor[color] || 0
                    }}
                  </AppLink>
                </th>
                <th class="text-end">
                  <AppLink
                    :disabled="!storeDataUnits.unitsCount"
                    href="#"
                    @click.prevent="show(undefined, undefined)"
                  >
                    {{ isLoading ? t('global.NA') : ownedCount || 0 }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : storeDataUnits.unitsCount || 0
                    }}
                  </AppLink>
                </th>
              </tr>
            </tfoot>
          </v-table>
        </v-col>

        <!-- BANNERS -->
        <v-col
          cols="12"
          md="6"
          lg="4"
          xl="3"
          xxl="2"
        >
          <h4>{{ t('catalogOfHeroes.headers.banners') }}</h4>

          <AppAutocomplete
            v-if="storeDataBanners.banners"
            v-model="storeDataBanners.selectedBanner"
            :loading="storeDataBanners.isLoading"
            :items="storeDataBanners.banners"
            item-title="name"
            item-value="name"
            clearable
            class="mb-3"
          />

          <div v-if="storeDataBanners.selectedBanner">
            <div
              v-for="line in storeDataBanners.selectedBannerUnitsLines"
              :key="line.id"
              class="d-flex justify-center"
              :class="{ 'justify-center': mdAndDown }"
            >
              <CompoUnitThumbnailCatalog
                v-for="unit in line.units"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                :crossed="!ownedUnitIds.has(unit.id)"
                show-weapon
                class="cursor-pointer"
                @click="storeGlobals.showUnit(unit.id)"
              />
            </div>
          </div>
        </v-col>

        <!-- CUSTOM BANNER -->
        <v-col
          cols="12"
          md="6"
          lg="3"
          xl="3"
          xxl="2"
        >
          <h4>{{ t('catalogOfHeroes.headers.customBanner') }}</h4>

          <!--
          Use two distinct "select" in order to be able
          to "reset" the "select" once user has selected a unit
          -->
          <AppSelectUnit
            v-if="displaySelect1"
            density="default"
            clear-on-select
            without-thumbnail
            class="mb-2"
            clearable
            :label="t('global.unitName')"
            :forbidden-ids="selectedUnitIds"
            @update:model-value="selectUnit($event)"
          />
          <AppSelectUnit
            v-if="displaySelect2"
            density="default"
            clear-on-select
            without-thumbnail
            class="mb-2"
            clearable
            :label="t('global.unitName')"
            :forbidden-ids="selectedUnitIds"
            @update:model-value="selectUnit($event)"
          />

          <div>
            <div
              v-for="line in selectedUnitsLines"
              :key="line.id"
              class="d-flex justify-center"
              :class="{ 'justify-center': mdAndDown }"
            >
              <CompoUnitThumbnailCatalog
                v-for="unit in line.units"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                :crossed="!ownedUnitIds.has(unit.id)"
                show-weapon
                class="cursor-pointer"
                removable
                @click="storeGlobals.showUnit(unit.id)"
                @remove="deleteUnit(unit.id)"
              />
            </div>
          </div>
        </v-col>

        <!-- GRAILS SHOP -->
        <v-col
          cols="12"
          md="6"
          lg="5"
          xl="3"
          xxl="3"
        >
          <h4>{{ t('catalogOfHeroes.headers.heroicGrailsShop') }}</h4>

          <v-select
            v-model="storeDataUnitsHeroicGrails.order"
            :items="sortOrders"
            hide-details
            class="mb-3"
          />

          <RecycleScroller
            v-slot="{ item }"
            ref="grailsScroller"
            class="scroller scroller--grails scroller--centered"
            :class="{ 'scroller--centered': mdAndDown }"
            :items="storeDataUnitsHeroicGrails.heroicGrailsUnitsLines"
            :item-size="frameSize"
          >
            <div class="d-flex">
              <!-- prettier-ignore -->
              <CompoUnitThumbnailCatalog
                v-for="unit in (item.units as IUnit[])"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                :crossed="!ownedUnitIds.has(unit.id)"
                show-weapon
                :show-move="
                  storeDataUnitsHeroicGrails.order === SORT_BY_MOVE_TYPE
                "
                class="cursor-pointer"
                @click="storeGlobals.showUnit(unit.id)"
              />
            </div>
          </RecycleScroller>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="isModalOpen"
      width="auto"
    >
      <v-card>
        <v-card-text class="ma-3 pa-0">
          <!-- "scroller" class does not have any effect here -->
          <!-- because "v-dialog" gets teleported in body -->
          <!-- where the CSS variable for "v-bind('widthPx')" is not defined -->
          <RecycleScroller
            v-slot="{ item }"
            ref="modalScroller"
            :items="modalUnitsByLines"
            :item-size="frameSize"
            :style="{
              width: modalUnitsWidthPx,
              height: modalUnitsHeightPx,
            }"
          >
            <div class="d-flex">
              <!-- prettier-ignore -->
              <CompoUnitThumbnailCatalog
                v-for="unit in (item.units as IUnit[])"
                :key="unit.id"
                :unit="unit"
                :frame-size="frameSize"
                :thumbnail-size="thumbnailSize"
                :checked="ownedUnitIds.has(unit.id)"
                :crossed="!ownedUnitIds.has(unit.id)"
                show-weapon
                class="cursor-pointer"
                @click="storeGlobals.showUnit(unit.id)"
              />
            </div>
          </RecycleScroller>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import sum from 'lodash-es/sum'
import sortBy from 'lodash-es/sortBy'
import mapValues from 'lodash-es/mapValues'

import {
  type IUnit,
  type UnitId,
  getEmptyUnitsCountByWeaponColor,
  getEmptyUnitsCountByWeaponColorByAvailability,
} from '~/utils/types/units'
import {
  SORTED_AVAILABILITIES,
  AV_OTHER,
  type Availability,
} from '~/utils/types/units-availabilities'
import { SORTED_WEAPON_COLORS, type WeaponColor } from '~/utils/types/weapons'
import {
  chunkMaxLength,
  type IndexedByBy,
  type IndexedBy,
} from '~/utils/functions/typeSafe'
import {
  SORT_ORDERS,
  SORT_BY_MOVE_TYPE,
} from '~/utils/types/units-heroicGrails'
import {
  CURRENT_PAYLOAD_VERSION,
  LOCAL_STORAGE_KEY,
  type IPayloadToSaveV1,
} from '~/utils/types/catalog-of-heroes'

const { t } = useI18n()
const { mobile, mdAndDown } = useDisplay()

const frameSize = computed(() => (mobile.value ? 60 : 90))
const thumbnailSize = computed(() => (mobile.value ? 50 : 80))
const tileSize = 30
const rowsCount = ref(7)

const heightPx = computed(() => `${frameSize.value * rowsCount.value}px`)

const storeGlobals = useStoreGlobals()

const storeDataUnits = useStoreDataUnits()
const storeDataBanners = useStoreDataBanners()
const storeDataUnitsHeroicGrails = useStoreDataUnitsHeroicGrails()
const storeDataUnitsAvailabilities = useStoreDataUnitsAvailabilities()
const { isLoading: isLoadingStores } = useDataStores([
  storeDataUnits,
  storeDataBanners,
  storeDataUnitsHeroicGrails,
  storeDataUnitsAvailabilities,
])

const catalogScroller = useTemplateRef('catalogScroller')
const catalogContainer = computed<HTMLElement | undefined>(
  () => catalogScroller.value?.$el,
)
const { scrollbarWidth: catalogScrollbarWidth } = useScroll(catalogContainer)
const catalogScrollerWidthPx = computed(
  () =>
    `${frameSize.value * columnsCount.value + catalogScrollbarWidth.value}px`,
)

const grailsScroller = useTemplateRef('grailsScroller')
const grailsContainer = computed<HTMLElement | undefined>(
  () => grailsScroller.value?.$el,
)
const { scrollbarWidth: grailsScrollbarWidth } = useScroll(grailsContainer)
const grailsScrollerWidthPx = computed(
  () =>
    `${frameSize.value * columnsCount.value + grailsScrollbarWidth.value}px`,
)

const modalScroller = useTemplateRef('modalScroller')
const modalContainer = computed<HTMLElement | undefined>(
  () => modalScroller.value?.$el,
)
const { scrollbarWidth: modalScrollbarWidth } = useScroll(modalContainer)

const sortOrders = computed(() =>
  SORT_ORDERS.map((order) => ({
    value: order,
    title: t(`catalogOfHeroes.order.${order}`),
  })),
)

const isLoading = computed(
  () => isLoadingStores.value || isLoadingStorage.value,
)

const columnsCount = ref(5)

const sortedUnits = computed(() =>
  sortBy(storeDataUnits.units, ['origin', 'id_int']),
)
const catalogLines = computed(() =>
  chunkMaxLength(sortedUnits.value, columnsCount.value).map((line, index) => ({
    id: index,
    units: line,
  })),
)

const ownedUnitIds = ref(new Set())
const ownedCount = computed(() => ownedUnitIds.value.size)

function confirmReset() {
  if (!confirm(t('catalogOfHeroes.confirmReset'))) return

  ownedUnitIds.value = new Set()
}

const allUnitsCountByWeaponColorByAvailability = computed<
  IndexedByBy<Availability, WeaponColor, number>
>(() =>
  mapValues(
    storeDataUnits.unitsByWeaponColorByAvailability,
    (allUnitsByWeaponColor) =>
      mapValues(allUnitsByWeaponColor, (units) => units.length),
  ),
)
const allUnitsCountByAvailability = computed<IndexedBy<Availability, number>>(
  () =>
    mapValues(
      allUnitsCountByWeaponColorByAvailability.value,
      (allUnitsCountByWeaponColor) =>
        sum(Object.values(allUnitsCountByWeaponColor)),
    ),
)
const ownedUnitsCountByWeaponColorByAvailability = computed(() => {
  const res = getEmptyUnitsCountByWeaponColorByAvailability()
  if (!storeDataUnitsAvailabilities.isLoaded) return res

  storeDataUnits.unitsWithAvailability.forEach((unit) => {
    if (!ownedUnitIds.value.has(unit.id)) return

    res[unit.availability][unit.weaponColor] += 1
  })
  return res
})
const ownedUnitsCountByAvailability = computed<IndexedBy<Availability, number>>(
  () =>
    mapValues(
      ownedUnitsCountByWeaponColorByAvailability.value,
      (ownedUnitsCountByWeaponColor) =>
        sum(Object.values(ownedUnitsCountByWeaponColor)),
    ),
)

const allUnitsCountByWeaponColor = computed<IndexedBy<WeaponColor, number>>(
  () => mapValues(storeDataUnits.unitsByWeaponColor, (units) => units.length),
)
const ownedUnitsCountByWeaponColor = computed(() => {
  const res = getEmptyUnitsCountByWeaponColor()
  storeDataUnits.units.forEach((unit) => {
    if (!ownedUnitIds.value.has(unit.id)) return

    res[unit.weaponColor] += 1
  })
  return res
})

const displaySelect1 = ref(true)
const displaySelect2 = ref(false)
const selectedUnitIds = ref<UnitId[]>([])
function selectUnit(unitId?: UnitId | null) {
  if (!unitId) return

  const index = selectedUnitIds.value.indexOf(unitId)
  if (index === -1) {
    selectedUnitIds.value.push(unitId)
  }

  if (displaySelect1.value) {
    displaySelect1.value = false
    displaySelect2.value = true
  } else {
    displaySelect1.value = true
    displaySelect2.value = false
  }
}
function deleteUnit(unitId: UnitId) {
  const index = selectedUnitIds.value.indexOf(unitId)
  if (index === -1) return

  selectedUnitIds.value.splice(index, 1)
}
const selectedUnits = computed(() =>
  selectedUnitIds.value.map((id) => storeDataUnits.unitsById[id]),
)
const selectedUnitsLines = computed(() =>
  chunkMaxLength(selectedUnits.value, 4).map((line, index) => ({
    id: index,
    units: line,
  })),
)

// modal related stuff

const isModalOpen = ref(false)
const shownAvailability = ref<Availability>()
const shownWeaponColor = ref<WeaponColor>()
function show(availability?: Availability, color?: WeaponColor) {
  shownAvailability.value = availability
  shownWeaponColor.value = color
  isModalOpen.value = true
}

const modalUnits = computed(() => {
  if (shownAvailability.value && shownWeaponColor.value) {
    const unitsByWeaponColor =
      storeDataUnits.unitsByWeaponColorByAvailability[shownAvailability.value]
    return unitsByWeaponColor ? unitsByWeaponColor[shownWeaponColor.value] : []
  } else if (shownAvailability.value) {
    return storeDataUnits.unitsByAvailability[shownAvailability.value]
  } else if (shownWeaponColor.value) {
    return storeDataUnits.unitsByWeaponColor[shownWeaponColor.value]
  } else {
    return storeDataUnits.units
  }
})
const modalUnitsByLines = computed(() =>
  chunkMaxLength(
    sortBy(modalUnits.value, ['origin', 'id_int']),
    columnsCount.value,
  ).map((line, index) => ({
    id: index,
    units: line,
  })),
)
const modalUnitsColumnsShown = computed(() =>
  Math.min(columnsCount.value, modalUnits.value.length),
)
const modalUnitsWidthPx = computed(
  () =>
    `${frameSize.value * modalUnitsColumnsShown.value + modalScrollbarWidth.value}px`,
)
const modalUnitsLinesShown = computed(() =>
  Math.min(modalUnitsByLines.value.length, columnsCount.value),
)
const modalUnitsHeightPx = computed(
  () => `${frameSize.value * modalUnitsLinesShown.value}px`,
)

// local storage

const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

const payloadToSave = computed(() => ({
  version: CURRENT_PAYLOAD_VERSION,
  ownedUnitIds: Array.from(ownedUnitIds.value),
}))
storeOnUpdate(payloadToSave)
updateOnMounted(updateData)

function updateData(data: IPayloadToSaveV1) {
  if (data.version !== CURRENT_PAYLOAD_VERSION)
    throw new Error('unknown version')

  ownedUnitIds.value = new Set(data.ownedUnitIds)
}
</script>

<style lang="scss" scoped>
.scroller {
  height: v-bind('heightPx');
}
.scroller--catalog {
  width: v-bind('catalogScrollerWidthPx');
}
.scroller--grails {
  width: v-bind('grailsScrollerWidthPx');
}
.scroller--centered {
  margin: 0 auto;
}
</style>
