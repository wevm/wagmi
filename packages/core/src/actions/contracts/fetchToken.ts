import type { Address, ResolvedConfig } from 'abitype'
import { formatUnits, parseBytes32String } from 'ethers/lib/utils.js'

import { erc20ABI, erc20ABI_bytes32 } from '../../constants'
import { ContractResultDecodeError } from '../../errors'
import type { Unit } from '../../types'
import { readContracts } from '../contracts'

export type FetchTokenArgs = {
  /** Address of ERC-20 token */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Units for formatting output */
  formatUnits?: Unit | number
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
  formatUnits: units = 'ether',
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
        formatted: formatUnits(totalSupply, units),
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
    if (err instanceof ContractResultDecodeError) {
      const { name, symbol, ...rest } = await fetchToken_({
        abi: erc20ABI_bytes32,
      })
      return {
        name: parseBytes32String(name),
        symbol: parseBytes32String(symbol),
        ...rest,
      }
    }
    throw err
  }
}
