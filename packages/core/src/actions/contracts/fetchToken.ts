import { Address, ResolvedConfig } from 'abitype'
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
  const erc20Config = {
    addressOrName: address,
    contractInterface: erc20ABI,
    chainId,
  } as const
  const [decimals, name, symbol, totalSupply] = await readContracts({
    allowFailure: false,
    contracts: [
      {
        ...erc20Config,
        functionName: 'decimals',
      },
      {
        ...erc20Config,
        functionName: 'name',
      },
      {
        ...erc20Config,
        functionName: 'symbol',
      },
      {
        ...erc20Config,
        functionName: 'totalSupply',
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
