import type {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import type {
  Address,
  ResolvedConfig,
  TypedData,
  TypedDataDomain,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import type { BigNumber } from 'ethers'

declare module 'abitype' {
  export interface Config {
    // TODO: Drop `BigNumber` once ethers supports `bigint` natively
    BigIntType: BigNumber
    IntType: number
  }
}

declare module 'ethers/lib/utils.js' {
  export function getAddress(address: string): Address
  export function verifyTypedData<
    TTypedData extends TypedData,
    TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
  >(
    domain: TypedDataDomain,
    types: TTypedData,
    value: TSchema[keyof TSchema] extends infer TValue
      ? { [x: string]: any } extends TValue
        ? Record<string, any>
        : TValue
      : never,
    signature:
      | {
          r: string
          s?: string
          _vs?: string
          recoveryParam?: number
          v?: number
        }
      | ResolvedConfig['BytesType']
      | string,
  ): string
}

/**
 * Makes {@link TKeys} optional in {@link TType} while preserving type inference.
 */
// s/o trpc (https://github.com/trpc/trpc/blob/main/packages/server/src/types.ts#L6)
export type PartialBy<TType, TKeys extends keyof TType> = Partial<
  Pick<TType, TKeys>
> &
  Omit<TType, TKeys>

export type DeepPartial<
  T,
  MaxDepth extends number,
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MaxDepth
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P], MaxDepth, [...Depth, 1]> }
  : T

export type QueryFunctionArgs<T extends (...args: any) => any> =
  QueryFunctionContext<ReturnType<T>>

export type QueryConfig<TData, TError, TSelectData = TData> = Pick<
  UseQueryOptions<TData, TError, TSelectData>,
  | 'cacheTime'
  | 'enabled'
  | 'isDataEqual'
  | 'keepPreviousData'
  | 'select'
  | 'staleTime'
  | 'structuralSharing'
  | 'suspense'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
> & {
  /** Scope the cache to a given context. */
  scopeKey?: string
}

export type InfiniteQueryConfig<TData, TError, TSelectData = TData> = Pick<
  UseInfiniteQueryOptions<TData, TError, TSelectData>,
  | 'cacheTime'
  | 'enabled'
  | 'getNextPageParam'
  | 'isDataEqual'
  | 'keepPreviousData'
  | 'select'
  | 'staleTime'
  | 'structuralSharing'
  | 'suspense'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
> & {
  /** Scope the cache to a given context. */
  scopeKey?: string
}

export type MutationConfig<Data, Error, Variables = void> = {
  /** Function fires if mutation encounters error */
  onError?: UseMutationOptions<Data, Error, Variables>['onError']
  /**
   * Function fires before mutation function and is passed same variables mutation function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onMutate?: UseMutationOptions<Data, Error, Variables>['onMutate']
  /** Function fires when mutation is either successfully fetched or encounters error */
  onSettled?: UseMutationOptions<Data, Error, Variables>['onSettled']
  /** Function fires when mutation is successful and will be passed the mutation's result */
  onSuccess?: UseMutationOptions<Data, Error, Variables>['onSuccess']
}
