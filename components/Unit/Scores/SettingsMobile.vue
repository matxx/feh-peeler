<template>
  <div>
    <v-btn
      icon
      size="x-small"
      @click="isOpen = !isOpen"
    >
      <v-icon :color="active ? 'primary' : undefined">mdi-filter</v-icon>
    </v-btn>

    <v-navigation-drawer
      v-if="mounted && mobile"
      v-model="isOpen"
      location="bottom"
    >
      <slot name="drawer" />
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
const { mobile } = useDisplay()
const { mounted } = useMounted()
withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)
const isOpen = ref(false)
</script>
