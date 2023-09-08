import {
  type Chain,
  type FeeValuesEIP1559,
  type FeeValuesLegacy,
  type FeeValuesType,
  formatUnits,
} from 'viem'
import {
  type EstimateFeesPerGasParameters as viem_EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType as viem_EstimateFeesPerGasReturnType,
  estimateFeesPerGas as viem_estimateFeesPerGas,
} from 'viem/actions'
import type { Evaluate } from '../types/utils.js'

import { type Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Unit } from '../types/unit.js'
import type { UnionEvaluate, UnionLooseOmit } from '../types/utils.js'
import { getUnit } from '../utils/getUnit.js'

export type EstimateFeesPerGasParameters<
  config extends Config = Config,
  type extends FeeValuesType = FeeValuesType,
> = UnionEvaluate<
  UnionLooseOmit<
    viem_EstimateFeesPerGasParameters<
      Chain | undefined,
      Chain | undefined,
      type
    >,
    'chain'
  > & {
    formatUnits?: Unit
  } & ChainIdParameter<config>
>

export type EstimateFeesPerGasReturnType<
  type extends FeeValuesType = FeeValuesType,
> = Evaluate<
  viem_EstimateFeesPerGasReturnType<type> & {
    formatted: UnionEvaluate<
      | (type extends 'legacy' ? FeeValuesLegacy<string> : never)
      | (type extends 'eip1559' ? FeeValuesEIP1559<string> : never)
    >
  }
>

export type EstimateFeesPerGasError = Error

export async function estimateFeesPerGas<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
>(
  config: config,
  parameters: EstimateFeesPerGasParameters<config, type> = {},
): Promise<EstimateFeesPerGasReturnType<type>> {
  const { chainId, formatUnits: units = 'gwei', type } = parameters || {}
  const client = config.getClient({ chainId })

  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } =
    await viem_estimateFeesPerGas(client, { type })

  const unit = getUnit(units)
  const formatted = {
    gasPrice: gasPrice ? formatUnits(gasPrice, unit) : undefined,
    maxFeePerGas: maxFeePerGas ? formatUnits(maxFeePerGas, unit) : undefined,
    maxPriorityFeePerGas: maxPriorityFeePerGas
      ? formatUnits(maxPriorityFeePerGas, unit)
      : undefined,
  }

  return {
    formatted,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } as EstimateFeesPerGasReturnType<type>
}
