<template>
  <tr v-show="isDisplayed">
    <th v-show="mobile">
      <div class="my-1">
        <div class="text-no-wrap mb-1">
          {{ title }}
        </div>
        <div
          v-for="(line, index) in lines"
          :key="index"
        >
          {{ line }}
        </div>
      </div>
    </th>

    <th
      v-show="!mobile"
      class="text-no-wrap"
    >
      {{ title }}
    </th>
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
