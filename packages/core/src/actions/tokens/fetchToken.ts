import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { erc20ABI } from '../../constants'
import { Unit } from '../../types'
import { readContracts } from '../contracts'

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
  const erc20Config = {
    addressOrName: address,
    contractInterface: erc20ABI,
    chainId,
  }
  const [totalSupply, decimals, symbol] = await readContracts<
    [BigNumber, number, string]
  >({
    allowFailure: false,
    contracts: [
      { ...erc20Config, functionName: 'totalSupply' },
      { ...erc20Config, functionName: 'decimals' },
      {
        ...erc20Config,
        functionName: 'symbol',
      },
    ],
  })

  return {
    address,
    decimals,
    symbol,
    totalSupply: {
      formatted: formatUnits(totalSupply, units),
      value: totalSupply,
    },
  }
}
