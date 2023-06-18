import { type MutationOptions } from '@tanstack/query-core'
import {
  SwitchChainError as SwitchChainError_,
  UserRejectedRequestError,
} from 'viem'

import { type Config } from '../config.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import {
  type ProviderNotFoundError,
  SwitchChainNotSupportedError,
} from '../errors/connector.js'
import type { IsUndefined, Pretty } from '../types/utils.js'

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
  return (await connector.switchChain({ chainId })) as SwitchChainReturnType<
    config,
    chainId
  >
}

///////////////////////////////////////////////////////////////////////////
// TanStack Query

export type SwitchChainMutationData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Pretty<SwitchChainReturnType<config, chainId>>
export type SwitchChainMutationVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Pretty<
  IsUndefined<chainId> extends false
    ? {
        chainId?: SwitchChainParameters<config>['chainId'] | undefined
      }
    : { chainId: SwitchChainParameters<config>['chainId'] | undefined }
>
export type SwitchChainMutationParameters<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Pretty<{
  chainId?: chainId | SwitchChainParameters<config>['chainId'] | undefined
}>

/** https://wagmi.sh/core/actions/switchChain#tanstack-query */
export const switchChainMutationOptions = <
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: Config,
  { chainId }: SwitchChainMutationParameters<config, chainId>,
) =>
  ({
    mutationFn(variables) {
      const chainId_ = variables.chainId ?? chainId
      return switchChain(config, { chainId: chainId_! })
    },
    mutationKey: ['switchChain', { chainId }],
  }) as const satisfies MutationOptions<
    SwitchChainMutationData<config, chainId>,
    SwitchChainError,
    SwitchChainMutationVariables<config, chainId>
  >
