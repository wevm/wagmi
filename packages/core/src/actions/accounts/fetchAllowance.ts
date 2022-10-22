import { Address, ResolvedConfig } from 'abitype'
import { logger } from 'ethers/lib/ethers'
import {
  Logger,
  formatUnits,
  isAddress,
  parseBytes32String,
} from 'ethers/lib/utils'

import { erc20ABI, erc20ABI_bytes32 } from '../../constants'
import { ContractResultDecodeError } from '../../errors'
import { Unit } from '../../types'
import { readContracts } from '../contracts'
import { getProvider } from '../providers'

export type FetchAllowanceArgs = {
  /** Owner Address or Owner ENS name */
  ownerAddressOrName: string
  /** Spender Address or Spender ENS name */
  spenderAddressOrName: string
  /** Chain id to use for provider */
  chainId?: number
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** ERC-20 address */
  token: Address
}

export type FetchAllowanceResult = {
  decimals: ResolvedConfig['IntType']
  formatted: string
  symbol: string
  value: ResolvedConfig['BigIntType']
}

export async function fetchAllowance({
  ownerAddressOrName,
  spenderAddressOrName,
  chainId,
  formatUnits: unit,
  token,
}: FetchAllowanceArgs): Promise<FetchAllowanceResult> {
  const provider = getProvider({ chainId })

  // Convert ENS name to address if required
  let resolvedOwnerAddress: Address
  if (isAddress(ownerAddressOrName)) resolvedOwnerAddress = ownerAddressOrName
  else {
    const address = (await provider.resolveName(
      ownerAddressOrName,
    )) as Address | null
    // Same error `provider.getAllowance` throws for invalid ENS name
    if (!address)
      logger.throwError(
        'ENS name not configured',
        Logger.errors.UNSUPPORTED_OPERATION,
        {
          operation: `resolveName(${JSON.stringify(ownerAddressOrName)})`,
        },
      )
    resolvedOwnerAddress = address
  }

  let resolvedSpenderAddress: Address
  if (isAddress(spenderAddressOrName))
    resolvedSpenderAddress = spenderAddressOrName
  else {
    const address = (await provider.resolveName(
      spenderAddressOrName,
    )) as Address | null
    // Same error `provider.getAllowance` throws for invalid ENS name
    if (!address)
      logger.throwError(
        'ENS name not configured',
        Logger.errors.UNSUPPORTED_OPERATION,
        {
          operation: `resolveName(${JSON.stringify(spenderAddressOrName)})`,
        },
      )
    resolvedSpenderAddress = address
  }

  type FetchContractAllowance = {
    abi: typeof erc20ABI | typeof erc20ABI_bytes32
  }
  const fetchContractAllowance = async ({ abi }: FetchContractAllowance) => {
    const erc20Config = { abi, address: token, chainId } as const
    const [value, decimals, symbol] = await readContracts({
      allowFailure: false,
      contracts: [
        {
          ...erc20Config,
          functionName: 'allowance',
          args: [resolvedOwnerAddress, resolvedSpenderAddress],
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
    return await fetchContractAllowance({ abi: erc20ABI })
  } catch (err) {
    // In the chance that there is an error upon decoding the contract result,
    // it could be likely that the contract data is represented as bytes32 instead
    // of a string.
    if (err instanceof ContractResultDecodeError) {
      const { symbol, ...rest } = await fetchContractAllowance({
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
