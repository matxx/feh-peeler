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
          file-name="FEHdex.json"
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
        <v-col>
          <h4>
            {{ t('catalogOfHeroes.headers.catalog') }}
          </h4>

          <RecycleScroller
            v-slot="{ item }"
            class="scroller"
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
        <v-col>
          <h4>
            {{ t('catalogOfHeroes.headers.recap') }} : {{ ownedCount }} /
            {{ storeDataUnits.unitsCount }}
          </h4>

          <v-table class="table-counts">
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
                    <v-icon
                      v-tooltip="t('catalogOfHeroes.other')"
                      color="info"
                    >
                      mdi-information-outline
                    </v-icon>
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
                  <NuxtLink
                    href="#"
                    @click.prevent="show(availability, color)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByWeaponColorByAvailability[
                            availability
                          ][color]
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByWeaponColorByAvailability[
                            availability
                          ][color]
                    }}
                  </NuxtLink>
                </td>
                <th class="text-end">
                  <NuxtLink
                    href="#"
                    @click.prevent="show(availability, undefined)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByAvailability[availability]
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByAvailability[availability]
                    }}
                  </NuxtLink>
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
                  <NuxtLink
                    href="#"
                    @click.prevent="show(undefined, color)"
                  >
                    {{
                      isLoading
                        ? t('global.NA')
                        : ownedUnitsCountByWeaponColor[color]
                    }}
                    /
                    {{
                      isLoading
                        ? t('global.NA')
                        : allUnitsCountByWeaponColor[color]
                    }}
                  </NuxtLink>
                </th>
                <th class="text-end">
                  <NuxtLink
                    href="#"
                    @click.prevent="show(undefined, undefined)"
                  >
                    {{ isLoading ? t('global.NA') : ownedCount }}
                    /
                    {{ isLoading ? t('global.NA') : storeDataUnits.unitsCount }}
                  </NuxtLink>
                </th>
              </tr>
            </tfoot>
          </v-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>{{ t('catalogOfHeroes.headers.banners') }}</h4>

          <v-autocomplete
            v-model="storeDataBanners.selectedBanner"
            :loading="storeDataBanners.isLoading"
            :items="storeDataBanners.banners"
            item-title="name"
            item-value="name"
            return-object
            clearable
            autocomplete="off"
          />

          <div v-if="storeDataBanners.selectedBanner">
            <div
              v-for="line in storeDataBanners.selectedBannerUnitsLines"
              :key="line.id"
              class="d-flex"
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
              />
            </div>
          </div>
        </v-col>
        <v-col>
          <h4>{{ t('catalogOfHeroes.headers.heroicGrailsShop') }}</h4>

          <v-select
            v-model="storeDataUnitsHeroicGrails.order"
            :items="sortOrders"
          />

          <RecycleScroller
            v-slot="{ item }"
            class="scroller"
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
        <v-card-text
          class="ma-3 pa-0"
          :style="{ width: `${frameSize * columnsCount}px` }"
        >
          <RecycleScroller
            v-slot="{ item }"
            class="scroller"
            :items="shownUnitsByLines"
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
  type UnitsCountByWeaponColor,
  type UnitsCountByWeaponColorByAvailability,
  type UnitsCountByAvailability,
  getEmptyUnitsCountByWeaponColor,
  getEmptyUnitsCountByWeaponColorByAvailability,
} from '~/utils/types/units'
import {
  SORTED_AVAILABILITIES,
  AV_OTHER,
  type Availability,
} from '~/utils/types/units-availabilities'
import { SORTED_WEAPON_COLORS, type WeaponColor } from '~/utils/types/weapons'
import { chunkMaxLength } from '~/utils/functions/typeSafe'
import {
  SORT_ORDERS,
  SORT_BY_MOVE_TYPE,
} from '~/utils/types/units-heroicGrails'

const { t } = useI18n()

const frameSize = 90
const thumbnailSize = 80
const tileSize = 30

