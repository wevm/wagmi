export async function loadDefault<T>(
  importPromise: Promise<{ default: unknown }>,
): Promise<T> {
  const module = await importPromise
  if (typeof module !== 'function' && typeof module.default === 'function') {
    return module.default as unknown as T
  }
  return module as unknown as T
}
