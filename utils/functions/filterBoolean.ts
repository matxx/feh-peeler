export function filterBoolean(condition: boolean | null, bool?: boolean) {
  switch (condition) {
    case true:
      return !!bool
    case false:
      return !bool
    default:
      return true
  }
}
