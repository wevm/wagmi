import type { Address, ResolvedConfig } from 'viem'

export type DistributedKeys<type> = type extends infer member
  ? keyof member
  : never

/**
 * Combines members of an intersection into a readable type.
 */
// https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
export type Evaluate<type> = { [key in keyof type]: type[key] } & unknown

/**
 * Makes all properties of an object optional.
 *
 * Compatible with [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes).
 */
export type ExactPartial<type> = {
  [key in keyof type]?: type[key] | undefined
}

/**
 * Check if type is a union.
 */
export type IsUnion<type, type2 = type> = type extends type2
  ? [type2] extends [type]
    ? false
    : true
  : never

/**
 * Removes `readonly` from all properties of an object.
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
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  Omit<type, key>

/**
 * Widen narrowed type to broader type.
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
