<template>
  <div>
    <h4>Page "modal"</h4>

    <p>
      <NuxtLink to="/"> Go to "index" </NuxtLink>
    </p>

    <p>
      <PlusModalLink to="/modal"> Open modal </PlusModalLink>
    </p>

    <p>
      <NuxtLink @click="enableCustomLayout"> enable layout </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

function enableCustomLayout() {
  setPageLayout('other')
}

console.log('page modal')
const modalRouter = useModalRouter()
watch(
  modalRouter.backgroundRoute,
  (val) => {
    const layout = val?.meta?.layout
    console.log('page layout', layout)
    if (layout) setPageLayout(layout)
  },
  { immediate: true },
)
</script>
