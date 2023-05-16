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
import type { QueryOptions } from '@tanstack/query-core'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetBalanceParameters = GetBalanceParameters_ & {
  /** Chain ID to fetch balance from. */
  chainId?: number | undefined
  /** ERC-20 address */
  token?: Address | undefined
  /** Unit for formatting output */
  unit?: Unit | undefined
}

export type GetBalanceReturnType = {
  decimals: number
  formatted: string
  symbol: string
  value: GetBalanceReturnType_
}

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
// Query

type GetBalanceQueryFnData = NonNullable<GetBalanceReturnType> | null
type GetBalanceQueryError =
  | RpcError
  | BaseError
  // base
  | Error
type Options = QueryOptions<GetBalanceQueryFnData, GetBalanceQueryError>

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
