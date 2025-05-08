<template>
  <img
    :src="image"
    :width="size"
    :height="size"
  />
</template>

<script setup lang="ts">
import type { WeaponColor } from '@/utils/types/weapons'
import { WEAPON_R, WEAPON_B, WEAPON_G, WEAPON_C } from '@/utils/types/weapons'

import IconR from '~/assets/icons/summoning/orbs/Red_Orb.png'
import IconB from '~/assets/icons/summoning/orbs/Blue_Orb.png'
import IconG from '~/assets/icons/summoning/orbs/Green_Orb.png'
import IconC from '~/assets/icons/summoning/orbs/Colorless_Orb.png'

const props = defineProps<{
  weaponType: WeaponColor
  size: number
}>()

const image = computed(() => {
  switch (props.weaponType) {
    case WEAPON_R:
      return IconR
    case WEAPON_B:
      return IconB
    case WEAPON_G:
      return IconG
    case WEAPON_C:
      return IconC
  }

  return undefined
})
</script>
