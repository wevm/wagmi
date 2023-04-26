import { formatUnits, parseGwei } from 'viem'

import type { Unit } from '../../types'

import { getUnit } from '../../utils'

import { getPublicClient } from '../viem'

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit
  /** Chain id to use for Public Client. */
  chainId?: number
}

export type FetchFeeDataResult = {
  lastBaseFeePerGas: bigint | null
  gasPrice: bigint | null
  maxFeePerGas: bigint | null
  maxPriorityFeePerGas: bigint | null
  formatted: {
    gasPrice: string | null
    maxFeePerGas: string | null
    maxPriorityFeePerGas: string | null
  }
}

export async function fetchFeeData({
  chainId,
  formatUnits: units = 'gwei',
}: FetchFeeDataArgs = {}): Promise<FetchFeeDataResult> {
  const publicClient = getPublicClient({ chainId })

  const block = await publicClient.getBlock()
  let gasPrice: bigint | null = null
  try {
    gasPrice = await publicClient.getGasPrice()
  } catch {
    //
  }

  let lastBaseFeePerGas: bigint | null = null
  let maxFeePerGas = null
  let maxPriorityFeePerGas = null

  if (block?.baseFeePerGas) {
    lastBaseFeePerGas = block.baseFeePerGas
    maxPriorityFeePerGas = parseGwei('1')
    maxFeePerGas = block.baseFeePerGas * 2n + maxPriorityFeePerGas
  }

  const unit = getUnit(units)
  const formatted = {
    gasPrice: gasPrice ? formatUnits(gasPrice, unit) : null,
    maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : null,
    maxPriorityFeePerGas: maxPriorityFeePerGas
      ? formatUnits(maxPriorityFeePerGas, unit)
      : null,
  }
  return {
    lastBaseFeePerGas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    formatted,
  }
}
