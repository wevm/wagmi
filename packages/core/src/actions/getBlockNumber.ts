import { type QueryOptions } from '@tanstack/query-core'
import {
  type GetBlockNumberReturnType as GetBlockNumberReturnType_,
  RpcError,
  type WatchBlockNumberParameters as WatchBlockNumberParameters_,
} from 'viem'

import { type Config } from '../config.js'

export type GetBlockNumberParameters<config extends Config = Config> = {
  chainId?: config['chains'][number]['id'] | undefined
}

export type GetBlockNumberReturnType = GetBlockNumberReturnType_ | undefined

export type GetBlockNumberError =
  | RpcError
  // base
  | Error

/** https://wagmi.sh/core/actions/getBlockNumber */
export function getBlockNumber<config extends Config>(
  config: config,
  { chainId }: GetBlockNumberParameters<config> = {},
): Promise<GetBlockNumberReturnType> {
  const publicClient = config.getPublicClient({ chainId })
  return publicClient?.getBlockNumber()
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBlockNumberParameters<config extends Config = Config> = {
  chainId?: config['chains'][number]['id'] | undefined
  onBlockNumber: WatchBlockNumberParameters_['onBlockNumber']
  onError?: WatchBlockNumberParameters_['onError']
  syncConnectedChain?: boolean
}

export type WatchBlockNumberReturnType = () => void

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/getBlockNumber#watcher */
export function watchBlockNumber<config extends Config>(
  config: config,
  {
    chainId,
    onBlockNumber,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
  }: WatchBlockNumberParameters<config>,
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
// TanStack Query

export type GetBlockNumberQueryParameters<config extends Config> =
  GetBlockNumberParameters<config>
export type GetBlockNumberQueryKey<config extends Config> = readonly [
  'blockNumber',
  { chainId: GetBlockNumberQueryParameters<config>['chainId'] },
]
export type GetBlockNumberQueryFnData =
  NonNullable<GetBlockNumberReturnType> | null

/** https://wagmi.sh/core/actions/getBlockNumber#tanstack-query */
export const getBlockNumberQueryOptions = <config extends Config>(
  config: Config,
  { chainId }: GetBlockNumberQueryParameters<config> = {},
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
    GetBlockNumberQueryKey<config>
  >
