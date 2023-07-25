export type DeepPartial<
  T,
  MaxDepth extends number,
  Depth extends readonly number[] = [],
> = Depth['length'] extends MaxDepth
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P], MaxDepth, [...Depth, 1]> }
  : T

export type DistributedKeys<type> = type extends infer member
  ? keyof member
  : never

/** Combines members of an intersection into a readable type. */
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

/** Checks if {@link type} can be narrowed further than {@link type2} */
export type IsNarrowable<type, type2> = IsUnknown<type> extends true
  ? false
  : IsNever<
      (type extends type2 ? true : false) & (type2 extends type ? false : true)
    > extends true
  ? false
  : true

/** Checks if {@link type} is `never` */
export type IsNever<type> = [type] extends [never] ? true : false

/** Checks if {@link type} is union */
export type IsUnion<
  type,
  ///
  type2 = type,
> = type extends type2 ? ([type2] extends [type] ? false : true) : never

/** Checks if {@link type} is `unknown` */
export type IsUnknown<type> = unknown extends type ? true : false

/** Merges two object types into new type  */
export type Merge<obj1, obj2> = Evaluate<
  LooseOmit<obj1, keyof obj2 extends infer key extends string ? key : never> &
    obj2
>

/** Removes `readonly` from all properties of an object. */
export type Mutable<type extends object> = {
  -readonly [key in keyof type]: type[key]
}

/** Strict version of built-in Omit type */
export type Omit<type, keys extends keyof type> = Pick<
  type,
  Exclude<keyof type, keys>
>

/** Makes objects destructurable. */
export type OneOf<
  union extends object,
  ///
  keys extends KeyofUnion<union> = KeyofUnion<union>,
> = union extends infer Item
  ? Evaluate<Item & { [K in Exclude<keys, keyof Item>]?: never }>
  : never
type KeyofUnion<type> = type extends type ? keyof type : never

/** Makes {@link key} optional in {@link type} while preserving type inference. */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<type, key extends keyof type> = ExactPartial<
  Pick<type, key>
> &
  Omit<type, key>

/** Loose version of {@link Omit} */
export type LooseOmit<type, keys extends string> = Pick<
  type,
  Exclude<keyof type, keys>
>

/** Loose version of {@link Pick} */
export type LoosePick<type, key extends string> = {
  [p in key]: p extends keyof type ? type[p] : never
}

/** Loose version of {@link PartialBy} */
export type LoosePartialBy<type, key extends string> = ExactPartial<
  LoosePick<type, key>
> &
  LooseOmit<type, key>

export type UnionPartialBy<T, K extends keyof any> = T extends any
  ? LoosePartialBy<T, K extends string ? K : never>
  : never
