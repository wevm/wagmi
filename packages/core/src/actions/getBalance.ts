import {
  type GetBalanceErrorType as viem_GetBalanceErrorType,
  type GetBalanceParameters as viem_GetBalanceParameters,
  getBalance as viem_getBalance,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetBalanceParameters<config extends Config = Config> = Compute<
  ChainIdParameter<config> & viem_GetBalanceParameters
>

export type GetBalanceReturnType = {
  decimals: number
  symbol: string
  value: bigint
}

export type GetBalanceErrorType = viem_GetBalanceErrorType

/** https://wagmi.sh/core/api/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  parameters: GetBalanceParameters<config>,
): Promise<GetBalanceReturnType> {
  const { address, blockNumber, blockTag, chainId } = parameters

  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getBalance, 'getBalance')
  const value = await action(
    blockNumber ? { address, blockNumber } : { address, blockTag },
  )
  const chain = config.chains.find((x) => x.id === chainId) ?? client.chain!
  return {
    decimals: chain.nativeCurrency.decimals,
    symbol: chain.nativeCurrency.symbol,
    value,
  }
}
