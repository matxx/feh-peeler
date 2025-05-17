<template>
  <div class="d-flex">
    <img
      v-for="icon in icons"
      :key="icon"
      :src="icon"
      :width="size"
      :height="size"
    />
  </div>
</template>

<script setup lang="ts">
import {
  EFF_INFANTRY,
  EFF_ARMORED,
  EFF_CAVALRY,
  EFF_FLYING,
  EFF_MELEE,
  EFF_C_BOW,
  EFF_MAGIC,
  EFF_BEAST,
  EFF_DRAGON,
  EFF_DRAGONSTONE,
  type Effectiveness,
} from '~/utils/types/skills'

import IconI from '~/assets/icons/move_types/i.png'
import IconA from '~/assets/icons/move_types/a.png'
import IconC from '~/assets/icons/move_types/c.png'
import IconF from '~/assets/icons/move_types/f.png'

import IconRSword from '~/assets/icons/weapon_types/red_sword.png'
import IconBLance from '~/assets/icons/weapon_types/blue_lance.png'
import IconGAxe from '~/assets/icons/weapon_types/green_axe.png'
import IconCBow from '~/assets/icons/weapon_types/colorless_bow.png'
import IconTomes from '~/assets/icons/weapon_types/all_tome.png'
import IconBeasts from '~/assets/icons/weapon_types/all_beast.png'
import IconDragons from '~/assets/icons/weapon_types/all_breath.png'

const props = defineProps<{
  effectiveness: Effectiveness
  size: number
}>()

const icons = computed(() => {
  switch (props.effectiveness) {
    case EFF_INFANTRY:
      return [IconI]
    case EFF_ARMORED:
      return [IconA]
    case EFF_CAVALRY:
      return [IconC]
    case EFF_FLYING:
      return [IconF]

    case EFF_MELEE:
      return [IconRSword, IconBLance, IconGAxe]
    case EFF_C_BOW:
      return [IconCBow]
    case EFF_MAGIC:
      return [IconTomes]
    case EFF_BEAST:
      return [IconBeasts]
    case EFF_DRAGON:
    case EFF_DRAGONSTONE:
      return [IconDragons]
  }

  return []
})
</script>
