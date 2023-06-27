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
 * Removes `readonly` from all properties of an object.
 *
 * @param type - Object to remove `readonly` properties from.
 */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key]
}

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
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  Omit<type, key>

export type ReadonlyWiden<TType> =
  | (TType extends Function ? TType : never)
  | (TType extends ResolvedConfig['BigIntType'] ? bigint : never)
  | (TType extends boolean ? boolean : never)
  | (TType extends ResolvedConfig['IntType'] ? number : never)
  | (TType extends string
      ? TType extends Address
        ? Address
        : TType extends ResolvedConfig['BytesType']['inputs']
        ? ResolvedConfig['BytesType']
        : string
      : never)
  | (TType extends readonly [] ? readonly [] : never)
  | (TType extends Record<string, unknown>
      ? { [K in keyof TType]: ReadonlyWiden<TType[K]> }
      : never)
  | (TType extends { length: number }
      ? {
          [K in keyof TType]: ReadonlyWiden<TType[K]>
        } extends infer Val extends unknown[]
        ? readonly [...Val]
        : never
      : never)
