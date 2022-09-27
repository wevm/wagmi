import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits, parseBytes32String } from 'ethers/lib/utils'

import { erc20ABI, erc20ABI_bytes32 } from '../../constants'
import { ContractResultDecodeError } from '../../errors'
import { Unit } from '../../types'
import { GetContractArgs, readContracts } from '../contracts'

export type FetchTokenArgs = {
  /** Address of ERC-20 token */
  address: string
  /** Chain id to use for provider */
  chainId?: number
  /** Units for formatting output */
  formatUnits?: Unit | number
}
export type FetchTokenResult = {
  address: string
  decimals: number
  name: string
  symbol: string
  totalSupply: {
    formatted: string
    value: BigNumber
  }
}

export async function fetchToken({
  address,
  chainId,
  formatUnits: units = 'ether',
}: FetchTokenArgs): Promise<FetchTokenResult> {
  async function fetchToken_({
    contractInterface,
  }: {
    contractInterface: GetContractArgs['contractInterface']
  }) {
    const erc20Config = {
      addressOrName: address,
      contractInterface,
      chainId,
    }
    const [decimals, name, symbol, totalSupply] = await readContracts<
      [number, string, string, BigNumber]
    >({
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
      name,
      symbol,
      totalSupply: {
        formatted: formatUnits(totalSupply, units),
        value: totalSupply,
      },
    }
  }

  try {
    return await fetchToken_({ contractInterface: erc20ABI })
  } catch (err) {
    // In the chance that there is an error upon decoding the contract result,
    // it could be likely that the contract data is represented as bytes32 instead
    // of a string.
    if (err instanceof ContractResultDecodeError) {
      const { name, symbol, ...rest } = await fetchToken_({
        contractInterface: erc20ABI_bytes32,
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
