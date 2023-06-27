import type { Address, ResolvedConfig } from 'viem'

/**
 * Combines members of an intersection into a readable type.
 *
 * @link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
 * @example
 * type Result = Evaluate<{ a: string } | { b: string } | { c: number, d: bigint }>
 * //   ^? type Result = { a: string; b: string; c: number; d: bigint }
 */
export type Evaluate<type> = { [key in keyof type]: type[key] } & unknown

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
 * Check if type is a union.
 *
 * @param type - Type to check.
 *
 * @example
 * type Result = IsUnion<{ a: string } | { b: string }>
 * //   ^? type Result = true
 */
export type IsUnion<type, type2 = type> = type extends type2
  ? [type2] extends [type]
    ? false
    : true
  : never

/**
 * Removes `readonly` from all properties of an object.
 *
 * @param type - Object to remove `readonly` properties from.
 */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key]
}

export type Omit<type, keys extends keyof type> = Pick<
  type,
  Exclude<keyof type, keys>
>
export type OmitKeys<T, keys extends string> = Pick<T, Exclude<keyof T, keys>>

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
  ? Evaluate<Item & { [K in Exclude<keys, keyof Item>]?: never }>
  : never
type KeyofUnion<type> = type extends type ? keyof type : never

/**
 * Makes {@link key} optional in {@link type} while preserving type inference.
 *
 * @param type - Object to make {@link key} optional in.
 * @param key - Keys to make optional.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  Omit<type, key>
export type PartialByKeys<type, key extends string> = ExactPartial<
  Pick<type, key extends keyof type ? key : never>
> &
  OmitKeys<type, key>

/**
 * Widen narrowed type to broader type.
 *
 * @param type - Type to widen.
 *
 * @example
 * type Result = Widen<'foo'>
 * //   ^? type Result = string
 */
export type ReadonlyWiden<type> =
  | (type extends Function ? type : never)
  | (type extends ResolvedConfig['BigIntType'] ? bigint : never)
  | (type extends boolean ? boolean : never)
  | (type extends ResolvedConfig['IntType'] ? number : never)
  | (type extends string
      ? type extends Address
        ? Address
        : type extends ResolvedConfig['BytesType']['inputs']
        ? ResolvedConfig['BytesType']
        : string
      : never)
  | (type extends readonly [] ? readonly [] : never)
  | (type extends Record<string, unknown>
      ? { [K in keyof type]: ReadonlyWiden<type[K]> }
      : never)
  | (type extends { length: number }
      ? {
          [K in keyof type]: ReadonlyWiden<type[K]>
        } extends infer Val extends unknown[]
        ? readonly [...Val]
        : never
      : never)
