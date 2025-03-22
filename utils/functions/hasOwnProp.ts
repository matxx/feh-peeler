// inspired by https://stackoverflow.com/a/63835741/5032734

export default function hasOwnProp<T extends object, K extends PropertyKey>(
  object: T,
  prop: K,
) {
  return Object.prototype.hasOwnProperty.call(object, prop)
}
