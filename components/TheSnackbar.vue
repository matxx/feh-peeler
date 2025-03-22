<template>
  <!--
    can be improve with a queue system
    https://github.com/ajanes93/vuetify-snackbar-queue/blob/master/src/components/VSnackbarQueue.vue
    /!\ do not copy it, it uses "underscore" and there is a problem with timeouts
    https://github.com/ajanes93/vuetify-snackbar-queue/issues/3
    we can copy it and improve it
  -->
  <v-snackbar
    v-model="snackbar.active"
    :color="snackbar.options.color"
    :multi-line="snackbar.options.mode === 'multi-line'"
    :timeout="snackbar.options.timeout"
    :vertical="snackbar.options.mode === 'vertical'"
  >
    {{ snackbar.options.text }}
    <template #actions>
      <v-btn @click="snackbar.active = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const snackbar = useStoreSnackbar()
watch(
  () => snackbar.active,
  (value) => {
    if (value) return

    snackbar.$reset()
  },
)
</script>
