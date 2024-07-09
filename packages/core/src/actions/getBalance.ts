import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  formatUnits,
  hexToString,
  trim,
} from 'viem'
import {
  type GetBalanceErrorType as viem_GetBalanceErrorType,
  type GetBalanceParameters as viem_GetBalanceParameters,
  getBalance as viem_getBalance,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getUnit } from '../utils/getUnit.js'
import { readContracts } from './readContracts.js'

export type GetBalanceParameters<config extends Config = Config> = Compute<
  ChainIdParameter<config> &
    viem_GetBalanceParameters & {
      /** @deprecated */
      token?: Address | undefined
      /** @deprecated */
      unit?: Unit | undefined
    }
>

export type GetBalanceReturnType = {
  decimals: number
  /** @deprecated */
  formatted: string
  symbol: string
  value: bigint
}

export type GetBalanceErrorType = viem_GetBalanceErrorType

/** https://wagmi.sh/core/api/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  parameters: GetBalanceParameters<config>,
): Promise<GetBalanceReturnType> {
  const {
    address,
    blockNumber,
    blockTag,
    chainId,
    token: tokenAddress,
    unit = 'ether',
  } = parameters

  if (tokenAddress) {
    try {
      return getTokenBalance(config, {
        balanceAddress: address,
        chainId,
        symbolType: 'string',
        tokenAddress,
      })
    } catch (error) {
      // In the chance that there is an error upon decoding the contract result,
      // it could be likely that the contract data is represented as bytes32 instead
      // of a string.
      if (error instanceof ContractFunctionExecutionError) {
        const balance = await getTokenBalance(config, {
          balanceAddress: address,
          chainId,
          symbolType: 'bytes32',
          tokenAddress,
        })
        const symbol = hexToString(
          trim(balance.symbol as Hex, { dir: 'right' }),
        )
        return { ...balance, symbol }
      }
      throw error
    }
  }

  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getBalance, 'getBalance')
  const value = await action(
    blockNumber ? { address, blockNumber } : { address, blockTag },
  )
  const chain = config.chains.find((x) => x.id === chainId) ?? client.chain!
  return {
    decimals: chain.nativeCurrency.decimals,
    formatted: formatUnits(value, getUnit(unit)),
    symbol: chain.nativeCurrency.symbol,
    value,
  }
}

type GetTokenBalanceParameters = {
  balanceAddress: Address
  chainId?: number | undefined
  symbolType: 'bytes32' | 'string'
  tokenAddress: Address
  unit?: Unit | undefined
}

async function getTokenBalance(
  config: Config,
  parameters: GetTokenBalanceParameters,
) {
  const { balanceAddress, chainId, symbolType, tokenAddress, unit } = parameters
  const contract = {
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
      {
        type: 'function',
        name: 'decimals',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: 'uint8' }],
      },
      {
        type: 'function',
        name: 'symbol',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ type: symbolType }],
      },
    ],
    address: tokenAddress,
  } as const
  const [value, decimals, symbol] = await readContracts(config, {
    allowFailure: false,
    contracts: [
      {
        ...contract,
        functionName: 'balanceOf',
        args: [balanceAddress],
        chainId,
      },
      { ...contract, functionName: 'decimals', chainId },
      { ...contract, functionName: 'symbol', chainId },
    ] as const,
  })
  const formatted = formatUnits(value ?? '0', getUnit(unit ?? decimals))
  return { decimals, formatted, symbol, value }
}
