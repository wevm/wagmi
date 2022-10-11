/**
 * Count occurrences of {@link TType} in {@link TArray}
 *
 * @param TArray - Array to count occurrences in
 * @param TType - Type to count occurrences of
 * @returns Number of occurrences of {@link TType} in {@link TArray}
 *
 * @example
 * type Result = CountOccurrences<['foo', 'bar', 'foo'], 'foo'>
 */
export type CountOccurrences<
  TArray extends readonly unknown[],
  TType,
> = FilterNever<
  [
    ...{
      [K in keyof TArray]: TArray[K] extends TType ? TArray[K] : never
    },
  ]
>['length']

/**
 * Removes all occurrences of `never` from {@link TArray}
 *
 * @param TArray - Array to filter
 * @returns Array with `never` removed
 *
 * @example
 * type Result = FilterNever<[1, 2, never, 3, never, 4]>
 */
export type FilterNever<TArray extends readonly unknown[]> =
  TArray['length'] extends 0
    ? []
    : TArray extends [infer THead, ...infer TRest]
    ? IsNever<THead> extends true
      ? FilterNever<TRest>
      : [THead, ...FilterNever<TRest>]
    : never

/**
 * Check if {@link T} is `never`
 *
 * @param T - Type to check
 * @returns `true` if {@link T} is `never`, otherwise `false`
 *
 * @example
 * type Result = IsNever<'foo'>
 */
export type IsNever<T> = [T] extends [never] ? true : false

/**
 * Checks if {@link T} is `unknown`
 *
 * @param T - Type to check
 * @returns `true` if {@link T} is `unknown`, otherwise `false`
 *
 * @example
 * type Result = IsUnknown<unknown>
 */
export type IsUnknown<T> = unknown extends T ? true : false

/**
 * Joins {@link Items} into string separated by {@link Separator}
 *
 * @param Items - Items to join
 * @param Separator - Separator to use
 * @returns Joined string
 *
 * @example
 * type Result = Join<['foo', 'bar'], '-'>
 */
export type Join<
  Items extends string[],
  Separator extends string | number,
> = Items extends [infer First, ...infer Rest]
  ? First extends string
    ? Rest extends string[]
      ? Rest extends []
        ? `${First}`
        : `${First}${Separator}${Join<Rest, Separator>}`
      : never
    : never
  : ''

/**
 * Check if {@link T} and {@link U} are equal
 *
 * @param T
 * @param U
 * @returns `true` if {@link T} and {@link U} are not equal, otherwise `false`
 *
 * @example
 * type Result = NotEqual<'foo', 'bar'>
 */
export type NotEqual<T, U> = [T] extends [U] ? false : true

/**
 * Convert {@link TKeys} of {@link TObject} to optional properties
 *
 * @param TObject
 * @param TKeys
 * @returns {@link TObject} with {@link TKeys} converted to optional properties
 *
 * @example
 * type Result = Optional<{ foo: string; bar: number }, 'foo'>
 */
export type Optional<TObject, TKeys extends keyof TObject> = {
  [K in keyof TObject as K extends TKeys ? never : K]: TObject[K]
} & {
  [K in keyof TObject as K extends TKeys ? K : never]?: TObject[K]
}

/**
 * Boolean "or" operator
 *
 * @param T
 * @param U
 * @returns `true` if either {@link T} or {@link U} are `true`, otherwise `false`
 *
 * @example
 * type Result = Or<true, false>
 */
export type Or<T, U> = T extends true ? true : U extends true ? true : false

/**
 * Converts {@link Union} to intersection
 *
 * @param Union - Union to convert
 * @returns Intersection of {@link Union}
 *
 * @example
 * type Result = UnionToIntersection<'foo' | 'bar'>
 */
export type UnionToIntersection<Union> = (
  Union extends unknown ? (arg: Union) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never
