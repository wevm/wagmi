import { type Account, type WalletClient, walletActions } from 'viem'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { Compute } from '../types/utils.js'
import {
  type GetConnectorClientErrorType,
  type GetConnectorClientParameters,
  getConnectorClient,
} from './getConnectorClient.js'

export type GetWalletClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = GetConnectorClientParameters<Config, chainId>

export type GetWalletClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  WalletClient<
    config['_internal']['transports'][chainId],
    Extract<config['chains'][number], { id: chainId }>,
    Account
  >
>

export type GetWalletClientErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType

export async function getWalletClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetWalletClientParameters<config, chainId> = {},
): Promise<GetWalletClientReturnType<config, chainId>> {
  const client = await getConnectorClient(config, parameters)
  // @ts-ignore
  return client.extend(walletActions) as unknown as GetWalletClientReturnType<
    config,
    chainId
  >
}
