/* v8 ignore start */
// Unwraps import for Vite compatibility.
// See: https://github.com/vitejs/vite/issues/9703
export async function loadDefault<type>(
  importPromise: Promise<{ default: unknown }>,
): Promise<type> {
  const module = await importPromise

  const moduleDefault = module.default as { default: unknown }

  if (typeof module !== 'function' && (typeof moduleDefault === 'function' || typeof moduleDefault?.default === 'function'))
    return module.default as unknown as type
  return module as unknown as type
}
/* v8 ignore stop */
