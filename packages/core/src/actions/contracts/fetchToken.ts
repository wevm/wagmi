import { Address } from 'abitype'
import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { erc20ABI } from '../../constants'
import { Unit } from '../../types'
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
  address: string
  decimals: number | BigNumber
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
  const [decimals, name, symbol, totalSupply] = await readContracts({
    allowFailure: false,
    contracts: [
      {
        addressOrName: address,
        contractInterface: erc20ABI,
        chainId,
        functionName: 'decimals' as const,
      },
      {
        addressOrName: address,
        contractInterface: erc20ABI,
        chainId,
        functionName: 'name' as const,
      },
      {
        addressOrName: address,
        contractInterface: erc20ABI,
        chainId,
        functionName: 'symbol' as const,
      },
      {
        addressOrName: address,
        contractInterface: erc20ABI,
        chainId,
        functionName: 'totalSupply' as const,
      },
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
