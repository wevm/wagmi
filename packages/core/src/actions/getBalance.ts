import {
  type Address,
  BaseError,
  type GetBalanceParameters as GetBalanceParameters_,
  type GetBalanceReturnType as GetBalanceReturnType_,
  RpcError,
  formatUnits,
} from 'viem'

import { type Config } from '../config.js'
import { type Prettify, type Unit } from '../types.js'
import { getUnit } from '../utils/getUnit.js'
import type { GetBlockNumberError } from './getBlockNumber.js'
import type { QueryOptions } from '@tanstack/query-core'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetBalanceParameters = Prettify<
  GetBalanceParameters_ & {
    /** Chain ID to fetch balance from. */
    chainId?: number | undefined
    /** ERC-20 address */
    token?: Address | undefined
    /** Unit for formatting output */
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

export async function getBalance(
  config: Config,
  { address, chainId, token, unit = 'ether', ...rest }: GetBalanceParameters,
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

export type WatchBlockNumberParameters = Prettify<
  Omit<GetBalanceParameters, 'blockNumber' | 'blockTag'> & {
    onBalance: (args: GetBalanceReturnType) => void
    onError?: (error: GetBalanceError | GetBlockNumberError) => void
  }
>

export type WatchBlockNumberReturnType = () => void

export function watchBalance(
  config: Config,
  {
    address,
    chainId,
    onBalance,
    onError,
    token,
    unit,
  }: WatchBlockNumberParameters,
): WatchBlockNumberReturnType {
  const publicClient = config.getPublicClient({ chainId })
  return publicClient?.watchBlockNumber({
    emitOnBegin: false,
    onBlockNumber: async (blockNumber) => {
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
    },
    poll: true,
    // TODO: viem `exactOptionalPropertyTypes`
    ...(onError ? { onError } : {}),
  })
}

///////////////////////////////////////////////////////////////////////////
// Query

type GetBalanceQueryFnData = NonNullable<GetBalanceReturnType> | null
type Options = QueryOptions<GetBalanceQueryFnData, GetBalanceError>

export type GetBalanceQueryOptions = Prettify<
  Omit<Options, 'queryFn' | 'queryKey' | 'queryKeyHashFn'> &
    GetBalanceParameters
>

export const getBalanceQueryOptions = (
  config: Config,
  {
    address,
    blockNumber,
    blockTag,
    chainId,
    token,
    unit,
    ...rest
  }: GetBalanceQueryOptions,
) =>
  ({
    ...rest,
    async queryFn() {
      const balance = await getBalance(config, {
        address,
        blockNumber,
        blockTag,
        chainId,
        token,
        unit,
      } as GetBalanceParameters)
      return balance ?? null
    },
    queryKey: ['blockNumber', { address, chainId, token, unit }],
  }) as const satisfies Options
