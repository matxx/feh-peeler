<!--
this component is a mix between "v-if" and "v-show"
it takes advantage of the speed performance of v-show
but is not rendered before it has been "active" at least once
-->
<template>
  <component
    :is="tag"
    v-if="isLoaded || active"
    v-show="active"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    active: boolean
    tag?: string
  }>(),
  { tag: 'div' },
)
const isLoaded = ref(false)
watch(
  () => props.active,
  () => {
    if (props.active) isLoaded.value = true
  },
)
</script>
