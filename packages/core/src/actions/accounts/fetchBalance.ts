import { BigNumber, Contract } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { client } from '../../client'
import { allChains, erc20ABI } from '../../constants'
import { Unit } from '../../types'

export type FetchBalanceArgs = {
  /** Address or ENS name */
  addressOrName: string
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
  formatUnits: unit = 'ether',
  token,
}: FetchBalanceArgs): Promise<FetchBalanceResult> {
  if (token) {
    const contract = new Contract(token, erc20ABI, client.provider)
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
  const value = await client.provider.getBalance(addressOrName)
  const chain = chains.find((x) => x.id === client.provider.network.chainId)
  return {
    decimals: chain?.nativeCurrency?.decimals ?? 18,
    formatted: formatUnits(value, unit),
    symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
    unit,
    value,
  }
}
