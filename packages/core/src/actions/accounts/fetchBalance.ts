import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits, isAddress } from 'ethers/lib/utils'

import { getClient } from '../../client'
import { erc20ABI } from '../../constants'
import { Unit } from '../../types'
import { readContracts } from '../contracts'
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
  formatted: string | null
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
    const erc20Config = {
      addressOrName: token,
      contractInterface: erc20ABI,
      chainId,
    }

    // Convert ENS name to address if required
    const resolvedAddress = isAddress(addressOrName)
      ? addressOrName
      : await provider.resolveName(addressOrName)

    const [value, decimals, symbol] = await readContracts<
      [BigNumber, number, string]
    >({
      contracts: [
        { ...erc20Config, functionName: 'balanceOf', args: resolvedAddress },
        { ...erc20Config, functionName: 'decimals' },
        {
          ...erc20Config,
          functionName: 'symbol',
        },
      ],
    })
    return {
      decimals,
      formatted: value ? formatUnits(value, unit) : null,
      symbol,
      unit,
      value,
    }
  }

  const chains = [...client.provider.chains, ...(client.chains ?? [])]
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
