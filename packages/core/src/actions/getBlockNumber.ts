import { type QueryOptions } from '@tanstack/query-core'
import {
  type GetBlockNumberReturnType as GetBlockNumberReturnType_,
  RpcError,
  type WatchBlockNumberParameters as WatchBlockNumberParameters_,
} from 'viem'

import { type Config } from '../config.js'

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

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
export function watchBlockNumber(
  config: Config,
  {
    chainId,
    onBlockNumber,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
  }: WatchBlockNumberParameters,
): WatchBlockNumberReturnType {
  let unwatch: WatchBlockNumberReturnType | undefined

  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const publicClient = config.getPublicClient({ chainId })

    unwatch = publicClient?.watchBlockNumber({
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

export type GetBlockNumberQueryParameters = GetBlockNumberParameters
export type GetBlockNumberQueryKey = readonly [
  'blockNumber',
  { chainId: GetBlockNumberQueryParameters['chainId'] },
]
export type GetBlockNumberQueryFnData =
  NonNullable<GetBlockNumberReturnType> | null

export const getBlockNumberQueryOptions = (
  config: Config,
  { chainId }: GetBlockNumberQueryParameters = {},
) =>
  ({
    gcTime: 0,
    async queryFn() {
      const blockNumber = await getBlockNumber(config, { chainId })
      return blockNumber ?? null
    },
    queryKey: ['blockNumber', { chainId }],
  }) as const satisfies QueryOptions<
    GetBlockNumberQueryFnData,
    GetBlockNumberError,
    GetBlockNumberQueryFnData,
    GetBlockNumberQueryKey
  >
