const cache = new Set<string>()

export function warn(message: string, id?: string) {
  if (!cache.has(id ?? message)) {
    console.warn(message)
    cache.add(message)
  }
}
