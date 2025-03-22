<!--
this component is a mix between "v-if" and "v-show"
it takes advantage of the speed performance of v-show
but is not rendered before it has been "active" at least once
-->
<template>
  <component
    :is="tag"
    v-if="isLoaded || isPresent"
    v-show="isPresent"
  >
    <slot :item="item!" />
  </component>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    item?: T
    tag?: string
  }>(),
  {
    item: undefined,
    tag: 'div',
  },
)
const isLoaded = ref(false)
const isPresent = computed(() => !!props.item)
watch(
  () => props.item,
  () => {
    if (props.item) isLoaded.value = true
  },
)
</script>
