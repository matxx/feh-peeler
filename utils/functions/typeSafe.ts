// https://stackoverflow.com/a/75337277/5032734

type ValueOf<T> = T[keyof T]
type Entries<T> = [keyof T, ValueOf<T>][]

export function objectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>
}

// https://stackoverflow.com/a/76176570/5032734

export const objectFromEntries = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>,
>(
  entries: T,
): { [K in T[number] as K[0]]: K[1] } => {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] }
}

// https://dev.to/johnreillymurray/type-safe-groupby-in-typescript-5e0h

type MapValuesToKeysIfAllowed<T> = {
  [K in keyof T]: T[K] extends PropertyKey ? K : never
}
type Filter<T> = MapValuesToKeysIfAllowed<T>[keyof T]

export function groupBy<
  T extends Record<PropertyKey, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  Key extends Filter<T>,
>(arr: T[], key: Key): Record<T[Key], T[]> {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = val[key]
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = []
      }
      accumulator[groupedKey].push(val)
      return accumulator
    },
    {} as Record<T[Key], T[]>,
  )
}

export function groupByFunc<
  RetType extends PropertyKey,
  T, // no longer need any requirements on T since the grouper can do w/e it wants
  Func extends (arg: T) => RetType,
>(arr: T[], mapper: Func): Record<RetType, T[]> {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = mapper(val)
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = []
      }
      accumulator[groupedKey].push(val)
      return accumulator
    },
    {} as Record<RetType, T[]>,
  )
}
