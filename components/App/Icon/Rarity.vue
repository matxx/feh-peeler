<template>
  <img
    v-if="image"
    :src="image"
    :width="size"
    :height="size"
    :alt="t(`global.assets.icons.alt.rarity.${rarity}`)"
  />
</template>

<script setup lang="ts">
import Img1Stars from '~/assets/icons/rarity/1stars.png'
import Img2Stars from '~/assets/icons/rarity/2stars.png'
import Img3Stars from '~/assets/icons/rarity/3stars.png'
import Img4Stars from '~/assets/icons/rarity/4stars.png'
import Img5Stars from '~/assets/icons/rarity/5stars.png'
import Img45Stars from '~/assets/icons/rarity/4.5stars.png'

const { t } = useI18n()
const props = defineProps<{
  rarity: number
  size: string
}>()

// sometimes working, sometimes not...
// const imageUrl = new URL(
//   `../../../assets/icons/rarity/${props.rarity}stars.png`,
//   import.meta.url,
// ).href

const image = computed(() => {
  switch (props.rarity) {
    case 1:
      return Img1Stars
    case 2:
      return Img2Stars
    case 3:
      return Img3Stars
    case 4:
      return Img4Stars
    case 5:
      return Img5Stars
    case 4.5:
      return Img45Stars
  }
  return null
})
</script>
