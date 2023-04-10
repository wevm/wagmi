/**
 * Converts properties of {@link T} to never
 *
 * @param T - Object to convert
 * @returns Object with properties converted to `never`
 *
 * @example
 * type Result = Never<{ foo: string, bar: number }>
 * //   ^? { foo: never, bar: never }
 */
export type Never<T> = {
  [K in keyof T]: never
}
