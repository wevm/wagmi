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
