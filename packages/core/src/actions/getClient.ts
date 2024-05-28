import type { Client } from 'viem'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, IsNarrowable } from '../types/utils.js'

export type GetClientParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | number
    | undefined = config['chains'][number]['id'],
> = ChainIdParameter<config, chainId>

export type GetClientReturnType<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  resolvedChainId extends
    | config['chains'][number]['id']
    | undefined = IsNarrowable<
    config['chains'][number]['id'],
    number
  > extends true
    ? IsNarrowable<chainId, number> extends true
      ? chainId
      : config['chains'][number]['id']
    : config['chains'][number]['id'] | undefined,
> = resolvedChainId extends config['chains'][number]['id']
  ? Evaluate<
      Client<
        config['_internal']['transports'][resolvedChainId],
        Extract<config['chains'][number], { id: resolvedChainId }>
      >
    >
  : undefined

export function getClient<
  config extends Config,
  chainId extends config['chains'][number]['id'] | number | undefined,
>(
  config: config,
  parameters: GetClientParameters<config, chainId> = {},
): GetClientReturnType<config, chainId> {
  let client = undefined
  try {
    client = config.getClient(parameters)
  } catch {}
  return client as GetClientReturnType<config, chainId>
}
