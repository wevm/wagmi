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
  ConnectorChainMismatchError,
  type ConnectorChainMismatchErrorType,
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
  ConnectorUnavailableReconnectingError,
  type ConnectorUnavailableReconnectingErrorType,
} from '../errors/config.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute } from '../types/utils.js'

export type GetConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  ChainIdParameter<config, chainId> &
    ConnectorParameter & {
      /**
       * Account to use for the client.
       *
       * - `Account | Address`: An Account MUST exist on the connector.
       * - `null`: Account MAY NOT exist on the connector. This is useful for
       *   actions that can infer the account from the connector (e.g. sending a
       *   call without a connected account – the user will be prompted to select
       *   an account within the wallet).
       */
      account?: Address | Account | null | undefined
    }
>

export type GetConnectorClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  Client<
    config['_internal']['transports'][chainId],
    Extract<config['chains'][number], { id: chainId }>,
    Account
  >
>

export type GetConnectorClientErrorType =
  | ConnectorAccountNotFoundErrorType
  | ConnectorChainMismatchErrorType
  | ConnectorNotConnectedErrorType
  | ConnectorUnavailableReconnectingErrorType
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
    if (
      config.state.status === 'reconnecting' &&
      !connector.getAccounts &&
      !connector.getChainId
    )
      throw new ConnectorUnavailableReconnectingError({ connector })

    const [accounts, chainId] = await Promise.all([
      connector.getAccounts().catch((e) => {
        if (parameters.account === null) return []
        throw e
      }),
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

  // Check connector using same chainId as connection
  const connectorChainId = await connection.connector.getChainId()
  if (connectorChainId !== connection.chainId)
    throw new ConnectorChainMismatchError({
      connectionChainId: connection.chainId,
      connectorChainId,
    })

  // If connector has custom `getClient` implementation
  type Return = GetConnectorClientReturnType<config, chainId>
  const connector = connection.connector
  if (connector.getClient)
    return connector.getClient({ chainId }) as unknown as Return

  // Default using `custom` transport
  const account = parseAccount(parameters.account ?? connection.accounts[0]!)
  if (account) account.address = getAddress(account.address) // TODO: Checksum address as part of `parseAccount`?

  // If account was provided, check that it exists on the connector
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

  const chain = config.chains.find((chain) => chain.id === chainId)
  const provider = (await connection.connector.getProvider({ chainId })) as {
    request(...args: any): Promise<any>
  }

  return createClient({
    account,
    chain,
    name: 'Connector Client',
    transport: (opts) => custom(provider)({ ...opts, retryCount: 0 }),
  }) as Return
}
