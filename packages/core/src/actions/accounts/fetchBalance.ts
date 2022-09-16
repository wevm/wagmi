import { Address, ResolvedConfig } from 'abitype'
import { logger } from 'ethers/lib/ethers'
import { Logger, formatUnits, isAddress } from 'ethers/lib/utils'

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
  token?: Address
}

export type FetchBalanceResult = {
  decimals: ResolvedConfig['IntType']
  formatted: string
  symbol: string
  value: ResolvedConfig['BigIntType']
}

export async function fetchBalance({
  addressOrName,
  chainId,
  formatUnits: unit,
  token,
}: FetchBalanceArgs): Promise<FetchBalanceResult> {
  const client = getClient()
  const provider = getProvider({ chainId })

  if (token) {
    // Convert ENS name to address if required
    let resolvedAddress: Address
    if (isAddress(addressOrName)) resolvedAddress = <Address>addressOrName
    else {
      const address = await provider.resolveName(addressOrName)
      // Same error `provider.getBalance` throws for invalid ENS name
      if (!address)
        logger.throwError(
          'ENS name not configured',
          Logger.errors.UNSUPPORTED_OPERATION,
          {
            operation: `resolveName(${JSON.stringify(addressOrName)})`,
          },
        )
      resolvedAddress = <Address>address
    }

    const erc20Config = {
      addressOrName: token,
      contractInterface: erc20ABI,
      chainId,
    } as const

    const [value, decimals, symbol] = await readContracts({
      allowFailure: false,
      contracts: [
        {
          ...erc20Config,
          functionName: 'balanceOf' as const,
          args: [resolvedAddress],
        },
        {
          ...erc20Config,
          functionName: 'decimals' as const,
        },
        {
          ...erc20Config,
          functionName: 'symbol' as const,
        },
      ],
    })
    return {
      decimals,
      formatted: formatUnits(value ?? '0', unit ?? decimals),
      symbol,
      value,
    }
  }

  const chains = [...(client.provider.chains || []), ...(client.chains ?? [])]
  const value = await provider.getBalance(addressOrName)
  const chain = chains.find((x) => x.id === provider.network.chainId)
  return {
    decimals: chain?.nativeCurrency?.decimals ?? 18,
    formatted: formatUnits(value ?? '0', unit ?? 'ether'),
    symbol: chain?.nativeCurrency?.symbol ?? 'ETH',
    value,
  }
}
