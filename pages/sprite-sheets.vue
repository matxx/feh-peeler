<template>
  <!-- https://feheroes.fandom.com/wiki/Game_assets_collection#UI_Sprite_sheets -->
  <div class="pa-3">
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab
        v-for="(data, name) in sheets"
        :key="name"
        :value="name"
      >
        {{ name }}
      </v-tab>
    </v-tabs>

    <v-divider class="mb-3" />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="(data, name) in sheets"
        :key="name"
        :value="name"
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <AppSpriteSheetImg :name="name" />
            </v-col>

            <template
              v-for="frame in data"
              :key="frame.name"
            >
              <v-col cols="6">
                <v-code>
                  {{ `<AppSpriteSheets${name} frame="${frame.name}" />` }}
                </v-code>
              </v-col>
              <v-col cols="6">
                <component
                  :is="components[name]"
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
import * as sheets from '~/assets/sprite-sheets'
import * as components from '~/components/App/SpriteSheets'

const tab = ref()
</script>
