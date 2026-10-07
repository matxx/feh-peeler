<!-- https://feheroes.fandom.com/wiki/Game_assets_collection#UI_Sprite_sheets -->
<template>
  <div class="pa-3">
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab
        v-for="(sheet, name) in SPRITE_SHEETS"
        :key="name"
        :value="name"
      >
        {{ name }}
      </v-tab>
    </v-tabs>

    <v-divider class="mb-3" />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="(sheet, name) in SPRITE_SHEETS"
        :key="name"
        :value="name"
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-img :src="sheet.img" />
            </v-col>

            <template
              v-for="frame in sheet.frames"
              :key="frame.name"
            >
              <v-col cols="6">
                <v-code>
                  {{ `<AppSpriteSheet
                    sheet="${name}"
                    frame="${frame.name}"
                  />` }}
                </v-code>
              </v-col>
              <v-col cols="6">
                <AppSpriteSheet
                  :sheet="name"
                  :frame="frame.name"
                  :height="100"
                  class="border"
                />
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { SPRITE_SHEETS } from '~/assets/sprite-sheets'

const tab = ref()
</script>
