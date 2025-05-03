<template>
  <Teleport to="body">
    <v-dialog v-model="isOpen">
      <v-card>
        <h4>Modal</h4>
      </v-card>
    </v-dialog>
  </Teleport>
</template>

<script setup lang="ts">
console.log('modal modal')

const route = useRoute()
const router = useRouter()
const parentRoute = useParentRoute()
const modalRouter = useModalRouter()

/*
console.log('modal')
console.log('route', route)
console.log('router', router)
console.log('parentRoute', parentRoute)
console.log('modalRouter', modalRouter.backgroundRoute)
*/
//console.log('x', modalRouter.backgroundRoute.value.meta.layout)
//const layout = modalRouter.backgroundRoute.value?.meta?.layout
//if (layout) setPageLayout(layout)

watch(
  modalRouter.backgroundRoute,
  (val) => {
    const layout = val?.meta?.layout
    console.log('modal layout', val?.path, layout)
    setPageLayout(layout || 'default')
  },
  { immediate: true },
)
//setPageLayout(modalRouter.backgroundRoute.value.meta.layout)

const isOpen = ref(true)
watch(isOpen, () => {
  if (isOpen.value) return

  modalRouter.close()
})
</script>
