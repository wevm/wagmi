import type { BlockTag, Chain } from 'viem'
import {
  type GetBlockErrorType as viem_GetBlockErrorType,
  type GetBlockParameters as viem_GetBlockParameters,
  type GetBlockReturnType as viem_GetBlockReturnType,
  getBlock as viem_getBlock,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute, IsNarrowable } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetBlockParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_GetBlockParameters<includeTransactions, blockTag> &
    ChainIdParameter<config, chainId>
>

export type GetBlockReturnType<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Compute<
  {
    [key in keyof chains]: viem_GetBlockReturnType<
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined,
      includeTransactions,
      blockTag
    > & { chainId: chains[key]['id'] }
  }[number]
>

export type GetBlockErrorType = viem_GetBlockErrorType

/** https://wagmi.sh/core/actions/getBlock */
export async function getBlock<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
  config: config,
  parameters: GetBlockParameters<
    includeTransactions,
    blockTag,
    config,
    chainId
  > = {},
): Promise<GetBlockReturnType<includeTransactions, blockTag, config, chainId>> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getBlock, 'getBlock')
  const block = await action(rest)
  return {
    ...(block as unknown as GetBlockReturnType<
      includeTransactions,
      blockTag,
      config,
      chainId
    >),
    chainId: client.chain.id,
  }
}
