import { FeeData } from '@ethersproject/providers'
import { BigNumberish, utils } from 'ethers'

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
  formatUnits = 'wei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const feeData = await wagmiClient.provider.getFeeData()
  const formatted = {
    gasPrice: utils.formatUnits(<BigNumberish>feeData.gasPrice, formatUnits),
    maxFeePerGas: utils.formatUnits(
      <BigNumberish>feeData.maxFeePerGas,
      formatUnits,
    ),
    maxPriorityFeePerGas: utils.formatUnits(
      <BigNumberish>feeData.maxPriorityFeePerGas,
      formatUnits,
    ),
  }
  return { ...feeData, formatted }
}