const widthPx = computed(() => `${frameSize * 5}px`)

const storeDataUnits = useStoreDataUnits()
const storeDataBanners = useStoreDataBanners()
const storeDataUnitsHeroicGrails = useStoreDataUnitsHeroicGrails()
const { isLoading: isLoadingStores } = useDataStores([
  storeDataUnits,
  storeDataBanners,
  storeDataUnitsHeroicGrails,
  useStoreDataUnitsAvailabilities(),
])

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

const allUnitsCountByWeaponColorByAvailability =
  computed<UnitsCountByWeaponColorByAvailability>(() =>
    mapValues(
      storeDataUnits.unitsByWeaponColorByAvailability,
      (allUnitsByWeaponColor) =>
        mapValues(allUnitsByWeaponColor, (units) => units.length),
    ),
  )
const allUnitsCountByAvailability = computed<UnitsCountByAvailability>(() =>
  mapValues(
    allUnitsCountByWeaponColorByAvailability.value,
    (allUnitsCountByWeaponColor) =>
      sum(Object.values(allUnitsCountByWeaponColor)),
  ),
)
const ownedUnitsCountByWeaponColorByAvailability = computed(() => {
  const res = getEmptyUnitsCountByWeaponColorByAvailability()
  storeDataUnits.unitsWithAvailability.forEach((unit) => {
    if (!ownedUnitIds.value.has(unit.id)) return

    res[unit.availability][unit.weaponColor] += 1
  })
  return res
})
const ownedUnitsCountByAvailability = computed<UnitsCountByAvailability>(() =>
  mapValues(
    ownedUnitsCountByWeaponColorByAvailability.value,
    (ownedUnitsCountByWeaponColor) =>
      sum(Object.values(ownedUnitsCountByWeaponColor)),
  ),
)

const allUnitsCountByWeaponColor = computed<UnitsCountByWeaponColor>(() =>
  mapValues(storeDataUnits.unitsByWeaponColor, (units) => units.length),
)
const ownedUnitsCountByWeaponColor = computed(() => {
  const res = getEmptyUnitsCountByWeaponColor()
  storeDataUnits.units.forEach((unit) => {
    if (!ownedUnitIds.value.has(unit.id)) return

    res[unit.weaponColor] += 1
  })
  return res
})

const isModalOpen = ref(false)
const shownAvailability = ref<Availability>()
const shownWeaponColor = ref<WeaponColor>()
function show(availability?: Availability, color?: WeaponColor) {
  shownAvailability.value = availability
  shownWeaponColor.value = color
  isModalOpen.value = true
}

const shownUnits = computed(() => {
  if (shownAvailability.value && shownWeaponColor.value) {
    return storeDataUnits.unitsByWeaponColorByAvailability[
      shownAvailability.value
    ][shownWeaponColor.value]
  } else if (shownAvailability.value) {
    return storeDataUnits.unitsByAvailability[shownAvailability.value]
  } else if (shownWeaponColor.value) {
    return storeDataUnits.unitsByWeaponColor[shownWeaponColor.value]
  } else {
    return storeDataUnits.units
  }
})
const shownUnitsByLines = computed(() =>
  chunkMaxLength(
    sortBy(shownUnits.value, ['origin', 'id_int']),
    columnsCount.value,
  ).map((line, index) => ({
    id: index,
    units: line,
  })),
)

// local storage

const LOCAL_STORAGE_KEY = 'feh-peeler:catalog-of-heroes'
const CURRENT_PAYLOAD_VERSION = 1
const {
  isLoading: isLoadingStorage,
  storeOnUpdate,
  updateOnMounted,
} = useLocalStorage(LOCAL_STORAGE_KEY)

interface IPayloadToSaveV1 {
  version: 1
  ownedUnitIds: UnitId[]
}

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
.dialog__card {
  width: v-bind('widthPx');
}
.scroller {
  height: 400px;
}
.h-scroller {
  width: 500px;
  overflow-x: scroll;
}
</style>
