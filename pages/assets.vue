<template>
  <v-container>
    <v-row>
      <v-col>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bHQqvYy5KYo?si=sBtdM1IFDNvrkY4v"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ePzkF7pkw0c?si=_xWvz-oDfhcOIe2A"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model.number="rotation"
          label="rotation"
          type="number"
          step="1"
        />
        <v-text-field
          v-model.number="width"
          label="width"
          type="number"
          step="1"
          min="0"
        />
        <v-text-field
          v-model.number="height"
          label="height"
          type="number"
          step="1"
          min="0"
        />
        <v-text-field
          v-model.number="offsetLeft"
          label="offsetLeft"
          type="number"
          step="1"
          min="0"
        />
        <v-text-field
          v-model.number="offsetTop"
          label="offsetTop"
          type="number"
          step="1"
          min="0"
        />
      </v-col>

      <v-col>
        <AppSprite
          :spritesheet="imageUrl"
          spritesheet-width="2008px"
          spritesheet-height="976px"
          :rotation="rotation"
          :width="width"
          :height="height"
          :offset-left="offsetLeft"
          :offset-top="offsetTop"
          class="border"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model.number="width"
          type="number"
          step="1"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox
          v-model="ephemera"
          label="ephemera ?"
        />
      </v-col>
      <v-col>
        <AppIconDivineCodesPaper
          class="border"
          :width="width"
          :ephemera="ephemera"
        />
      </v-col>
      <v-col>
        <AppIconDivineCodesNumber
          v-for="i in 10"
          :key="i"
          :number="i - 1"
          class="border"
          :width="width"
          :ephemera="ephemera"
        />
        <br />
        <AppIconDivineCodesNumber
          v-for="i in 10"
          :key="i"
          :number="i - 1"
          class="border"
          :width="width"
          :ephemera="ephemera"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const width = ref(400)
const height = ref(400)
const offsetLeft = ref(0)
const offsetTop = ref(0)
const rotation = ref(0)

const ephemera = ref(false)

const imageUrl = new URL(
  '../assets/icons/ui_sprite_sheets/Item_2.png',
  import.meta.url,
).href
</script>
