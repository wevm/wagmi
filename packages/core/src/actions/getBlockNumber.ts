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

export type GetBlockNumberError =
  | RpcError
  // base
  | Error

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
  syncConnectedChain?: boolean
}

export type WatchBlockNumberReturnType = () => void

export function watchBlockNumber(
  config: Config,
  {
    chainId,
    onBlockNumber,
    onError,
    syncConnectedChain = config.syncConnectedChain,
  }: WatchBlockNumberParameters,
): WatchBlockNumberReturnType {
  let unwatch: WatchBlockNumberReturnType | undefined

  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const publicClient = config.getPublicClient({ chainId })

    unwatch = publicClient?.watchBlockNumber({
      emitOnBegin: true,
      onBlockNumber,
      poll: true,
      // TODO: viem `exactOptionalPropertyTypes`
      ...(onError ? { onError } : {}),
    })
    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener(chainId)

  // set up subscriber for connected chain changes
  const unsubscribe =
    syncConnectedChain && !chainId
      ? config.subscribe(
          ({ chainId }) => chainId,
          async (chainId) => {
            const blockNumber = await getBlockNumber(config, {
              chainId,
            })
            onBlockNumber(blockNumber!, undefined)

            return listener(chainId)
          },
        )
      : undefined

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}

///////////////////////////////////////////////////////////////////////////
// Query

type GetBlockNumberQueryFnData = NonNullable<GetBlockNumberReturnType> | null
type GetBlockNumberQueryKey = {
  chainId?: number | undefined
}
type Options = QueryOptions<GetBlockNumberQueryFnData, GetBlockNumberError>

export type GetBlockNumberQueryOptions = Prettify<
  Omit<Options, 'queryFn' | 'queryKey' | 'queryKeyHashFn'> &
    GetBlockNumberQueryKey
>

export const getBlockNumberQueryOptions = (
  config: Config,
  { chainId, gcTime = 0, ...rest }: GetBlockNumberQueryOptions = {},
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
