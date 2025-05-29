export function cycleState(state: boolean | null) {
  switch (state) {
    case true:
      return false
    case false:
      return null
    case null:
      return true
  }
}
