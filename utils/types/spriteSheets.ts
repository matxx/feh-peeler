export interface SpriteFrame {
  name: string
  x: number
  y: number
  width: number
  height: number
  rotated: boolean
  // size of the frame before its transparent margins were trimmed
  sourceWidth: number
  sourceHeight: number
  // position of the trimmed frame inside the untrimmed one
  trimLeft: number
  trimTop: number
}
