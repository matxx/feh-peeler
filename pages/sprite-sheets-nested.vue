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
                {{ frameCodeOf(sheet) }}
              </v-code>
              <div class="scrollable">
                <AppSpriteSheet
                  :sheet="sheet.sheet"
                  :frame="sheet.frame"
                />
              </div>
            </v-col>

            <v-col cols="12">
              <h4 class="mb-2">Individual icons</h4>
              <div
                class="grid"
                :style="{
                  gridTemplateColumns: `repeat(${sheet.grid[0]}, ${ICON_SIZE}px)`,
                }"
              >
                <template
                  v-for="cell in cellsOf(sheet)"
                  :key="`${cell.x}-${cell.y}`"
                >
                  <v-tooltip location="top">
                    <template #activator="{ props: tooltipProps }">
                      <AppSpriteSheet
                        v-bind="tooltipProps"
                        :sheet="sheet.sheet"
                        :frame="sheet.frame"
                        :grid="sheet.grid"
                        :cell="[cell.x, cell.y]"
                        :size="ICON_SIZE"
                        class="cell"
                        @click="copyCode(cell.code)"
                      />
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
import type { SpriteSheetName } from '~/utils/types/spriteSheets'

interface NestedSheet {
  sheet: SpriteSheetName
  frame: string
  // number of columns and rows
  grid: [number, number]
}

const ICON_SIZE = 40

const sheets: Record<string, NestedSheet> = {
  Statuses: {
    sheet: 'Status',
    frame: 'Icon_Enhance.png',
    grid: [36, 4],
  },
  Games: {
    sheet: 'Status',
    frame: 'Icon_MiniUnit_Head.png',
    grid: [17, 1],
  },
}

const tab = ref()

function cellsOf(sheet: NestedSheet) {
  const [columns, rows] = sheet.grid
  return Array.from({ length: columns * rows }, (_, i) => {
    const x = i % columns
    const y = Math.floor(i / columns)
    return { x, y, code: codeOf(sheet, x, y) }
  })
}

function frameCodeOf(sheet: NestedSheet) {
  return `<AppSpriteSheet sheet="${sheet.sheet}" frame="${sheet.frame}" />`
}

function codeOf(sheet: NestedSheet, x: number, y: number) {
  return `<AppSpriteSheet
  sheet="${sheet.sheet}"
  frame="${sheet.frame}"
  :grid="[${sheet.grid.join(', ')}]"
  :cell="[${x}, ${y}]"
  :size="${ICON_SIZE}"
/>`
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
