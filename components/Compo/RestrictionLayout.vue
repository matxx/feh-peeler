<template>
  <v-sheet
    :height="size"
    :width="size"
    class="d-flex justify-space-around align-center"
    :class="{ crossed: !canUse }"
    color="transparent"
  >
    <slot v-bind="{ size: (size * 5) / 6 }" />
  </v-sheet>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size: number
    canUse?: boolean
  }>(),
  {
    canUse: false,
  },
)
</script>
