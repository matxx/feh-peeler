<template>
  <img
    :src="img"
    :width="size"
    :height="size"
    :alt="t(`global.assets.icons.alt.grades.${grade}`)"
  />
</template>

<script setup lang="ts">
import ImgSS from '~/assets/icons/grade/ss.png'
import ImgS from '~/assets/icons/grade/s.png'
import ImgA from '~/assets/icons/grade/a.png'
import ImgB from '~/assets/icons/grade/b.png'
import ImgC from '~/assets/icons/grade/c.png'

import * as grades from '~/utils/types/grades'
import type { Grade } from '~/utils/types/grades'

const { t } = useI18n()
const props = defineProps<{
  grade: Grade
  size: string | number
}>()

const img = computed(() => {
  switch (props.grade) {
    case grades.GRADE_SS:
      return ImgSS
    case grades.GRADE_S:
      return ImgS
    case grades.GRADE_A:
      return ImgA
    case grades.GRADE_B:
      return ImgB
    case grades.GRADE_C:
      return ImgC
  }

  return undefined
})
</script>
