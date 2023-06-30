import type { Address, Hex } from 'viem'
import {
  ContractFunctionExecutionError,
  formatUnits,
  hexToString,
  trim,
} from 'viem'

import type { Config } from '../config.js'
import { erc20Abi, erc20Abi_bytes32 } from '../constants/abis.js'
import type { ChainId } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import type { Evaluate } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'
import { multicall } from 'viem/actions'

export type GetTokenParameters<config extends Config = Config> = Evaluate<
  {
    address: Address
    formatUnits?: Unit
  } & ChainId<config>
>

export type GetTokenReturnType = {
  address: Address
  decimals: number
  name: string
  symbol: string
  totalSupply: {
    formatted: string
    value: bigint
  }
}

export type GetTokenError = Error

export async function getToken<config extends Config>(
  config: config,
  parameters: GetTokenParameters<config>,
): Promise<GetTokenReturnType> {
  const { address, chainId } = parameters
  const client = config.getClient({ chainId })

  async function get(args: { abi: typeof erc20Abi | typeof erc20Abi_bytes32 }) {
    const { formatUnits: unit = 18 } = parameters
    const erc20Config = { address, ...args } as const
    const [decimals, name, symbol, totalSupply] = await multicall(client, {
      allowFailure: false,
      contracts: [
        { ...erc20Config, functionName: 'decimals' },
        { ...erc20Config, functionName: 'name' },
        { ...erc20Config, functionName: 'symbol' },
        { ...erc20Config, functionName: 'totalSupply' },
      ],
    })

    return {
      address,
      decimals,
      name: name,
      symbol: symbol,
      totalSupply: {
        formatted: formatUnits(totalSupply, getUnit(unit)),
        value: totalSupply,
      },
    }
  }

  try {
    return await get({ abi: erc20Abi })
  } catch (err) {
    // In the chance that there is an error upon decoding the contract result,
    // it could be likely that the contract data is represented as bytes32 instead
    // of a string.
    if (err instanceof ContractFunctionExecutionError) {
      const { name, symbol, ...rest } = await get({ abi: erc20Abi_bytes32 })
      return {
        name: hexToString(trim(name as Hex, { dir: 'right' })),
        symbol: hexToString(trim(symbol as Hex, { dir: 'right' })),
        ...rest,
      }
    }
    throw err
  }
}
