import type { Address, Hex } from 'viem'
import {
  ContractFunctionExecutionError,
  formatUnits,
  hexToString,
  trim,
} from 'viem'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import type { Evaluate } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'
import { type ReadContractsErrorType, readContracts } from './readContracts.js'

export type GetTokenParameters<config extends Config = Config> = Evaluate<
  ChainIdParameter<config> & {
    address: Address
    formatUnits?: Unit | undefined
  }
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

export type GetTokenErrorType = ReadContractsErrorType

/** @deprecated */
export async function getToken<config extends Config>(
  config: config,
  parameters: GetTokenParameters<config>,
): Promise<GetTokenReturnType> {
  const { address, chainId, formatUnits: unit = 18 } = parameters

  function getAbi<type extends 'bytes32' | 'string'>(type: type) {
    return [
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
        outputs: [{ type }],
      },
      {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type }],
      },
      {
        type: 'function',
        name: 'totalSupply',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint256' }],
      },
    ] as const
  }

  try {
    const abi = getAbi('string')
    const contractConfig = { address, abi, chainId } as const
    const [decimals, name, symbol, totalSupply] = await readContracts(config, {
      allowFailure: true,
      contracts: [
        { ...contractConfig, functionName: 'decimals' },
        { ...contractConfig, functionName: 'name' },
        { ...contractConfig, functionName: 'symbol' },
        { ...contractConfig, functionName: 'totalSupply' },
      ] as const,
    })

    // throw if `name` or `symbol` failed
    if (name.error instanceof ContractFunctionExecutionError) throw name.error
    if (symbol.error instanceof ContractFunctionExecutionError)
      throw symbol.error

    // `decimals` and `totalSupply` are required
    if (decimals.error) throw decimals.error
    if (totalSupply.error) throw totalSupply.error

    return {
      address,
      decimals: decimals.result,
      name: name.result,
      symbol: symbol.result,
      totalSupply: {
        formatted: formatUnits(totalSupply.result!, getUnit(unit)),
        value: totalSupply.result,
      },
    }
  } catch (error) {
    // In the chance that there is an error upon decoding the contract result,
    // it could be likely that the contract data is represented as bytes32 instead
    // of a string.
    if (error instanceof ContractFunctionExecutionError) {
      const abi = getAbi('bytes32')
      const contractConfig = { address, abi, chainId } as const
      const [decimals, name, symbol, totalSupply] = await readContracts(
        config,
        {
          allowFailure: false,
          contracts: [
            { ...contractConfig, functionName: 'decimals' },
            { ...contractConfig, functionName: 'name' },
            { ...contractConfig, functionName: 'symbol' },
            { ...contractConfig, functionName: 'totalSupply' },
          ] as const,
        },
      )
      return {
        address,
        decimals,
        name: hexToString(trim(name as Hex, { dir: 'right' })),
        symbol: hexToString(trim(symbol as Hex, { dir: 'right' })),
        totalSupply: {
          formatted: formatUnits(totalSupply, getUnit(unit)),
          value: totalSupply,
        },
      }
    }

    throw error
  }
}
