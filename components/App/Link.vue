<template>
  <component
    :is="disabled ? 'div' : NuxtLink"
    v-bind="$attrs"
    class="app-link"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

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
