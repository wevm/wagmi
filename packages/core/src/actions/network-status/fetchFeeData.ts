import { formatUnits, parseGwei } from 'viem'

import type { Unit } from '../../types'

import { getUnit } from '../../utils'

import { getProvider } from '../providers'

export type FetchFeeDataArgs = {
  /** Units for formatting output */
  formatUnits?: Unit
  /** Chain id to use for provider */
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
  const provider = getProvider({ chainId })

  const block = await provider.getBlock()
  let gasPrice: bigint | null = null
  try {
    gasPrice = await provider.getGasPrice()
  } catch {
    //
  }

  let lastBaseFeePerGas: bigint | null = null
  let maxFeePerGas = null
  let maxPriorityFeePerGas = null

  if (block && block.baseFeePerGas) {
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
