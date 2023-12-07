import {
  ChainDisconnectedError,
  type EIP1193Provider,
  ProviderDisconnectedError,
  type TransportConfig,
  createTransport,
  hexToNumber,
  withRetry,
  withTimeout,
} from 'viem'
import type { Connector, Transport } from '../createConfig.js'

export type ConnectorTransportConfig = {
  /** The key of the transport. */
  key?: TransportConfig['key']
  /** The name of the transport. */
  name?: TransportConfig['name']
  /** The max number of times to retry. */
  retryCount?: TransportConfig['retryCount']
  /** The base delay (in ms) between retries. */
  retryDelay?: TransportConfig['retryDelay']
}

export type ConnectorTransport = Transport

export function unstable_connector(
  connector: Pick<Connector, 'type'>,
  config: ConnectorTransportConfig = {},
): Transport {
  const { type } = connector
  const {
    key = 'connector',
    name = 'Connector',
    retryCount,
    retryDelay,
  } = config
  return ({ chain, connectors, retryCount: defaultRetryCount }) =>
    createTransport({
      key,
      name,
      async request({ method, params }) {
        const connector = connectors?.getState().find((c) => c.type === type)
        if (!connector)
          throw new ProviderDisconnectedError(
            new Error(
              `Could not find connector of type "${type}" in \`connectors\` passed to \`createConfig\`.`,
            ),
          )

        const provider = (await connector.getProvider({
          chainId: chain?.id,
        })) as EIP1193Provider | undefined
        if (!provider)
          throw new ProviderDisconnectedError(
            new Error('Provider is disconnected.'),
          )

        // We are applying a retry & timeout strategy here as some injected wallets (ie. MetaMask) fail to
        // immediately resolve a JSON-RPC request on page load.
        const chainId = hexToNumber(
          await withRetry(() =>
            withTimeout(() => provider.request({ method: 'eth_chainId' }), {
              timeout: 100,
            }),
          ),
        )
        if (chain && chainId !== chain.id)
          throw new ChainDisconnectedError(
            new Error(
              `The current chain of the connector (id: ${chainId}) does not match the target chain for the request (id: ${chain.id} – ${chain.name}).`,
            ),
          )

        return (await provider.request({
          method,
          params,
        } as any)) as any
      },
      retryDelay,
      retryCount: retryCount ?? defaultRetryCount,
      type: 'connector',
    })
}
