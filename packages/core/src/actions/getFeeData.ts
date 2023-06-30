import { formatUnits, parseGwei } from 'viem'
import { getBlock, getGasPrice } from 'viem/actions'

import { type Config } from '../config.js'
import { type Evaluate } from '../internal.js'
import type { ChainId } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import { getUnit } from '../utils/getUnit.js'

export type GetFeeDataParameters<config extends Config = Config> = Evaluate<
  {
    formatUnits?: Unit
  } & ChainId<config>
>

export type GetFeeDataReturnType = {
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

export type GetFeeDataError = Error

export async function getFeeData<config extends Config>(
  config: config,
  parameters: GetFeeDataParameters<config> = {},
): Promise<GetFeeDataReturnType> {
  const { chainId, formatUnits: units = 'gwei' } = parameters
  const client = config.getClient({ chainId })

  const block = await getBlock(client)
  const gasPrice = await getGasPrice(client).catch(() => null)

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
