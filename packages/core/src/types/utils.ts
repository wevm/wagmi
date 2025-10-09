/** Combines members of an intersection into a readable type. */
// https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
export type Compute<type> = { [key in keyof type]: type[key] } & unknown

/**
 * Makes all properties of an object optional.
 *
 * Compatible with [`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes).
 */
export type ExactPartial<type> = {
  [key in keyof type]?: type[key] | undefined
}

/**
 * Creates a fixed array of `count` elements of type `type`.
 *
 * @example
 * ```ts
 * type Result = FixedArray<string, 3>
 * //   ^? type Result = readonly [string, string, string]
 * ```
 */
export type FixedArray<
  type,
  count extends number,
  result extends readonly type[] = [],
> = result['length'] extends count
  ? result
  : FixedArray<type, count, readonly [...result, type]>

/** Checks if {@link type} can be narrowed further than {@link type2} */
export type IsNarrowable<type, type2> = IsUnknown<type> extends true
  ? false
  : undefined extends type
    ? false
    : IsNever<
          (type extends type2 ? true : false) &
            (type2 extends type ? false : true)
        > extends true
      ? false
      : true

/**
 * @internal
 * Checks if {@link type} is `never`
 */
export type IsNever<type> = [type] extends [never] ? true : false

/**
 * @internal
 * Checks if {@link type} is `unknown`
 */
export type IsUnknown<type> = unknown extends type ? true : false

/** Merges two object types into new type  */
export type Merge<obj1, obj2> = Compute<
  LooseOmit<obj1, keyof obj2 extends infer key extends string ? key : never> &
    obj2
>

/** Removes `readonly` from all properties of an object. */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key]
}

/** Strict version of built-in Omit type */
export type StrictOmit<type, keys extends keyof type> = Pick<
  type,
  Exclude<keyof type, keys>
>

/** Makes objects destructurable. */
export type OneOf<
  union extends object,
  ///
  keys extends KeyofUnion<union> = KeyofUnion<union>,
> = union extends infer Item
  ? Compute<Item & { [K in Exclude<keys, keyof Item>]?: undefined }>
  : never
type KeyofUnion<type> = type extends type ? keyof type : never

/** Makes {@link key} optional in {@link type} while preserving type inference. */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  StrictOmit<type, key>

/* Removes `undefined` from object property */
export type RemoveUndefined<type> = {
  [key in keyof type]: NonNullable<type[key]>
}

///////////////////////////////////////////////////////////////////////////
// Loose types

/** Loose version of {@link StrictOmit} */
export type LooseOmit<type, keys extends string> = Pick<
  type,
  Exclude<keyof type, keys>
>

///////////////////////////////////////////////////////////////////////////
// Union types

export type UnionCompute<type> = type extends object ? Compute<type> : type

export type UnionLooseOmit<type, keys extends string> = type extends any
  ? LooseOmit<type, keys>
  : never

export type UnionStrictOmit<type, keys extends keyof type> = type extends any
  ? StrictOmit<type, keys>
  : never

export type UnionExactPartial<type> = type extends object
  ? ExactPartial<type>
  : type
