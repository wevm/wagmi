/**
 * Makes all properties of an object optional.
 *
 * Compatible with [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes).
 *
 * @param type - Object to make optional.
 */
export type ExactPartial<type> = {
  [key in keyof type]?: type[key] | undefined
}

/**
 * Checks if {@link type} is `undefined`
 *
 * @param type - Type to check
 *
 * @example
 * type Result = IsUndefined<undefined>
 * //   ^? type Result = true
 */
export type IsUndefined<type> = [undefined] extends [type] ? true : false

/**
 * Removes `readonly` from all properties of an object.
 *
 * @param type - Object to remove `readonly` properties from.
 */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key]
}

/**
 * Removes `void` from type.
 *
 * @param type - Type to remove `void` from.
 *
 * @example
 * type Result = NonVoid<string | void>
 * //   ^? type Result = string
 */
export type NonVoid<type> = type extends void ? never : type

/**
 * Makes objects destructurable.
 *
 * @param union - Union to distribute.
 *
 * @example
 * type Result = OneOf<{ foo: boolean } | { bar: boolean }>
 * //   ^? type Result = { foo: boolean; bar?: undefined; } | { bar: boolean; foo?: undefined; }
 */
export type OneOf<
  union extends object,
  ///
  keys extends KeyofUnion<union> = KeyofUnion<union>,
> = union extends infer Item
  ? Pretty<Item & { [K in Exclude<keys, keyof Item>]?: never }>
  : never
type KeyofUnion<type> = type extends type ? keyof type : never

/**
 * Makes {@link key} optional in {@link type} while preserving type inference.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  Omit<type, key>

/**
 * Combines members of an intersection into a readable type.
 *
 * @link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
 * @example
 * type Result = Pretty<{ a: string } | { b: string } | { c: number, d: bigint }>
 * //   ^? type Result = { a: string; b: string; c: number; d: bigint }
 */
export type Pretty<type> = { [key in keyof type]: type[key] } & unknown
