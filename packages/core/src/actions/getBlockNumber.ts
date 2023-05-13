import { type QueryOptions } from '@tanstack/query-core'
import {
  type GetBlockNumberReturnType as GetBlockNumberReturnType_,
  RpcError,
  type WatchBlockNumberParameters as WatchBlockNumberParameters_,
} from 'viem'

import { type Config } from '../config.js'
import { type Prettify } from '../types.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetBlockNumberParameters = {
  chainId?: number | undefined
}

export type GetBlockNumberReturnType = GetBlockNumberReturnType_ | undefined

export function getBlockNumber(
  config: Config,
  { chainId }: GetBlockNumberParameters = {},
): Promise<GetBlockNumberReturnType> {
  const publicClient = config.getPublicClient({ chainId })
  return publicClient?.getBlockNumber()
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBlockNumberParameters = {
  chainId?: number | undefined
  onBlockNumber: WatchBlockNumberParameters_['onBlockNumber']
  onError?: WatchBlockNumberParameters_['onError']
}

export type WatchBlockNumberReturnType = () => void

export function watchBlockNumber(
  config: Config,
  { chainId, onBlockNumber, onError }: WatchBlockNumberParameters,
): WatchBlockNumberReturnType {
  const publicClient = config.getPublicClient({ chainId })
  return publicClient?.watchBlockNumber({
    emitOnBegin: true,
    onBlockNumber,
    poll: true,
    // TODO: viem `exactOptionalPropertyTypes`
    ...(onError ? { onError } : {}),
  })
}

///////////////////////////////////////////////////////////////////////////
// Query

type GetBlockNumberQueryFnData = NonNullable<GetBlockNumberReturnType> | null
type GetBlockNumberQueryError =
  | RpcError
  // base
  | Error
type GetBlockNumberQueryKey = {
  chainId?: number | undefined
}
type Options = QueryOptions<GetBlockNumberQueryFnData, GetBlockNumberQueryError>

export type GetBlockNumberQueryOptions = Prettify<
  Omit<Options, 'queryFn' | 'queryKey' | 'queryKeyHashFn'> &
    GetBlockNumberQueryKey
>

export const getBlockNumberQueryOptions = (
  config: Config,
  { chainId, gcTime = 0, ...rest }: GetBlockNumberQueryOptions,
) =>
  ({
    ...rest,
    gcTime,
    async queryFn() {
      const blockNumber = await getBlockNumber(config, { chainId })
      return blockNumber ?? null
    },
    queryKey: ['blockNumber', { chainId }],
  }) as const satisfies Options
