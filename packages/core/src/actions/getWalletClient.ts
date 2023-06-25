import {
  type Account,
  type Transport,
  type WalletClient,
  createWalletClient,
  custom,
} from 'viem'

import type { Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Evaluate } from '../internal.js'

export type GetWalletClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = {
  chainId?: chainId | config['chains'][number]['id'] | undefined
}

export type GetWalletClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  WalletClient<
    Transport,
    Extract<config['chains'][number], { id: chainId }>,
    Account
  >
>

export type ConnectError =
  | ConnectorNotFoundError
  // base
  | Error

/** https://wagmi.sh/core/actions/getWalletClient */
export async function getWalletClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  { chainId }: GetWalletClientParameters<config, chainId> = {},
): Promise<GetWalletClientReturnType<config, chainId>> {
  const connection = config.state.connections.get(config.state.current!)
  if (!connection) throw new ConnectorNotFoundError()

  const resolvedChainId = chainId ?? connection.chainId
  const connector = connection.connector
  if (connector.getWalletClient)
    return connector.getWalletClient({
      chainId: resolvedChainId,
    }) as unknown as GetWalletClientReturnType<config, chainId>

  const account = connection.accounts[0]!
  const chain = config.chains.find((chain) => chain.id === resolvedChainId)
  const provider = await connection.connector.getProvider({
    chainId: resolvedChainId,
  })
  return createWalletClient({
    account,
    chain,
    transport: custom(provider as any),
  }) as unknown as GetWalletClientReturnType<config, chainId>
}
