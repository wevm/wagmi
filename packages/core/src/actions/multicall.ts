import type {
  ContractParameters,
  MulticallContract,
  MulticallParameters as viem_MulticallParameters,
  MulticallReturnType as viem_MulticallReturnType,
} from 'viem'
import { multicall as viem_multicall } from 'viem/actions'

import type { Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'

export type MulticallParameters<
  config extends Config = Config,
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
> = viem_MulticallParameters<contracts, allowFailure> & ChainIdParameter<config>

export type MulticallReturnType<
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
> = viem_MulticallReturnType<contracts, allowFailure>

export async function multicall<
  config extends Config,
  const contracts extends readonly ContractParameters[],
  allowFailure extends boolean = true,
>(
  config: config,
  parameters: MulticallParameters<config, contracts, allowFailure>,
): Promise<MulticallReturnType<contracts, allowFailure>> {
  const { allowFailure = true, chainId, contracts, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_multicall(client, {
    allowFailure,
    contracts,
    ...rest,
  }) as Promise<MulticallReturnType<contracts, allowFailure>>
}
