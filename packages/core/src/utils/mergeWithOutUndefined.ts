export function mergeWithOutUndefined<
  a extends Record<string, unknown>,
  b extends Record<string, unknown> | undefined,
>(a: a, b: b | Record<string, unknown> | undefined = {}): a & b {
  const obj: Record<string, unknown> = a
  for (const key in b) {
    if (b[key] !== undefined) obj[key] = b[key]
  }
  return obj as a & b
}
