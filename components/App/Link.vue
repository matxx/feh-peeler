<template>
  <component
    :is="disabled ? 'div' : NuxtLink"
    class="app-link"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const emit = defineEmits(['click'])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

function onClick(event: MouseEvent) {
  if (props.disabled) return

  emit('click', event)
}
</script>

<style lang="scss" scoped>
.app-link {
  text-decoration: initial;
}
</style>
