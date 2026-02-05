import {
  type SimulateBlocksErrorType as viem_SimulateBlocksErrorType,
  type SimulateBlocksParameters as viem_SimulateBlocksParameters,
  type SimulateBlocksReturnType as viem_SimulateBlocksReturnType,
  simulateBlocks as viem_simulateBlocks,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type SimulateBlocksParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
> = Compute<viem_SimulateBlocksParameters<calls> & ChainIdParameter<config>>

export type SimulateBlocksReturnType<
  calls extends readonly unknown[] = readonly unknown[],
> = viem_SimulateBlocksReturnType<calls>

export type SimulateBlocksErrorType = viem_SimulateBlocksErrorType

/** https://wagmi.sh/core/api/actions/simulateBlocks */
export async function simulateBlocks<
  config extends Config,
  const calls extends readonly unknown[],
>(
  config: config,
  parameters: SimulateBlocksParameters<config, calls>,
): Promise<SimulateBlocksReturnType<calls>> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_simulateBlocks, 'simulateBlocks')
  return action(rest as viem_SimulateBlocksParameters<calls>)
}
