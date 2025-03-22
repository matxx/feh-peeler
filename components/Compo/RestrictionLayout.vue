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

<style lang="scss" scoped>
.z-index-1 {
  z-index: 1;
}
.crossed {
  position: relative;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    top: -10%;
    height: 120%;
    width: 2px;
    background-color: currentColor;
    box-shadow: 0px 0px 3px 1px white;
    z-index: 0;
  }
  &::before {
    content: ' ';
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
}
</style>
