import type { Address, ResolvedConfig } from 'abitype'
import type { Hex } from 'viem'
import {
  ContractFunctionExecutionError,
  formatUnits,
  hexToString,
  trim,
} from 'viem'

import { erc20ABI, erc20ABI_bytes32 } from '../../constants'
import { readContracts } from '../contracts'

export type FetchTokenArgs = {
  /** Address of ERC-20 token */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Units for formatting output */
  unit?: number
}
export type FetchTokenResult = {
  address: Address
  decimals: ResolvedConfig['IntType']
  name: string
  symbol: string
  totalSupply: {
    formatted: string
    value: ResolvedConfig['BigIntType']
  }
}

export async function fetchToken({
  address,
  chainId,
  unit = 18,
}: FetchTokenArgs): Promise<FetchTokenResult> {
  type FetchToken_ = {
    abi: typeof erc20ABI | typeof erc20ABI_bytes32
  }
  async function fetchToken_({ abi }: FetchToken_) {
    const erc20Config = { address, abi, chainId } as const
    const [decimals, name, symbol, totalSupply] = await readContracts({
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
      name: name as string, // protect against `ResolvedConfig['BytesType']`
      symbol: symbol as string, // protect against `ResolvedConfig['BytesType']`
      totalSupply: {
        formatted: formatUnits(totalSupply, unit),
        value: totalSupply,
      },
    }
  }

  try {
    return await fetchToken_({ abi: erc20ABI })
  } catch (err) {
    // In the chance that there is an error upon decoding the contract result,
    // it could be likely that the contract data is represented as bytes32 instead
    // of a string.
    if (err instanceof ContractFunctionExecutionError) {
      const { name, symbol, ...rest } = await fetchToken_({
        abi: erc20ABI_bytes32,
      })
      return {
        name: hexToString(trim(name as Hex, { dir: 'right' })),
        symbol: hexToString(trim(symbol as Hex, { dir: 'right' })),
        ...rest,
      }
    }
    throw err
  }
}
