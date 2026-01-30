<template>
  <tr v-show="isDisplayed">
    <td v-show="mobile">
      <div class="my-1">
        <h5 class="text-no-wrap mb-1">
          {{ title }}
        </h5>
        <p
          v-for="(line, index) in lines"
          :key="index"
        >
          {{ line }}
        </p>
      </div>
    </td>

    <td
      v-show="!mobile"
      class="text-no-wrap"
    >
      {{ title }}
    </td>
    <td v-show="!mobile">
      <div
        v-for="(line, index) in lines"
        :key="index"
      >
        {{ line }}
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import head from 'lodash-es/head'
import tail from 'lodash-es/tail'

const { mobile } = useDisplay()

const props = defineProps<{
  text: string
  regexp?: RegExp
}>()

const parts = computed(() => {
  const res = /^(?<title>【[^】]+】)<br>(?<rest>.*)$/.exec(props.text)
  if (!res) return []
  if (!res.groups) return []

  return [res.groups.title].concat(res.groups.rest.split('<br>'))
})
const title = computed(() => head(parts.value))
const lines = computed(() => tail(parts.value))

const isDisplayed = computed(() =>
  props.regexp ? (title.value ? title.value.match(props.regexp) : false) : true,
)
</script>
