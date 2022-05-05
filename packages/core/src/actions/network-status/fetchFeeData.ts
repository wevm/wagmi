import { BigNumberish, providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

import { Unit } from '../../types'
import { getProvider } from '../providers'

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchFeeDataResult = providers.FeeData & {
  formatted: {
    gasPrice: string
    maxFeePerGas: string
    maxPriorityFeePerGas: string
  }
}

export async function fetchFeeData({
  chainId,
  formatUnits: units = 'wei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const provider = getProvider({ chainId })
  const feeData = await provider.getFeeData()
  const formatted = {
    gasPrice: formatUnits(<BigNumberish>feeData.gasPrice, units),
    maxFeePerGas: formatUnits(<BigNumberish>feeData.maxFeePerGas, units),
    maxPriorityFeePerGas: formatUnits(
      <BigNumberish>feeData.maxPriorityFeePerGas,
      units,
    ),
  }
  return { ...feeData, formatted }
}
