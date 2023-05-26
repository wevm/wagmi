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

/**
 * Makes {@link TKeys} optional in {@link TType} while preserving type inference.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<TType, TKeys extends keyof TType> = Partial<
  Pick<TType, TKeys>
> &
  Omit<TType, TKeys>
