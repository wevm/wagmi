import { type PublicClient, publicActions } from 'viem'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetPublicClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = ChainIdParameter<config, chainId>

export type GetPublicClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  PublicClient<
    config['_internal']['transports'][chainId],
    Extract<config['chains'][number], { id: chainId }>
  >
>

export function getPublicClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetPublicClientParameters<config, chainId> = {},
): GetPublicClientReturnType<config, chainId> {
  const client = config.getClient(parameters)
  return client.extend(publicActions) as GetPublicClientReturnType<
    config,
    chainId
  >
}
