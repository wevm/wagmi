import { FeeData } from '@ethersproject/providers'
import { BigNumberish } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils'

import { wagmiClient } from '../../client'
import { Unit } from '../../types'

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit | number
}

export type FetchFeeDataResult = FeeData & {
  formatted: {
    gasPrice: string
    maxFeePerGas: string
    maxPriorityFeePerGas: string
  }
}

export async function fetchFeeData({
  formatUnits: units = 'wei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const feeData = await wagmiClient.provider.getFeeData()
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
