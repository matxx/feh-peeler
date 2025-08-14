import min from 'lodash-es/min'
import max from 'lodash-es/max'
export { default as mean } from 'lodash-es/mean'

// https://decipher.dev/30-seconds-of-typescript/docs/median/
export const median = (arr: number[]): number => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

// https://stackoverflow.com/a/53003018/5032734
interface Item {
  value: number
  occurrence: number
}
export const mode = (numbers: number[]): number => {
  if (numbers.length === 0) {
    return 0
  }
  const m = numbers
    .reduce((items, current) => {
      const item =
        items.length === 0 ? null : items.find((x) => x.value === current)
      if (item) {
        item.occurrence++
      } else {
        items.push({ value: current, occurrence: 1 })
      }
      return items
    }, [] as Item[])
    .sort((a, b) => {
      if (a.occurrence < b.occurrence) {
        return 1
      } else if (a.occurrence > b.occurrence || a.value < b.value) {
        return -1
      } else {
        return a.value === b.value ? 0 : 1
      }
    })

  return m[0].value
}

// https://www.purplemath.com/modules/meanmode.htm
export const range = (arr: number[]): number =>
  (max(arr) || 0) - (min(arr) || 0)
