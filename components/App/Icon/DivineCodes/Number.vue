<template>
  <div class="dc-img-container">
    <div class="dc-img-scaller">
      <AppSprite
        :spritesheet="imageUrl"
        spritesheet-width="2008px"
        spritesheet-height="976px"
        :rotation="0"
        :width="DIGIT_WIDTH"
        :height="DIGIT_HEIGHT"
        :offset-left="OFFSET_LEFT + DIGIT_WIDTH * number"
        :offset-top="ephemera ? OFFSET_TOP_EPHEMERA + 1 : OFFSET_TOP"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const imageUrl = new URL(
  '../../../../assets/sprite-sheets/Item_2.png',
  import.meta.url,
).href

const OFFSET_LEFT = 0
const OFFSET_TOP = 1
const DIGIT_WIDTH = 132
const DIGIT_HEIGHT = 162
const OFFSET_TOP_EPHEMERA = 164

// const { t } = useI18n()
const props = defineProps({
  number: {
    type: Number,
    required: true,
    validator(value: number) {
      return value >= 0 && value <= 9
    },
  },
  width: {
    type: [Number, String],
    required: true,
  },
  ephemera: {
    type: Boolean,
    default: false,
  },
})

const widthAsNumber = computed(() => {
  if (typeof props.width === 'number') {
    return props.width
  }
  if (typeof props.width === 'string') {
    const m = props.width.match(/^(\d+)px/i)
    if (m) {
      return Number(m[1])
    }
  }

  throw new Error(`Invalid width: ${props.width}`)
})
const heightAsNumber = computed(
  () => (widthAsNumber.value * DIGIT_HEIGHT) / DIGIT_WIDTH,
)

const widthForCss = computed(() => `${widthAsNumber.value}px`)
const heightForCss = computed(() => `${heightAsNumber.value}px`)

const scaleForCss = computed(
  () => `scale(${widthAsNumber.value / DIGIT_WIDTH})`,
)
</script>

<style scoped lang="scss">
.dc-img-container {
  position: relative;
  width: v-bind('widthForCss');
  height: v-bind('heightForCss');
  overflow: hidden;
  display: inline-block;

  .dc-img-scaller {
    position: relative;
    transform-origin: top left;
    transform: v-bind('scaleForCss');
  }
}
</style>
