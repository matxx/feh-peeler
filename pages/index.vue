<template>
  <div class="fill-height d-flex flex-column justify-space-around align-center">
    <AppPages show-subtitles />
  </div>
</template>

<script setup lang="ts">
// preload some data stores for other pages
useDataStores([useStoreDataSkills(), useStoreDataUnits()])
</script>
