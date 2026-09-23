import toString from 'lodash-es/toString'

const mapToString = (arr: number[]) => arr.map((el) => toString(el))

export const getSortableVersion = (str: string): string =>
  str
    .split('.')
    .map((x) => x.padStart(2, '0'))
    .join('.')

export const getTrimmedVersion = (str: string): string =>
  str
    .split('.')
    .map((x) => parseInt(x, 10))
    .join('.')

export const getPrevVersion = (str: string): string | undefined => {
  if (str === '1.0') return
  if (str === '2.0') return '1.8'

  const parts = str.split('.').map((x) => parseInt(x, 10))

  if (parts[1] === 0) {
    return mapToString([parts[0] - 1, 11]).join('.')
  }

  return mapToString([parts[0], parts[1] - 1]).join('.')
}

export const getNextVersion = (str: string): string => {
  if (str === '1.8') return '2.0'

  const parts = str.split('.').map((x) => parseInt(x, 10))

  if (parts[1] === 11) {
    return mapToString([parts[0] + 1, 0]).join('.')
  }

  return mapToString([parts[0], parts[1] + 1]).join('.')
}

const VERSION_INPUT_REGEXP = /^\d{1,2}(\.\d{1,2})?$/

export const isValidVersionRangeInput = (str: string): boolean =>
  VERSION_INPUT_REGEXP.test(str.trim())

export const getSortableVersionRangeMin = (str: string): string => {
  const parts = str.trim().split('.')
  if (parts.length === 1) parts.push('0')

  return getSortableVersion(parts.join('.'))
}

export const getSortableVersionRangeMax = (str: string): string => {
  const parts = str.trim().split('.')
  if (parts.length === 1) parts.push('11')

  return getSortableVersion(parts.join('.'))
}
