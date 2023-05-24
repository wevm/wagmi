/**
 * Makes all properties of an object optional.
 *
 * Compatible with [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes).
 *
 * @param T - Object to make optional.
 */
export type ExactPartial<T> = {
  [K in keyof T]?: T[K] | undefined
}

/**
 * Removes `readonly` from all properties of an object.
 *
 * @param T - Object to remove `readonly` properties from.
 */
export type Mutable<T extends object> = {
  -readonly [key in keyof T]: T[key]
}

/**
 * Makes objects destructurable.
 *
 * @param Union - Union to distribute.
 *
 * @example
 * type Result = OneOf<{ foo: boolean } | { bar: boolean }>
 * //   ^? type Result = { foo: boolean; bar?: undefined; } | { bar: boolean; foo?: undefined; }
 */
export type OneOf<
  Union extends object,
  AllKeys extends KeyofUnion<Union> = KeyofUnion<Union>,
> = Union extends infer Item
  ? Pretty<Item & { [K in Exclude<AllKeys, keyof Item>]?: never }>
  : never
type KeyofUnion<T> = T extends T ? keyof T : never

/**
 * Makes {@link TKeys} optional in {@link TType} while preserving type inference.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<TType, TKeys extends keyof TType> = ExactPartial<
  Pick<TType, TKeys>
> &
  Omit<TType, TKeys>

/**
 * Combines members of an intersection into a readable type.
 *
 * @link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
 * @example
 * type Result = Pretty<{ a: string } | { b: string } | { c: number, d: bigint }>
 * //   ^? type Result = { a: string; b: string; c: number; d: bigint }
 */
export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}
