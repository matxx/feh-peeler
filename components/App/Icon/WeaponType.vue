<template>
  <img
    :src="image"
    :width="size"
    :height="size"
  />
</template>

<script setup lang="ts">
import type { ExtendedWeaponType } from '@/utils/types/weapons'
import * as WeaponTypes from '@/utils/types/weapons'

import IconR from '@/assets/icons/weapon_types/red.png'
import IconB from '@/assets/icons/weapon_types/blue.png'
import IconG from '@/assets/icons/weapon_types/green.png'
import IconC from '@/assets/icons/weapon_types/colorless.png'

import IconAllSw from '@/assets/icons/weapon_types/all_sword.png'
import IconAllLa from '@/assets/icons/weapon_types/all_lance.png'
import IconAllAx from '@/assets/icons/weapon_types/all_axe.png'
import IconAllSt from '@/assets/icons/weapon_types/all_staff.png'
import IconAllBo from '@/assets/icons/weapon_types/all_bow.png'
import IconAllDa from '@/assets/icons/weapon_types/all_dagger.png'
import IconAllTo from '@/assets/icons/weapon_types/all_tome.png'
import IconAllBr from '@/assets/icons/weapon_types/all_breath.png'
import IconAllBe from '@/assets/icons/weapon_types/all_beast.png'

import IconRSw from '@/assets/icons/weapon_types/red_sword.png'
import IconRBo from '@/assets/icons/weapon_types/red_bow.png'
import IconRDa from '@/assets/icons/weapon_types/red_dagger.png'
import IconRTo from '@/assets/icons/weapon_types/red_tome.png'
import IconRBr from '@/assets/icons/weapon_types/red_breath.png'
import IconRBe from '@/assets/icons/weapon_types/red_beast.png'

import IconBLa from '@/assets/icons/weapon_types/blue_lance.png'
import IconBBo from '@/assets/icons/weapon_types/blue_bow.png'
import IconBDa from '@/assets/icons/weapon_types/blue_dagger.png'
import IconBTo from '@/assets/icons/weapon_types/blue_tome.png'
import IconBBr from '@/assets/icons/weapon_types/blue_breath.png'
import IconBBe from '@/assets/icons/weapon_types/blue_beast.png'

import IconGAx from '@/assets/icons/weapon_types/green_axe.png'
import IconGBo from '@/assets/icons/weapon_types/green_bow.png'
import IconGDa from '@/assets/icons/weapon_types/green_dagger.png'
import IconGTo from '@/assets/icons/weapon_types/green_tome.png'
import IconGBr from '@/assets/icons/weapon_types/green_breath.png'
import IconGBe from '@/assets/icons/weapon_types/green_beast.png'

import IconCSt from '@/assets/icons/weapon_types/colorless_staff.png'
import IconCBo from '@/assets/icons/weapon_types/colorless_bow.png'
import IconCDa from '@/assets/icons/weapon_types/colorless_dagger.png'
import IconCTo from '@/assets/icons/weapon_types/colorless_tome.png'
import IconCBr from '@/assets/icons/weapon_types/colorless_breath.png'
import IconCBe from '@/assets/icons/weapon_types/colorless_beast.png'

const props = defineProps<{
  weaponType: ExtendedWeaponType
  size: number
}>()

const image = computed(() => {
  switch (props.weaponType) {
    case WeaponTypes.WEAPON_R:
      return IconR
    case WeaponTypes.WEAPON_B:
      return IconB
    case WeaponTypes.WEAPON_G:
      return IconG
    case WeaponTypes.WEAPON_C:
      return IconC

    case WeaponTypes.WEAPON_A_ME:
      return IconAllSw

    case WeaponTypes.WEAPON_A_SW:
      return IconAllSw
    case WeaponTypes.WEAPON_A_LA:
      return IconAllLa
    case WeaponTypes.WEAPON_A_AX:
      return IconAllAx
    case WeaponTypes.WEAPON_A_ST:
      return IconAllSt
    case WeaponTypes.WEAPON_A_BO:
      return IconAllBo
    case WeaponTypes.WEAPON_A_DA:
      return IconAllDa
    case WeaponTypes.WEAPON_A_TO:
      return IconAllTo
    case WeaponTypes.WEAPON_A_BR:
      return IconAllBr
    case WeaponTypes.WEAPON_A_BE:
      return IconAllBe

    case WeaponTypes.WEAPON_R_SW:
      return IconRSw
    case WeaponTypes.WEAPON_R_BO:
      return IconRBo
    case WeaponTypes.WEAPON_R_DA:
      return IconRDa
    case WeaponTypes.WEAPON_R_TO:
      return IconRTo
    case WeaponTypes.WEAPON_R_BR:
      return IconRBr
    case WeaponTypes.WEAPON_R_BE:
      return IconRBe

    case WeaponTypes.WEAPON_B_LA:
      return IconBLa
    case WeaponTypes.WEAPON_B_BO:
      return IconBBo
    case WeaponTypes.WEAPON_B_DA:
      return IconBDa
    case WeaponTypes.WEAPON_B_TO:
      return IconBTo
    case WeaponTypes.WEAPON_B_BR:
      return IconBBr
    case WeaponTypes.WEAPON_B_BE:
      return IconBBe

    case WeaponTypes.WEAPON_G_AX:
      return IconGAx
    case WeaponTypes.WEAPON_G_BO:
      return IconGBo
    case WeaponTypes.WEAPON_G_DA:
      return IconGDa
    case WeaponTypes.WEAPON_G_TO:
      return IconGTo
    case WeaponTypes.WEAPON_G_BR:
      return IconGBr
    case WeaponTypes.WEAPON_G_BE:
      return IconGBe

    case WeaponTypes.WEAPON_C_ST:
      return IconCSt
    case WeaponTypes.WEAPON_C_BO:
      return IconCBo
    case WeaponTypes.WEAPON_C_DA:
      return IconCDa
    case WeaponTypes.WEAPON_C_TO:
      return IconCTo
    case WeaponTypes.WEAPON_C_BR:
      return IconCBr
    case WeaponTypes.WEAPON_C_BE:
      return IconCBe
  }

  return undefined
})
</script>
