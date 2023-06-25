import type { QueryOptions } from '@tanstack/query-core'
import {
  type Address,
  BaseError,
  type GetBalanceParameters as GetBalanceParameters_,
  type GetBalanceReturnType as GetBalanceReturnType_,
  RpcError,
  formatUnits,
} from 'viem'

import type { Config } from '../config.js'
import { type Unit } from '../types/unit.js'
import { type Evaluate, type PartialBy } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'
import type {
  GetBlockNumberError,
  WatchBlockNumberReturnType,
} from './getBlockNumber.js'

export type GetBalanceParameters<config extends Config = Config> = Evaluate<
  GetBalanceParameters_ & {
    chainId?: config['chains'][number]['id'] | undefined
    token?: Address | undefined
    unit?: Unit | undefined
  }
>

export type GetBalanceReturnType = {
  decimals: number
  formatted: string
  symbol: string
  value: GetBalanceReturnType_
}

export type GetBalanceError =
  | RpcError
  | BaseError
  // base
  | Error

/** https://wagmi.sh/core/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  {
    address,
    chainId,
    token,
    unit = 'ether',
    ...rest
  }: GetBalanceParameters<config>,
): Promise<GetBalanceReturnType> {
  const publicClient = config.getPublicClient({ chainId })

  if (token) {
    // TODO
  }

  const value = await publicClient?.getBalance({
    address,
    ...rest,
  })
  const chain =
    config.chains.find((x) => x.id === chainId) ?? publicClient.chain!
  return {
    decimals: chain.nativeCurrency.decimals,
    formatted: formatUnits(value, getUnit(unit)),
    symbol: chain.nativeCurrency.symbol,
    value,
  }
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBalanceParameters<config extends Config = Config> = Evaluate<
  Omit<GetBalanceParameters<config>, 'blockNumber' | 'blockTag'> & {
    onBalance: (parameters: GetBalanceReturnType) => void
    onError?: (error: GetBalanceError | GetBlockNumberError) => void
    syncConnectedChain?: boolean
  }
>

export type WatchBalanceReturnType = () => void

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/getBalance#watcher */
export function watchBalance<config extends Config>(
  config: config,
  {
    address,
    chainId,
    onBalance,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
    token,
    unit,
  }: WatchBalanceParameters<config>,
): WatchBalanceReturnType {
  let unwatch: WatchBlockNumberReturnType | undefined

  const handler = async (blockNumber?: bigint | undefined) => {
    try {
      const balance = await getBalance(config, {
        address,
        blockNumber,
        chainId,
        token,
        unit,
      } as GetBalanceParameters)
      onBalance(balance)
    } catch (err: unknown) {
      onError?.(err as GetBlockNumberError)
    }
  }

  const listener = ({
    chainId,
  }: {
    chainId?: GetBalanceParameters['chainId']
  }) => {
    if (unwatch) unwatch()

    const publicClient = config.getPublicClient({ chainId })

    unwatch = publicClient?.watchBlockNumber({
      onBlockNumber: handler,
      poll: true,
      // TODO: viem `exactOptionalPropertyTypes`
      ...(onError ? { onError } : {}),
    })

    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener({ chainId })

  // set up subscriber for connected chain changes
  const unsubscribe =
    syncConnectedChain && !chainId
      ? config.subscribe(
          ({ chainId }) => chainId,
          (chainId) => {
            handler()
            return listener({ chainId })
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

export type GetBalanceQueryParameters<config extends Config> = PartialBy<
  GetBalanceParameters<config>,
  'address'
>
export type GetBalanceQueryKey<config extends Config> = readonly [
  'balance',
  GetBalanceQueryParameters<config>,
]
export type GetBalanceQueryFnData = NonNullable<GetBalanceReturnType> | null

/** https://wagmi.sh/core/actions/getBalance#tanstack-query */
export const getBalanceQueryOptions = <config extends Config>(
  config: config,
  {
    address,
    blockNumber,
    blockTag,
    chainId,
    token,
    unit,
  }: GetBalanceQueryParameters<config>,
) =>
  ({
    async queryFn() {
      const balance = await getBalance(config, {
        address,
        blockNumber,
        blockTag,
        chainId,
        token,
        unit,
      } as GetBalanceParameters<config>)
      return balance ?? null
    },
    queryKey: ['balance', { address, chainId, token, unit }],
  }) as const satisfies QueryOptions<
    GetBalanceQueryFnData,
    GetBalanceError,
    GetBalanceQueryFnData,
    GetBalanceQueryKey<config>
  >
