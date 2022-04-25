import { BigNumber, Contract } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { getClient } from '../../client'
import { allChains, erc20ABI } from '../../constants'
import { Unit } from '../../types'
import { getProvider } from '../providers'

export type FetchBalanceArgs = {
  /** Address or ENS name */
  addressOrName: string
  /** Chain id to use for provider */
  chainId?: number
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** ERC-20 address */
  token?: string
}

export type FetchBalanceResult = {
  decimals: number
  formatted: string
  symbol: string
  unit: Unit | number
  value: BigNumber
}

export async function fetchBalance({
  addressOrName,
  chainId,
  formatUnits: unit = 'ether',
  token,
}: FetchBalanceArgs): Promise<FetchBalanceResult> {
  const client = getClient()
  const provider = getProvider({ chainId })

  if (token) {
    const contract = new Contract(token, erc20ABI, provider)
    const [value, decimals, symbol] = await Promise.all([
      contract.balanceOf(addressOrName),
      contract.decimals(),
      contract.symbol(),
    ])
    return {
      decimals,
      formatted: formatUnits(value, unit),
      symbol,
      unit,
      value,
    }
  }

  const chains = [...(client.connector?.chains ?? []), ...allChains]
  const value = await provider.getBalance(addressOrName)
  const chain = chains.find((x) => x.id === provider.network.chainId)
  return {
    decimals: chain?.nativeCurrency?.decimals ?? 18,
    formatted: formatUnits(value, unit),
    symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
    unit,
    value,
  }
}
