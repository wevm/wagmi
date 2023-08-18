import type { Address, Hex } from 'viem'
import {
  ContractFunctionExecutionError,
  formatUnits,
  hexToString,
  trim,
} from 'viem'

import type { Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import type { Evaluate } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'
import { readContracts } from './readContracts.js'

export type GetTokenParameters<config extends Config = Config> = Evaluate<
  {
    address: Address
    formatUnits?: Unit
  } & ChainIdParameter<config>
>

export type GetTokenReturnType = {
  address: Address
  decimals: number
  name: string | undefined
  symbol: string | undefined
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

  const abi = [
    {
      type: 'function',
      name: 'decimals',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint8' }],
    },
    {
      type: 'function',
      name: 'name',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'string' }],
    },
    {
      type: 'function',
      name: 'totalSupply',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'uint256' }],
    },
  ] as const

  const erc20Abi = [
    ...abi,
    {
      type: 'function',
      name: 'symbol',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'string' }],
    },
  ] as const

  const erc20Abi_bytes32 = [
    ...abi,
    {
      type: 'function',
      name: 'symbol',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ type: 'bytes32' }],
    },
  ] as const

  async function get(args: { abi: typeof erc20Abi | typeof erc20Abi_bytes32 }) {
    const { formatUnits: unit = 18 } = parameters
    const erc20Config = { address, chainId, ...args } as const
    const [decimals, name, symbol, totalSupply] = await readContracts(config, {
      allowFailure: true,
      contracts: [
        { ...erc20Config, functionName: 'decimals' },
        { ...erc20Config, functionName: 'name' },
        { ...erc20Config, functionName: 'symbol' },
        { ...erc20Config, functionName: 'totalSupply' },
      ] as const,
    })
    if (decimals.error) throw decimals.error
    if (totalSupply.error) throw totalSupply.error

    return {
      address,
      decimals: decimals.result!,
      name: name.result,
      symbol: symbol.result,
      totalSupply: {
        formatted: formatUnits(totalSupply.result!, getUnit(unit)),
        value: totalSupply.result!,
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
