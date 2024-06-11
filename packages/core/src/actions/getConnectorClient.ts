import {
  type Account,
  type Address,
  type BaseErrorType,
  type Client,
  createClient,
  custom,
} from 'viem'
import { getAddress, parseAccount } from 'viem/utils'

import type { Config, Connection } from '../createConfig.js'
import type { ErrorType } from '../errors/base.js'
import {
  ConnectorAccountNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
} from '../errors/config.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'

export type GetConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  ChainIdParameter<config, chainId> &
    ConnectorParameter & {
      account?: Address | Account | undefined
    }
>

export type GetConnectorClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  Client<
    config['_internal']['transports'][chainId],
    Extract<config['chains'][number], { id: chainId }>,
    Account
  >
>

export type GetConnectorClientErrorType =
  | ConnectorAccountNotFoundErrorType
  | ConnectorNotConnectedErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://wagmi.sh/core/api/actions/getConnectorClient */
export async function getConnectorClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetConnectorClientParameters<config, chainId> = {},
): Promise<GetConnectorClientReturnType<config, chainId>> {
  // Get connection
  let connection: Connection | undefined
  if (parameters.connector) {
    const { connector } = parameters
    const [accounts, chainId] = await Promise.all([
      connector.getAccounts(),
      connector.getChainId(),
    ])
    connection = {
      accounts: accounts as readonly [Address, ...Address[]],
      chainId,
      connector,
    }
  } else connection = config.state.connections.get(config.state.current!)
  if (!connection) throw new ConnectorNotConnectedError()

  const chainId = parameters.chainId ?? connection.chainId

  // If connector has custom `getClient` implementation
  type Return = GetConnectorClientReturnType<config, chainId>
  const connector = connection.connector
  if (connector.getClient)
    return connector.getClient({ chainId: chainId }) as unknown as Return

  // Default using `custom` transport
  const account = parseAccount(parameters.account ?? connection.accounts[0]!)
  account.address = getAddress(account.address) // TODO: Checksum address as part of `parseAccount`?

  const chain = config.chains.find((chain) => chain.id === chainId)
  const provider = (await connection.connector.getProvider({ chainId })) as {
    request(...args: any): Promise<any>
  }

  // if account was provided, check that it exists on the connector
  if (
    parameters.account &&
    !connection.accounts.some(
      (x) => x.toLowerCase() === account.address.toLowerCase(),
    )
  )
    throw new ConnectorAccountNotFoundError({
      address: account.address,
      connector,
    })

  return createClient({
    account,
    chain,
    name: 'Connector Client',
    transport: (opts) => custom(provider)({ ...opts, retryCount: 0 }),
  }) as Return
}
