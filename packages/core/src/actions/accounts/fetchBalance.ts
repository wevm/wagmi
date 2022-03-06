import { Contract } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { wagmiClient } from '../../client'
import { defaultChains, defaultL2Chains, erc20ABI } from '../../constants'
import { Balance, Unit } from '../../types'

export type FetchBalanceArgs = {
  /** Address or ENS name */
  addressOrName: string
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** ERC-20 address */
  token?: string
}

export type FetchBalanceResult = Balance

export async function fetchBalance({
  addressOrName,
  formatUnits: unit = 'ether',
  token,
}: FetchBalanceArgs): Promise<FetchBalanceResult> {
  if (token) {
    const contract = new Contract(token, erc20ABI, wagmiClient.provider)
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

  const chains = [
    ...(wagmiClient.connector?.chains ?? []),
    ...defaultChains,
    ...defaultL2Chains,
  ]
  const value = await wagmiClient.provider.getBalance(addressOrName)
  const chain = chains.find(
    (x) => x.id === wagmiClient.provider.network.chainId,
  )
  return {
    decimals: chain?.nativeCurrency?.decimals ?? 18,
    formatted: formatUnits(value, unit),
    symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
    unit,
    value,
  }
}
