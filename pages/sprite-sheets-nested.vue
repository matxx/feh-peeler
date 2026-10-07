<!-- Sprite Sheet (Nested): frames of a sprite sheet which are themselves a grid of icons -->
<template>
  <div class="pa-3">
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab
        v-for="(sheet, name) in sheets"
        :key="name"
        :value="name"
      >
        {{ name }}
      </v-tab>
    </v-tabs>

    <v-divider class="mb-3" />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="(sheet, name) in sheets"
        :key="name"
        :value="name"
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h4 class="mb-2">Complete grid</h4>
              <v-code class="d-inline-block mb-2">
                {{ `<${sheet.componentName} frame="${sheet.frame}" />` }}
              </v-code>
              <div class="scrollable">
                <component
                  :is="sheet.component"
                  :frame="sheet.frame"
                />
              </div>
            </v-col>

            <v-col cols="12">
              <h4 class="mb-2">Individual icons</h4>
              <div
                class="grid"
                :style="{
                  gridTemplateColumns: `repeat(${sheet.sheetWidth}, ${ICON_SIZE}px)`,
                }"
              >
                <template
                  v-for="cell in cellsOf(sheet)"
                  :key="`${cell.x}-${cell.y}`"
                >
                  <v-tooltip location="top">
                    <template #activator="{ props: tooltipProps }">
                      <AppSpriteSheetGrid
                        v-bind="tooltipProps"
                        :sheet-width="sheet.sheetWidth"
                        :sheet-height="sheet.sheetHeight"
                        :x="cell.x"
                        :y="cell.y"
                        :size="ICON_SIZE"
                        class="cell"
                        @click="copyCode(cell.code)"
                      >
                        <component
                          :is="sheet.component"
                          :frame="sheet.frame"
                        />
                      </AppSpriteSheetGrid>
                    </template>
                    <pre>{{ cell.code }}</pre>
                  </v-tooltip>
                </template>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Status } from '~/components/App/SpriteSheets'

interface NestedSheet {
  component: Component
  componentName: string
  frame: string
  sheetWidth: number
  sheetHeight: number
}

const ICON_SIZE = 40

const sheets: Record<string, NestedSheet> = {
  Statuses: {
    component: Status,
    componentName: 'AppSpriteSheetsStatus',
    frame: 'Icon_Enhance.png',
    sheetWidth: 36,
    sheetHeight: 4,
  },
  Games: {
    component: Status,
    componentName: 'AppSpriteSheetsStatus',
    frame: 'Icon_MiniUnit_Head.png',
    sheetWidth: 17,
    sheetHeight: 1,
  },
}

const tab = ref()

function cellsOf(sheet: NestedSheet) {
  return Array.from(
    { length: sheet.sheetWidth * sheet.sheetHeight },
    (_, i) => {
      const x = i % sheet.sheetWidth
      const y = Math.floor(i / sheet.sheetWidth)
      return { x, y, code: codeOf(sheet, x, y) }
    },
  )
}

function codeOf(sheet: NestedSheet, x: number, y: number) {
  return `<AppSpriteSheetGrid
  :sheet-width="${sheet.sheetWidth}"
  :sheet-height="${sheet.sheetHeight}"
  :x="${x}"
  :y="${y}"
  :size="${ICON_SIZE}"
>
  <${sheet.componentName} frame="${sheet.frame}" />
</AppSpriteSheetGrid>`
}

const storeSnackbar = useStoreSnackbar()
async function copyCode(code: string) {
  await navigator.clipboard.writeText(code)
  storeSnackbar.addToast({ text: 'code copied to clipboard' })
}
</script>

<style lang="scss" scoped>
.scrollable {
  overflow-x: auto;
}

.grid {
  display: grid;
  gap: 4px;
  overflow-x: auto;
}

.cell {
  cursor: pointer;
}
</style>
