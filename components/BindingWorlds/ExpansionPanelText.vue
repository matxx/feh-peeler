<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="schema"
  >
    <v-container
      fluid
      class="pa-0 position-relative"
    >
      <v-fab
        v-if="unit"
        color="primary"
        absolute
        location="top end"
        :icon="disabled ? 'mdi-pencil' : 'mdi-close'"
        size="x-small"
        class="mt-n10 mr-10"
        @click="disabled = !disabled"
      />
      <v-fab
        v-if="unit"
        color="primary"
        absolute
        location="top end"
        icon="mdi-delete"
        size="x-small"
        class="mt-n10"
        :loading="isDeleting"
        @click="confirmUnitDeletion"
      />

      <v-row class="mt-8">
        <v-col
          cols="12"
          sm="6"
        >
          <VeeField
            v-slot="{ handleChange, errors }"
            v-model="localUnit.enclosure"
            name="enclosure"
          >
            <v-text-field
              v-model.number="localUnit.enclosure"
              :disabled="disabled"
              required
              type="number"
              step="1"
              min="0"
              pattern="[0-9]+"
              density="compact"
              hide-details
              class="mb-2"
              :label="t('bindingWorlds.labels.enclosureLevel')"
              :error-messages="errors"
              @update:model-value="handleChange"
            />
          </VeeField>

          <VeeField
            v-slot="{ handleChange, errors }"
            :value="localUnit.id"
            name="id"
          >
            <AppSelectUnit
              v-model="localUnit.id"
              :disabled="disabled"
              required
              class="mb-2"
              :error-messages="errors"
              :label="t('bindingWorlds.labels.unitName')"
              @update:model-value="handleChange"
            />
          </VeeField>

          <v-text-field
            v-model="localUnit.rating"
            clearable
            pattern="[0-9](\.[0-9])?"
            :disabled="disabled"
            density="compact"
            hide-details
            class="mb-2"
            :label="t('bindingWorlds.labels.rating')"
          />

          <v-container
            fluid
            class="pa-0"
          >
            <v-row dense>
              <v-col>
                <v-select
                  v-model="localUnit.boon"
                  :items="itemsForIVs"
                  :disabled="disabled"
                  clearable
                  density="compact"
                  hide-details
                  class="mb-2"
                  :label="t('bindingWorlds.labels.boon')"
                />
              </v-col>
              <!-- <v-col>
                <v-select
                  v-model="localUnit.boonAscended"
                  :items="itemsForIVs"
                  :disabled="disabled"
                  clearable
                  density="compact"
                  hide-details
                  class="mb-2"
                  :label="t('bindingWorlds.labels.boonAscended')"
                />
              </v-col> -->
              <v-col>
                <v-select
                  v-model="localUnit.bane"
                  :items="itemsForIVs"
                  :disabled="disabled"
                  clearable
                  density="compact"
                  hide-details
                  class="mb-2"
                  :label="t('bindingWorlds.labels.bane')"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-text-field
            v-model.number="localUnit.dragonflowers"
            clearable
            :disabled="disabled"
            type="number"
            step="1"
            min="0"
            pattern="[0-9]+"
            density="compact"
            hide-details
            class="mb-2"
            :label="t('bindingWorlds.labels.dragonflowers')"
          />

          <v-textarea
            v-model="localUnit.notes"
            :disabled="disabled"
            clearable
            density="compact"
            rows="3"
            no-resize
            hide-details
            class="mb-2"
            :label="t('bindingWorlds.labels.notes')"
          />

          <v-select
            v-model="localUnit.hidingReason"
            clearable
            :items="itemsForHidingReason"
            :disabled="disabled"
            density="compact"
            hide-details
            class="mb-2"
            :label="t('bindingWorlds.labels.hidingReason')"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <AppSelectSkill
            v-for="category in SKILL_CATEGORIES_FOR_BINDING_WORLDS"
            :key="category"
            v-model="localUnit.skillIds[category]"
            :skill-category="category"
            :disabled="disabled"
            clearable
            class="mb-2"
          />
        </v-col>
      </v-row>

      <v-row v-show="!disabled">
        <v-col>
          <div class="d-flex justify-end">
            <v-btn
              color="primary"
              @click="handleSubmit($event, save)"
            >
              {{ t(unit ? 'global.update' : 'global.add') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </VeeForm>
</template>

<script setup lang="ts">
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

import { SKILL_CATEGORIES_FOR_BINDING_WORLDS } from '~/utils/types/skills'
import { IVS } from '~/utils/types/IVs'
import type { UnitInBindingWorlds } from '~/utils/events/binding-worlds'
import {
  HIDING_REASONS,
  getEmptyUnitInstanceInBindingWorlds,
} from '~/utils/events/binding-worlds'

const { t } = useI18n()

const emit = defineEmits(['save', 'delete'])
const props = defineProps<{
  unit?: UnitInBindingWorlds
}>()

const disabled = ref(!!props.unit)
const isDeleting = ref(false)

const itemsForHidingReason = HIDING_REASONS.map((reason) => ({
  value: reason,
  title: t(`bindingWorlds.hidingReasons.${reason}`),
}))
const itemsForIVs = IVS.map((iv) => ({
  value: iv,
  title: t(`global.IVs.${iv}`),
}))

const localUnit = ref<UnitInBindingWorlds>(
  props.unit ? { ...props.unit } : getEmptyUnitInstanceInBindingWorlds(),
)

function save() {
  emit('save', { ...localUnit.value })
  disabled.value = true
}
watch(disabled, (value) => {
  if (!value) return
  if (!props.unit) return

  localUnit.value = { ...props.unit }
})

const schema = toTypedSchema(
  zod.object({
    enclosure: zod.number({
      required_error: 'required',
      invalid_type_error: 'must be a number',
    }),
    id: zod
      .string({
        required_error: 'required',
        invalid_type_error: 'must be a string',
      })
      .min(1, { message: 'can not be empty' }),
  }),
)

function confirmUnitDeletion() {
  if (!confirm(t('bindingWorlds.confirmUnitDeletion'))) {
    return (isDeleting.value = false)
  }

  isDeleting.value = true
  nextTick(() => {
    emit('delete')
  })
}
</script>
