<template>
  <div>
    <h4>Page "other"</h4>

    <p>
      <NuxtLink to="/"> Go to "index" </NuxtLink>
    </p>

    <p>
      <PlusModalLink to="/modal"> Open modal </PlusModalLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'other',
})
</script>
