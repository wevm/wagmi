import {
  SwitchChainError as SwitchChainError_,
  UserRejectedRequestError,
} from 'viem'

import { type Config } from '../config.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import { SwitchChainNotSupportedError } from '../errors/connector.js'
import { type ProviderNotFoundError } from '../errors/connector.js'

export type SwitchChainParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = {
  chainId: chainId | config['chains'][number]['id']
}

export type SwitchChainReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Extract<config['chains'][number], { id: chainId }>

export type SwitchChainError =
  | ProviderNotFoundError
  | SwitchChainError_
  | UserRejectedRequestError
  | BaseError
  | Error

/** https://wagmi.sh/core/actions/switchChain */
export async function switchChain<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  { chainId }: SwitchChainParameters<config, chainId>,
): Promise<SwitchChainReturnType<config, chainId>> {
  const connection = config.state.connections.get(config.state.current!)
  if (!connection) throw new ConnectorNotFoundError()

  const connector = connection.connector
  if (!connector.switchChain)
    throw new SwitchChainNotSupportedError({ connector })
  const chain = await connector.switchChain({ chainId })
  return chain as SwitchChainReturnType<config, chainId>
}
