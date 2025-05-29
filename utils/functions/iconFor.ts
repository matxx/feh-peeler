export function iconFor(state: boolean | null) {
  switch (state) {
    case true:
      return 'mdi-checkbox-outline'
    case false:
      return 'mdi-close-box-outline'
    case null:
      return 'mdi-checkbox-blank-outline'
  }
}
