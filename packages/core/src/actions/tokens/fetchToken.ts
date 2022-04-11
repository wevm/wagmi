import { BigNumber, Contract } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { erc20ABI } from '../../constants'
import { getProvider } from '../providers'
import { Unit } from '../../types'

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
  const provider = getProvider({ chainId })
  const contract = new Contract(address, erc20ABI, provider)
  const [symbol, decimals, totalSupply] = await Promise.all([
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ])
  const token = {
    address,
    decimals,
    symbol,
    totalSupply: {
      formatted: formatUnits(totalSupply, units),
      value: totalSupply,
    },
  }
  return token
}
