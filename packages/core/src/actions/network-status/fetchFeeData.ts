import type { providers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils.js'

import type { Unit } from '../../types'
import { getProvider } from '../providers'

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit | number
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchFeeDataResult = providers.FeeData & {
  formatted: {
    gasPrice: string | null
    maxFeePerGas: string | null
    maxPriorityFeePerGas: string | null
  }
}

export async function fetchFeeData({
  chainId,
  formatUnits: units = 'wei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const provider = getProvider({ chainId })
  const feeData = await provider.getFeeData()
  const formatted = {
    gasPrice: feeData.gasPrice ? formatUnits(feeData.gasPrice, units) : null,
    maxFeePerGas: feeData.maxFeePerGas
      ? formatUnits(feeData.maxFeePerGas, units)
      : null,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
      ? formatUnits(feeData.maxPriorityFeePerGas, units)
      : null,
  }
  return { ...feeData, formatted }
}
