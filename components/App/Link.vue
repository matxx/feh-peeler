<template>
  <component
    :is="disabled ? 'div' : NuxtLink"
    class="app-link"
    @click="
      ($event) => {
        if (disabled) return

        $emit('click', $event)
      }
    "
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

defineEmits(['click'])
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.app-link {
  text-decoration: initial;
}
</style>
