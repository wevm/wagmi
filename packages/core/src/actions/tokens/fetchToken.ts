import { BigNumber, Contract } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { wagmiClient } from '../../client'
import { erc20ABI } from '../../constants'
import { Unit } from '../../types'

export type FetchTokenArgs = {
  address?: string
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
  formatUnits: units = 'ether',
}: FetchTokenArgs) {
  if (!address) throw new Error('address is required')

  const { provider } = wagmiClient
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
