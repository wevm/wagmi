import { type Client } from 'viem'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = ChainIdParameter<config, chainId>

export type GetClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  Client<
    config['_internal']['transports'][chainId],
    Extract<config['chains'][number], { id: chainId }>
  >
>

export function getClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetClientParameters<config, chainId> = {},
): GetClientReturnType<config, chainId> {
  return config.getClient(parameters) as GetClientReturnType<config, chainId>
}
