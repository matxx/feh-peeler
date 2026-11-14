type Order = 'asc' | 'desc'

const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === ''

// iteratees for lodash orderBy that sort empty values last in both orders

export function emptyStringLast<T>(
  order: Order,
  getter: (item: T) => string | null | undefined,
) {
  return (item: T): string => {
    const value = getter(item)
    if (!isEmpty(value)) return value!

    return order === 'desc' ? '' : '￿'
  }
}

export function emptyNumberLast<T>(
  order: Order,
  getter: (item: T) => number | null | undefined,
) {
  return (item: T): number => {
    const value = getter(item)
    if (!isEmpty(value)) return value!

    return order === 'desc' ? -Infinity : Infinity
  }
}
