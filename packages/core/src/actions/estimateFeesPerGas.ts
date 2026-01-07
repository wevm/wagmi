import type { Chain, FeeValuesType } from 'viem'
import {
  type EstimateFeesPerGasErrorType as viem_EstimateFeesPerGasErrorType,
  type EstimateFeesPerGasParameters as viem_EstimateFeesPerGasParameters,
  type EstimateFeesPerGasReturnType as viem_EstimateFeesPerGasReturnType,
  estimateFeesPerGas as viem_estimateFeesPerGas,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute, UnionCompute, UnionLooseOmit } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type EstimateFeesPerGasParameters<
  type extends FeeValuesType = FeeValuesType,
  config extends Config = Config,
> = UnionCompute<
  UnionLooseOmit<
    viem_EstimateFeesPerGasParameters<Chain, Chain, type>,
    'chain'
  > &
    ChainIdParameter<config>
>

export type EstimateFeesPerGasReturnType<
  type extends FeeValuesType = FeeValuesType,
> = Compute<viem_EstimateFeesPerGasReturnType<type>>

export type EstimateFeesPerGasErrorType = viem_EstimateFeesPerGasErrorType

export async function estimateFeesPerGas<
  config extends Config,
  type extends FeeValuesType = 'eip1559',
>(
  config: config,
  parameters: EstimateFeesPerGasParameters<type, config> = {},
): Promise<EstimateFeesPerGasReturnType<type>> {
  const { chainId, ...rest } = parameters

  const client = config.getClient({ chainId })
  const action = getAction(
    client,
    viem_estimateFeesPerGas,
    'estimateFeesPerGas',
  )

  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await action({
    ...rest,
    chain: client.chain,
  })

  return {
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } as EstimateFeesPerGasReturnType<type>
}
