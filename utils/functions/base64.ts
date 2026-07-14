// UTF-8 safe base64 encoding, see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
export function jsonToBase64(data: unknown): string {
  const json = JSON.stringify(data)
  const bytes = new TextEncoder().encode(json)
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join('')
  return btoa(binString)
}

export function base64ToJson<T>(base64: string): T {
  const binString = atob(base64)
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!)
  const json = new TextDecoder().decode(bytes)
  return JSON.parse(json) as T
}
