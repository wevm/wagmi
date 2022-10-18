import { Address, ResolvedConfig } from 'abitype'
import { logger } from 'ethers/lib/ethers'
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
    if (isAddress(addressOrName)) resolvedAddress = addressOrName
    else {
      const address = (await provider.resolveName(
        addressOrName,
      )) as Address | null
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

    type FetchContractBalance = {
      abi: typeof erc20ABI | typeof erc20ABI_bytes32
    }
    const fetchContractBalance = async ({ abi }: FetchContractBalance) => {
      const erc20Config = { abi, address: token, chainId } as const
      const [value, decimals, symbol] = await readContracts({
        allowFailure: false,
        contracts: [
          {
            ...erc20Config,
            functionName: 'balanceOf',
            args: [resolvedAddress],
          },
          { ...erc20Config, functionName: 'decimals' },
          { ...erc20Config, functionName: 'symbol' },
        ],
      })
      return {
        decimals,
        formatted: formatUnits(value ?? '0', unit ?? decimals),
        symbol: symbol as string, // protect against `ResolvedConfig['BytesType']`
        value,
      }
    }

    try {
      return await fetchContractBalance({ abi: erc20ABI })
    } catch (err) {
      // In the chance that there is an error upon decoding the contract result,
      // it could be likely that the contract data is represented as bytes32 instead
      // of a string.
      if (err instanceof ContractResultDecodeError) {
        const { symbol, ...rest } = await fetchContractBalance({
          abi: erc20ABI_bytes32,
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
