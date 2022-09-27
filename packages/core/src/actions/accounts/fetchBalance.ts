import { BigNumber, logger } from 'ethers/lib/ethers'
import {
  Logger,
  formatUnits,
  isAddress,
  parseBytes32String,
} from 'ethers/lib/utils'

import { getClient } from '../../client'
import { erc20ABI, erc20ABI_bytes32 } from '../../constants'
import { ContractResultDecodeError } from '../../errors'
import { Unit } from '../../types'
import { GetContractArgs, readContracts } from '../contracts'
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
  value: BigNumber
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
    let resolvedAddress: string
    if (isAddress(addressOrName)) resolvedAddress = addressOrName
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
      resolvedAddress = address
    }

    const fetchContractBalance = async ({
      contractInterface,
    }: {
      contractInterface: GetContractArgs['contractInterface']
    }) => {
      const erc20Config = {
        addressOrName: token,
        contractInterface,
        chainId,
      }

      const [value, decimals, symbol] = await readContracts<
        [BigNumber, number, string]
      >({
        allowFailure: false,
        contracts: [
          {
            ...erc20Config,
            functionName: 'balanceOf',
            args: resolvedAddress,
          },
          {
            ...erc20Config,
            functionName: 'decimals',
          },
          {
            ...erc20Config,
            functionName: 'symbol',
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

    try {
      return await fetchContractBalance({ contractInterface: erc20ABI })
    } catch (err) {
      // In the chance that there is an error upon decoding the contract result,
      // it could be likely that the contract data is represented as bytes32 instead
      // of a string.
      if (err instanceof ContractResultDecodeError) {
        const { symbol, ...rest } = await fetchContractBalance({
          contractInterface: erc20ABI_bytes32,
        })
        return {
          symbol: parseBytes32String(symbol),
          ...rest,
        }
      }
      throw err
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
