<template>
  <v-dialog
    v-model="isOpen"
    max-width="500"
  >
    <template #activator>
      <v-fab
        color="primary"
        variant="text"
        absolute
        location="top end"
        icon="mdi-cog"
        size="small"
        @click="isOpen = !isOpen"
      />
    </template>

    <v-card>
      <v-card-title>
        {{ t('global.headers.settings') }}
      </v-card-title>

      <v-card-text>
        <v-radio-group v-model="selectedOption">
          <template #label>
            {{ t('unitsFodder.chooseTheOrderOfTheBridgeFodderConsidered') }}
          </template>

          <v-radio
            v-for="(option, index) in options"
            :key="index"
            :value="index"
          >
            <template #label>
              <div class="d-flex my-3">
                <div
                  v-for="availability in option"
                  :key="availability"
                  class="mr-2"
                >
                  <CompoAvailabilityForSkill
                    :availability="availability"
                    :size="SIZE"
                  />
                </div>
              </div>
            </template>
          </v-radio>

          <v-radio
            :value="CUSTOM"
            :label="t('global.other')"
          >
            <template #label>
              <span class="my-3">{{ t('global.other') }}</span>
            </template>
          </v-radio>
        </v-radio-group>

        <div v-if="selectedOption === CUSTOM">
          <v-btn-group
            variant="outlined"
            divided
          >
            <v-menu
              v-for="(availability, idx) in customAvailabilities"
              :key="idx"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                >
                  <CompoAvailabilityForSkill
                    :availability="availability"
                    :size="SIZE"
                  />
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in AVAILABILITIES"
                  :key="i"
                  :value="item"
                  color="primary"
                  variant="plain"
                  @click="customAvailabilities[idx] = item"
                >
                  <template #prepend>
                    <CompoAvailabilityForSkill
                      :availability="item"
                      :size="SIZE"
                    />
                  </template>

                  <v-list-item-title class="pl-5">
                    {{ t(`unitsFodder.availabilities.${item}`) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn
              size="small"
              @click="
                customAvailabilities[customAvailabilities.length] =
                  AV_GENERIC_POOL_34
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              v-if="customAvailabilities.length > 0"
              size="small"
              @click="() => customAvailabilities.pop()"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-btn-group>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :text="t('global.cta.cancel')"
          @click="close"
        />
        <v-btn
          color="primary"
          :text="t('global.cta.submit')"
          @click="submit"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { AV_GENERIC_POOL_34 } from '~/utils/types/obfuscated-keys'
import {
  AVAILABILITIES,
  AVAILABILITIES_WO_DC,
  AVAILABILITIES_DC_BEFORE_S4,
  AVAILABILITIES_S4_BEFORE_DC,
  type Availability,
} from '~/utils/types/skills-availabilities'

const { t } = useI18n()
const storeFodderSettings = useStoreFodderSettings()

const options = computed(() => [
  AVAILABILITIES_WO_DC,
  AVAILABILITIES_DC_BEFORE_S4,
  AVAILABILITIES_S4_BEFORE_DC,
])
const selectedOption = ref<number>()

const customAvailabilities = ref<Availability[]>([])

const isOpen = ref(false)
watch(isOpen, (value) => {
  if (value) {
    customAvailabilities.value =
      storeFodderSettings.fodderAvailabilities.concat()

    const index = options.value.findIndex(
      (option) =>
        JSON.stringify(option) ===
        JSON.stringify(storeFodderSettings.fodderAvailabilities),
    )
    if (index === -1) {
      selectedOption.value = CUSTOM
    } else {
      selectedOption.value = index
    }
  }
})

const SIZE = 30
const CUSTOM = 100000

function close() {
  isOpen.value = false
}
function submit() {
  if (selectedOption.value === undefined) return close()

  storeFodderSettings.setFodderAvailabilities(
    selectedOption.value === CUSTOM
      ? customAvailabilities.value
      : options.value[selectedOption.value],
  )

  close()
}
</script>
